"use strict";
const { db, Timestamp, FieldValue, crypto, CFG, reply, verifyUser } = require("./lib/common");
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const user = await verifyUser(event);
    const b = JSON.parse(event.body || "{}");
    const name = String(b.name || "").trim();
    const phone = String(b.phone || "").trim();
    if (name.length < 2 || name.length > 80) return reply(400, { error: "Enter your name." });
    if (!/^[6-9]\d{9}$/.test(phone)) return reply(400, { error: "Enter a valid 10-digit mobile number." });
    if (!/^[a-f0-9]{64}$/.test(String(b.imageHash || ""))) return reply(400, { error: "Bad image hash." });
    if (typeof b.sessionId !== "string" || !b.sessionId) return reply(400, { error: "Missing session." });
    const img = Buffer.from(String(b.imageBase64 || ""), "base64");
    if (img.length < 2000 || img.length > CFG.MAX_IMAGE_BYTES) return reply(400, { error: "Image must be under 750 KB after compression." });
    const isJpeg = img[0] === 0xff && img[1] === 0xd8 && img[2] === 0xff;        
    const isPng = img[0] === 0x89 && img[1] === 0x50 && img[2] === 0x4e && img[3] === 0x47;
    if (!isJpeg && !isPng) return reply(400, { error: "Only JPG/PNG images are allowed." });
    const sessRef = db.doc(`paymentSessions/${b.sessionId}`);
    const sess = (await sessRef.get()).data();
    if (!sess || sess.uid !== user.uid || sess.status !== "open") return reply(400, { error: "Invalid or already used payment session." });
    if (Date.now() > sess.expiresAt.toMillis() + CFG.UPLOAD_GRACE_MIN * 60000) return reply(400, { error: "Session expired. Refresh and start again." });
    const serverHash = sha256(img);
    const ud = (await db.doc(`users/${user.uid}`).get()).data() || {};   // referral code locked in at submit time
    const batch = db.batch();
    batch.create(db.doc(`imageHashes/${b.imageHash}`), { uid: user.uid, orderId: sess ? b.sessionId : null, createdAt: FieldValue.serverTimestamp() });
    if (serverHash !== b.imageHash) batch.create(db.doc(`imageHashes/${serverHash}`), { uid: user.uid, orderId: b.sessionId, createdAt: FieldValue.serverTimestamp() });
    batch.create(db.doc(`orders/${b.sessionId}`), {
      uid: user.uid, sessionId: b.sessionId, name, email: user.email || null, phone,
      imageHash: b.imageHash, serverHash, status: "pending", courseAccess: false,
      referredBy: ud.referredBy || null, referredByCode: ud.referredByCode || null,
      createdAt: FieldValue.serverTimestamp(),
    });
    batch.create(db.doc(`orderImages/${b.sessionId}`), { bytes: img, createdAt: FieldValue.serverTimestamp() });
    try { await batch.commit(); }
    catch (e) {
      if (e.code === 6) return reply(409, { error: "This screenshot (or session) was already submitted." });
      throw e;
    }
    const appBaseUrl = process.env.APP_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
    if (!appBaseUrl) throw new Error("APP_BASE_URL or VERCEL_URL is required to process the order.");
    await fetch(`${appBaseUrl}/api/ncertpyq/process-order-background`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-secret": process.env.INTERNAL_SECRET },
      body: JSON.stringify({ orderId: b.sessionId }),
    });
    return reply(200, { ok: true });
  } catch (e) {
    console.error(e);
    return reply(e.status || 500, { error: e.status ? e.message : "Server error" });
  }
};

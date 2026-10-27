"use strict";
const QRCode = require("qrcode");
const { db, Timestamp, crypto, CFG, reply, verifyUser } = require("./lib/common");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const user = await verifyUser(event);          
    const now = Date.now();
    const mine = await db.collection("orders").where("uid", "==", user.uid).get();
    if (mine.docs.some((d) => ["pending", "pending_review"].includes(d.data().status)))
      return reply(409, { error: "Your previous payment is still under review. Please wait for it to finish." });
    const sessions = db.collection("paymentSessions");
    const session = await db.runTransaction(async (tx) => {
      const openSnap = await tx.get(sessions.where("status", "==", "open"));
      const live = openSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((s) => s.expiresAt.toMillis() > now);
      const mine = live.find((s) => s.uid === user.uid);      
      if (mine) return mine;
      const used = new Set(live.map((s) => s.paise));          
      const free = [];
      for (let p = 1; p <= 99; p++) if (!used.has(p)) free.push(p);
      if (!free.length) throw Object.assign(new Error("Busy right now — retry in a minute."), { status: 503 });
      const paise = free[crypto.randomInt(free.length)];
      const ref = sessions.doc();
      const data = {
        uid: user.uid, email: user.email || null, paise,
        amount: (CFG.BASE_PRICE_INR * 100 + paise) / 100,
        status: "open",
        upiRef: "NX" + ref.id.slice(0, 8).toUpperCase(),
        createdAt: Timestamp.fromMillis(now),
        expiresAt: Timestamp.fromMillis(now + CFG.SESSION_MINUTES * 60000),
      };
      tx.set(ref, data);
      return { id: ref.id, ...data };
    });
    const amount = session.amount.toFixed(2);
    const uri = `upi://pay?pa=${encodeURIComponent(CFG.UPI_ID)}&pn=${encodeURIComponent(CFG.PAYEE_NAME)}` +
                `&am=${amount}&cu=INR&tn=${encodeURIComponent(session.upiRef)}`;
    const qrDataUrl = await QRCode.toDataURL(uri, { margin: 2, width: 320, errorCorrectionLevel: "M" });
    return reply(200, { sessionId: session.id, amount, expiresAtMs: session.expiresAt.toMillis(), qrDataUrl });
  } catch (e) {
    console.error(e);
    return reply(e.status || 500, { error: e.status ? e.message : "Server error" });
  }
};

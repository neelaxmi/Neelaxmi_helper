"use strict";
const { db, Timestamp, FieldValue, crypto, CFG, approveOrder, parsePaymentText, esc, tgSendPhoto } = require("./lib/common");
exports.handler = async (event) => {
  const got = Buffer.from(event.headers["x-internal-secret"] || "");
  const want = Buffer.from(process.env.INTERNAL_SECRET || "x");
  if (got.length !== want.length || !crypto.timingSafeEqual(got, want)) return { statusCode: 403 };
  const { orderId } = JSON.parse(event.body || "{}");
  const orderRef = db.doc(`orders/${orderId}`);
  const order = (await orderRef.get()).data();
  if (!order || order.status !== "pending") return { statusCode: 200 };   // idempotent
  const reasons = [];
  let risk = "normal", parsed = { amounts: [] }, img = null, session = null;
  try {
    session = (await db.doc(`paymentSessions/${orderId}`).get()).data();
    if (!session) reasons.push("No matching payment session");
    else if (session.uid !== order.uid) { reasons.push("Session belongs to a different user"); risk = "high"; }
    const imgDoc = (await db.doc(`orderImages/${orderId}`).get()).data();
    img = imgDoc ? Buffer.from(imgDoc.bytes) : null;
    if (!img) reasons.push("Screenshot missing");
    if (img) {
      if (crypto.createHash("sha256").update(img).digest("hex") !== order.serverHash) { reasons.push("Stored image hash mismatch"); risk = "high"; }
      const text = await ocrSpace(img);
      parsed = parsePaymentText(text);
      if (!text.trim()) reasons.push("OCR returned no text");
      if (session) {
        const expected = session.amount.toFixed(2);
        if (!parsed.amounts.includes(expected)) reasons.push(`Exact amount ₹${expected} not found`);
        if (!parsed.successful) reasons.push('Status "Successful" not found (or failure words present)');
        const payeeOk = (CFG.UPI_ID && parsed.lower.includes(CFG.UPI_ID.toLowerCase())) ||
                        (CFG.PAYEE_NAME && parsed.lower.includes(CFG.PAYEE_NAME.toLowerCase()));
        if (!payeeOk) reasons.push("Payee UPI ID / name not found");
        if (!parsed.paidAtMs) reasons.push("Payment time not readable");
        else if (parsed.paidAtMs < session.createdAt.toMillis() - 120000 || parsed.paidAtMs > session.expiresAt.toMillis() + 300000) {
          reasons.push("Payment time is outside the QR session window"); risk = "high";
        }
      }
      if (!parsed.utr) reasons.push("UTR not found");
      else {
        try { await db.doc(`utrs/${parsed.utr}`).create({ orderId, uid: order.uid, createdAt: FieldValue.serverTimestamp() }); }
        catch (e) {
          const owner = (await db.doc(`utrs/${parsed.utr}`).get()).data();
          if (!owner || owner.orderId !== orderId) { reasons.push(`Duplicate UTR ${parsed.utr}`); risk = "high"; }
        }
      }
    }
  } catch (e) {
    console.error("Processing error:", e);
    reasons.push("Processing error: " + e.message);
  }

  const auto = reasons.length === 0;
  const extracted = { amounts: parsed.amounts || [], utr: parsed.utr || null, successful: !!parsed.successful, paidAtMs: parsed.paidAtMs || null };
  if (auto) { await approveOrder(orderId, order.uid, "auto-ai"); await orderRef.update({ extracted }); }
  else await orderRef.update({ status: "pending_review", risk, reviewReasons: reasons, extracted });
  await db.doc(`paymentSessions/${orderId}`).set({ status: "used" }, { merge: true });
  try {
    if (img) {
      const caption =
        `<b>${auto ? "✅ AUTO-APPROVED" : "⚠️ NEEDS REVIEW"}</b>${risk === "high" ? " 🚨 HIGH RISK" : ""}\n` +
        `Order: <code>${orderId}</code>\nName: ${esc(order.name)}\nEmail: ${esc(order.email)}\nPhone: ${esc(order.phone)}\n` +
        (order.referredByCode ? `Referral: <code>${esc(order.referredByCode)}</code>\n` : "") +
        `Expected: ₹${session ? session.amount.toFixed(2) : "?"} | OCR amounts: ${esc(extracted.amounts.join(", ") || "-")}\n` +
        `UTR: <code>${esc(extracted.utr || "-")}</code>\n` +
        (reasons.length ? `Reasons:\n• ${reasons.map(esc).join("\n• ")}` : "All checks passed.");
      const messageId = await tgSendPhoto(img, caption, orderId);
      await orderRef.update({ telegramMessageId: messageId });
      await db.doc(`orderImages/${orderId}`).delete();      
    }
  } catch (e) { console.error("Telegram failed (image kept in Firestore):", e.message); }
  return { statusCode: 200 };
};
async function ocrSpace(buf) {
  const fd = new FormData();
  fd.append("base64Image", `data:image/jpeg;base64,${buf.toString("base64")}`);
  fd.append("language", "eng");
  fd.append("OCREngine", "2");           
  fd.append("scale", "true");
  fd.append("isOverlayRequired", "false");
  const res = await fetch("https://api.ocr.space/parse/image", { method: "POST", headers: { apikey: process.env.OCR_SPACE_KEY }, body: fd });
  const j = await res.json();
  if (j.IsErroredOnProcessing) throw new Error("OCR: " + [].concat(j.ErrorMessage || "failed").join(" "));
  return (j.ParsedResults || []).map((r) => r.ParsedText).join("\n");
}

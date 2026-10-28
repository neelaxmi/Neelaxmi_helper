"use strict";
const { db, FieldValue, crypto, approveOrder, reverseReferral, settleWithdrawal, tgAnswer, tgEditCaption, tgEditText, esc } = require("./lib/common");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };
  const configuredSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!configuredSecret) {
    console.error("[telegram-webhook][ERROR] TELEGRAM_WEBHOOK_SECRET is not configured.");
    return { statusCode: 503 };
  }
  const got = Buffer.from(event.headers["x-telegram-bot-api-secret-token"] || "");
  const want = Buffer.from(configuredSecret);
  if (got.length !== want.length || !crypto.timingSafeEqual(got, want)) return { statusCode: 403 };
  const cq = (JSON.parse(event.body || "{}")).callback_query;
  if (!cq) return { statusCode: 200 };
  try {
    const admins = (process.env.TELEGRAM_ADMIN_IDS || "").split(",").map((s) => s.trim());
    if (!admins.includes(String(cq.from.id))) { await tgAnswer(cq.id, "⛔ Not authorised"); return { statusCode: 200 }; }
    const [action, orderId] = String(cq.data || "").split(":");
    if (action === "wp" || action === "wx") {           
      const who = cq.from.username || String(cq.from.id);
      const w = await settleWithdrawal(orderId, action === "wp" ? "paid" : "rejected", `telegram:${who}`);
      if (!w) { await tgAnswer(cq.id, "Request not found"); return { statusCode: 200 }; }
      if (w.already) { await tgAnswer(cq.id, `Already ${w.status}`); return { statusCode: 200 }; }
      await tgAnswer(cq.id, action === "wp" ? "✅ Marked paid" : "❌ Rejected, coins returned");
      await tgEditText(cq.message, `${action === "wp" ? "✅ PAID" : "❌ REJECTED"} by @${esc(who)}\n\n${esc(cq.message.text || "")}`);
      return { statusCode: 200 };
    }
    if (action === "rvok" || action === "rvno") {       
      const who = cq.from.username || String(cq.from.id);
      const rRef = db.doc(`reviews/${orderId}`);
      const rSnap = await rRef.get();
      if (!rSnap.exists) { await tgAnswer(cq.id, "Review not found (already deleted?)"); return { statusCode: 200 }; }
      if (action === "rvok") await rRef.update({ approved: true, reviewedBy: `telegram:${who}`, reviewedAt: FieldValue.serverTimestamp() });
      else await rRef.delete();
      await tgAnswer(cq.id, action === "rvok" ? "✅ Approved — live on the site within ~5 min" : "🗑 Deleted");
      await tgEditText(cq.message, `${action === "rvok" ? "✅ APPROVED" : "🗑 DELETED"} by @${esc(who)}\n\n${esc(cq.message.text || "")}`);
      return { statusCode: 200 };
    }
    const orderRef = db.doc(`orders/${orderId}`);
    const snap = await orderRef.get();
    if (!snap.exists || !["ok", "no"].includes(action)) { await tgAnswer(cq.id, "Order not found"); return { statusCode: 200 }; }
    const order = snap.data();
    const who = cq.from.username || String(cq.from.id);
    if (action === "ok") {
      await approveOrder(orderId, order.uid, `telegram:${who}`);
      await tgAnswer(cq.id, "✅ Access granted");
    } else {
      await orderRef.update({ status: "revoked", courseAccess: false, reviewedBy: `telegram:${who}`, reviewedAt: FieldValue.serverTimestamp() });
      await db.doc(`users/${order.uid}`).set({ courseAccess: false, subscriptionExpiresAt: FieldValue.delete() }, { merge: true });
      await reverseReferral(orderId, order.uid);
      await tgAnswer(cq.id, "🚫 Access revoked");
    }
    const verdict = action === "ok" ? `✅ CONFIRMED by @${who}` : `🚫 REVOKED by @${who}`;
    await tgEditCaption(cq.message, `${verdict}\n\n${cq.message.caption || ""}`, orderId);
  } catch (e) { console.error("Webhook error:", e); }
  return { statusCode: 200 }; 
};

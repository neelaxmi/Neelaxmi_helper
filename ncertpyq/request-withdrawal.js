"use strict";
const { db, FieldValue, REF, httpErr, reply, verifyUser, esc, tgSendMessage, withdrawalKeyboard } = require("./lib/common");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const user = await verifyUser(event);
    const b = JSON.parse(event.body || "{}");
    const coins = Number(b.coins);
    const upiId = String(b.upiId || "").trim();
    if (!Number.isInteger(coins) || coins < REF.MIN_WITHDRAW) return reply(400, { error: `Minimum withdrawal is ${REF.MIN_WITHDRAW} coins.` });
    if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) return reply(400, { error: "Enter a valid UPI ID (e.g. name@okaxis)." });

    const userRef = db.doc(`users/${user.uid}`);
    const wRef = db.collection("withdrawals").doc();
    await db.runTransaction(async (tx) => {
      const [u, pending] = await Promise.all([
        tx.get(userRef),
        tx.get(db.collection("withdrawals").where("uid", "==", user.uid).where("status", "==", "pending").limit(1)),
      ]);
      if (!pending.empty) throw httpErr(409, "You already have a pending withdrawal request.");
      if (((u.exists && u.data().coins) || 0) < coins) throw httpErr(400, "Not enough coins.");
      tx.set(userRef, { coins: FieldValue.increment(-coins) }, { merge: true });
      tx.create(wRef, { uid: user.uid, email: user.email || null, coins, amountInr: coins, upiId, status: "pending", createdAt: FieldValue.serverTimestamp() });
    });
    try {
      await tgSendMessage(
        `<b>💸 WITHDRAWAL REQUEST</b>\nUser: ${esc(user.email)}\nCoins: ${coins} (= ₹${coins})\nUPI: <code>${esc(upiId)}</code>\nRequest: <code>${wRef.id}</code>`,
        withdrawalKeyboard(wRef.id));
    } catch (e) { console.error("Telegram notify failed:", e.message); }
    return reply(200, { ok: true, id: wRef.id });
  } catch (e) {
    console.error(e);
    return reply(e.status || 500, { error: e.status ? e.message : "Server error" });
  }
};

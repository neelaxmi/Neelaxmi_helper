"use strict";
// Logged-in users can tell us what they can afford and why. Emailed to the support inbox; stored in Firestore.
const { db, FieldValue, CFG, reply, verifyUser } = require("./lib/common");
const { sendSupportMail, renderEmail } = require("./lib/mail");
const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const user = await verifyUser(event);
    const b = JSON.parse(event.body || "{}");
    const name = clean(b.name, 80), phone = clean(b.phone, 15), reason = clean(b.reason, 1000);
    const offer = Number(b.offerPrice);
    if (!Number.isFinite(offer) || offer < 1 || offer >= CFG.BASE_PRICE_INR) return reply(400, { error: `Enter an amount between ₹1 and ₹${CFG.BASE_PRICE_INR - 1}.` });
    if (reason.length < 15) return reply(400, { error: "Please tell us a little more about why (at least 15 characters)." });
    if (name.length < 2) return reply(400, { error: "Please enter your name." });
    if (phone && !/^[6-9]\d{9}$/.test(phone)) return reply(400, { error: "Enter a valid 10-digit mobile number or leave it empty." });

    const ref = db.doc(`priceRequests/${user.uid}`);        // one request per user, one every 3 days
    const prev = (await ref.get()).data();
    if (prev && prev.createdAt && Date.now() - prev.createdAt.toMillis() < 3 * 86400000)
      return reply(429, { error: "You already sent a request recently. We'll reply on your email — please wait 3 days before sending another." });
    await ref.set({ uid: user.uid, email: user.email || null, name, phone: phone || null, offerPrice: offer, reason, emailed: false, createdAt: FieldValue.serverTimestamp() });

    try {
      await sendSupportMail({
        subject: `[Neelaxmi] Price-drop request: ₹${offer} (list ₹${CFG.BASE_PRICE_INR})`,
        replyTo: user.email,
        html: renderEmail("Price-drop request", [["Name", name], ["Email", user.email || ""], ["Phone", phone], ["Can pay", `₹${offer}`], ["List price", `₹${CFG.BASE_PRICE_INR}`], ["User id", user.uid]], reason),
      });
      await ref.update({ emailed: true });
    } catch (e) {
      console.error("Email failed:", e.message);
      await (prev ? ref.set(prev) : ref.delete());            // don't lock the user out when the email didn't go through
      return reply(502, { error: "Couldn't send your request right now. Please try again, or message us on Telegram." });
    }
    return reply(200, { ok: true });
  } catch (e) {
    console.error(e);
    return reply(e.status || 500, { error: e.status ? e.message : "Server error" });
  }
};

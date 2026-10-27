"use strict";
const { db, FieldValue, crypto, reply } = require("./lib/common");
const { sendSupportMail, renderEmail } = require("./lib/mail");
const TYPES = { contact: "Contact message", complaint: "Complaint", review: "New review" };
const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const b = JSON.parse(event.body || "{}");
    if (b.website) return reply(200, { ok: true });                     
    const type = TYPES[b.type] ? b.type : "contact";
    const name = clean(b.name, 80), email = clean(b.email, 120), subject = clean(b.subject, 140), message = clean(b.message, 3000);
    const rating = type === "review" ? Math.round(Number(b.rating)) : 0;
    if (name.length < 2) return reply(400, { error: "Please enter your name." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return reply(400, { error: "Please enter a valid email." });
    if (message.length < 10) return reply(400, { error: "Please write a little more (at least 10 characters)." });
    if (type === "review" && !(rating >= 1 && rating <= 5)) return reply(400, { error: "Please choose a star rating." });

    const ip = (event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "").split(",")[0].trim();
    const key = crypto.createHash("sha256").update("fb|" + ip).digest("hex").slice(0, 32);
    const limRef = db.doc(`feedbackLimits/${key}`);
    const allowed = await db.runTransaction(async (tx) => {
      const s = await tx.get(limRef), d = s.data(), now = Date.now();
      if (d && now - d.windowStart < 3600000) { if (d.count >= 5) return false; tx.update(limRef, { count: d.count + 1 }); }
      else tx.set(limRef, { windowStart: now, count: 1 });
      return true;
    });
    if (!allowed) return reply(429, { error: "Too many messages. Please try again in an hour." });
    const doc = { type, name, email, subject, message, rating: rating || null, emailed: false, createdAt: FieldValue.serverTimestamp() };
    const ref = type === "review" ? db.collection("reviews").doc() : db.collection("feedback").doc();
    await ref.set(type === "review" ? { ...doc, approved: false } : doc);   
    const title = `${TYPES[type]}${type === "review" ? " — " + "★".repeat(rating) + "☆".repeat(5 - rating) : ""}`;
    try {
      await sendSupportMail({
        subject: `[Neelaxmi] ${title}${subject ? " · " + subject : ""}`,
        replyTo: email,
        html: renderEmail(title, [["From", name], ["Email", email], ["Subject", subject], ["Rating", rating ? rating + " / 5" : ""],
          ["Doc id", ref.id]], message),
        markup: type === "review" ? { inline_keyboard: [[
          { text: "✅ Approve (show on site)", callback_data: `rvok:${ref.id}` },
          { text: "🗑 Delete", callback_data: `rvno:${ref.id}` },
        ]] } : undefined,
      });
      await ref.update({ emailed: true });
    } catch (e) {
      console.error("Email failed:", e.message);
      return reply(502, { error: "We saved your message but couldn't notify our team. Please also reach us on Telegram or neelaxmi.support@gmail.com." });
    }
    return reply(200, { ok: true });
  } catch (e) {
    console.error(e);
    return reply(500, { error: "Server error. Please try again." });
  }
};

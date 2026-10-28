"use strict";
/**
 * lib/common.js — shared helpers for payment and referral serverless functions.
 * Uses the Firebase Admin SDK, which works on Firebase's FREE Spark plan (Auth + Firestore only).
 */
const admin = require("firebase-admin");
const crypto = require("crypto");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Netlify stores the key with literal "\n" — turn them back into real newlines.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();
const { Timestamp, FieldValue } = admin.firestore;

const CFG = {
  BASE_PRICE_INR: 149,
  SESSION_MINUTES: 10,
  SUBSCRIPTION_DAYS: 365,
  UPLOAD_GRACE_MIN: 15,
  MAX_IMAGE_BYTES: 750 * 1024, // must fit in a 1 MiB Firestore document
  UPI_ID: process.env.UPI_ID || "",
  PAYEE_NAME: process.env.PAYEE_NAME || "",
};
const DAY_MS = 86400000;
const IST = "+05:30";

/* ---------- HTTP helpers ---------- */
const reply = (statusCode, obj) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});

/** Verifies the Firebase login token sent by the browser: "Authorization: Bearer <idToken>". */
async function verifyUser(event) {
  const h = event.headers.authorization || event.headers.Authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) throw Object.assign(new Error("Please log in."), { status: 401 });
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (e) {
    throw Object.assign(new Error("Session expired — please log in again."), { status: 401 });
  }
}

/* ---------- Access grant ---------- */
/** Sets BOTH courseAccess:true and a 365-day subscriptionExpiresAt (extends if already active). */
async function approveOrder(orderId, uid, by) {
  const userRef = db.doc(`users/${uid}`);
  await db.runTransaction(async (tx) => {
    const u = await tx.get(userRef);
    const cur = u.exists && u.data().subscriptionExpiresAt ? u.data().subscriptionExpiresAt.toMillis() : 0;
    const expiry = Timestamp.fromMillis(Math.max(Date.now(), cur) + CFG.SUBSCRIPTION_DAYS * DAY_MS);
    tx.set(userRef, { courseAccess: true, subscriptionExpiresAt: expiry }, { merge: true });
    tx.update(db.doc(`orders/${orderId}`), {
      status: "approved", courseAccess: true, reviewedBy: by, reviewedAt: FieldValue.serverTimestamp(),
    });
  });
  // Referral reward is paid ONLY here, i.e. after the subscription is approved. Never blocks the approval itself.
  try { await creditReferral(orderId, uid); } catch (e) { console.error("Referral credit failed:", e); }
}

/* ---------- Referral program ---------- */
const REF = { REWARD_COINS: 30, MIN_WITHDRAW: 200, CODE_LEN: 8 }; // 1 coin = ₹1
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const httpErr = (status, message) => Object.assign(new Error(message), { status });
const normCode = (c) => String(c || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
const genCode = () => Array.from({ length: REF.CODE_LEN }, () => CODE_CHARS[crypto.randomInt(CODE_CHARS.length)]).join("");
const maskEmail = (e) => { const [a, d] = String(e || "").split("@"); return a ? a.slice(0, 2) + "***@" + (d || "") : "Student"; };

/** Gives every user one permanent, unique referral code (created on first call). */
async function ensureReferralCode(uid) {
  const userRef = db.doc(`users/${uid}`);
  for (let i = 0; i < 8; i++) {
    const code = genCode();
    try {
      return await db.runTransaction(async (tx) => {
        const u = await tx.get(userRef);
        if (u.exists && u.data().referralCode) return u.data().referralCode;
        tx.create(db.doc(`referralCodes/${code}`), { uid, createdAt: FieldValue.serverTimestamp() });
        tx.set(userRef, { referralCode: code }, { merge: true });
        return code;
      });
    } catch (e) { if (e.code !== 6) throw e; } // 6 = code already taken, try another
  }
  throw httpErr(500, "Couldn't generate a referral code. Try again.");
}

/** Attaches someone else's code to this user. Allowed once, and only before the first purchase. */
async function applyReferralCode(uid, raw) {
  const code = normCode(raw);
  if (code.length < 4) throw httpErr(400, "Enter a valid referral code.");
  const userRef = db.doc(`users/${uid}`);
  return db.runTransaction(async (tx) => {
    const [u, c] = await Promise.all([tx.get(userRef), tx.get(db.doc(`referralCodes/${code}`))]);
    const ud = u.exists ? u.data() : {};
    if (ud.referredBy) {
      if (ud.referredByCode === code) return code;
      throw httpErr(409, "A referral code is already applied to your account.");
    }
    if (ud.courseAccess || ud.subscriptionExpiresAt) throw httpErr(400, "Referral codes can only be added before your first purchase.");
    if (!c.exists) throw httpErr(404, "This referral code isn't valid.");
    if (c.data().uid === uid) throw httpErr(400, "You can't use your own referral code.");
    tx.set(userRef, { referredBy: c.data().uid, referredByCode: code, referredAt: FieldValue.serverTimestamp() }, { merge: true });
    return code;
  });
}

/** Pays the referrer REWARD_COINS once per referred user, when that user's FIRST order is approved. */
async function creditReferral(orderId, buyerUid) {
  const order = (await db.doc(`orders/${orderId}`).get()).data();
  const referrerUid = order && order.referredBy;     // snapshot taken when the order was submitted
  if (!referrerUid || referrerUid === buyerUid) return;
  const samePhone = await db.collection("orders").where("uid", "==", referrerUid).where("phone", "==", order.phone).limit(1).get();
  const rewardRef = db.doc(`referralRewards/${buyerUid}`);   // one reward per referred user -> idempotent
  const base = { referrerUid, referredUid: buyerUid, orderId, code: order.referredByCode || null,
    referredLabel: maskEmail(order.email), createdAt: FieldValue.serverTimestamp() };
  await db.runTransaction(async (tx) => {
    if ((await tx.get(rewardRef)).exists) return;
    if (!samePhone.empty) { tx.create(rewardRef, { ...base, coins: 0, status: "rejected" }); return; }
    tx.create(rewardRef, { ...base, coins: REF.REWARD_COINS, status: "credited" });
    tx.set(db.doc(`users/${referrerUid}`), {
      coins: FieldValue.increment(REF.REWARD_COINS), totalEarned: FieldValue.increment(REF.REWARD_COINS),
      successfulReferrals: FieldValue.increment(1),
    }, { merge: true });
  });
}

/** If an approved order is later revoked, take the coins back. */
async function reverseReferral(orderId, buyerUid) {
  const rewardRef = db.doc(`referralRewards/${buyerUid}`);
  await db.runTransaction(async (tx) => {
    const r = await tx.get(rewardRef);
    if (!r.exists) return;
    const d = r.data();
    if (d.status !== "credited" || d.orderId !== orderId) return;
    tx.update(rewardRef, { status: "reversed", reversedAt: FieldValue.serverTimestamp() });
    tx.set(db.doc(`users/${d.referrerUid}`), {
      coins: FieldValue.increment(-d.coins), totalEarned: FieldValue.increment(-d.coins),
      successfulReferrals: FieldValue.increment(-1),
    }, { merge: true });
  });
}

/** Admin decision on a withdrawal: "paid" or "rejected" (coins go back to the user). */
async function settleWithdrawal(id, status, by) {
  const ref = db.doc(`withdrawals/${id}`);
  return db.runTransaction(async (tx) => {
    const s = await tx.get(ref);
    if (!s.exists) return null;
    const w = s.data();
    if (w.status !== "pending") return { ...w, already: true };
    tx.update(ref, { status, reviewedBy: by, reviewedAt: FieldValue.serverTimestamp() });
    const uRef = db.doc(`users/${w.uid}`);
    if (status === "rejected") tx.set(uRef, { coins: FieldValue.increment(w.coins) }, { merge: true });
    else tx.set(uRef, { coinsWithdrawn: FieldValue.increment(w.coins) }, { merge: true });
    return w;
  });
}

/* ---------- OCR text parsing ---------- */
function parsePaymentText(raw) {
  const text = (raw || "").replace(/\r/g, "");
  const lower = text.toLowerCase();
  const amounts = [...new Set((text.match(/\d{1,3}(?:,\d{3})*\.\d{2}|\d+\.\d{2}/g) || []).map((a) => a.replace(/,/g, "")))];
  const failed = /(fail|declin|pending|reversed|cancel|refund)/i.test(text);
  const successful = /(successful|success|paid|completed)/i.test(text) && !failed;

  let utr = null;
  const labelled = text.match(/(?:utr|upi\s*ref(?:erence)?(?:\s*(?:no|id))?|ref(?:erence)?\s*(?:no|id)|transaction\s*id)[^0-9A-Za-z]{0,6}(\d{12})/i);
  if (labelled) utr = labelled[1];
  else { const any = text.match(/\b\d{12}\b/); if (any) utr = any[0]; }

  return { lower, amounts, successful, utr, paidAtMs: parsePaidAt(text) };
}

function parsePaidAt(text) {
  const MON = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
  let y, m, d, hh, mm, ap;
  let r = text.match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*,?\s+(\d{4})[,\s]+(\d{1,2}):(\d{2})\s*([AaPp][Mm])?/);
  if (r) { d = r[1]; m = MON[r[2].toLowerCase()]; y = r[3]; hh = r[4]; mm = r[5]; ap = r[6]; }
  if (!r) {
    r = text.match(/([A-Za-z]{3})[a-z]*\s+(\d{1,2}),?\s+(\d{4})[,\s]+(\d{1,2}):(\d{2})\s*([AaPp][Mm])?/);
    if (r) { m = MON[r[1].toLowerCase()]; d = r[2]; y = r[3]; hh = r[4]; mm = r[5]; ap = r[6]; }
  }
  if (!r) {
    r = text.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})[,\s]+(\d{1,2}):(\d{2})\s*([AaPp][Mm])?/);
    if (r) { d = r[1]; m = r[2]; y = r[3]; hh = r[4]; mm = r[5]; ap = r[6]; }
  }
  if (!r || !m) return null;
  let H = parseInt(hh, 10);
  if (ap) { const pm = /p/i.test(ap); if (pm && H < 12) H += 12; if (!pm && H === 12) H = 0; }
  const t = Date.parse(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${String(H).padStart(2, "0")}:${mm}:00${IST}`);
  return Number.isNaN(t) ? null : t;
}

/* ---------- Telegram (uses Node's built-in fetch / FormData / Blob) ---------- */
const tgUrl = (method) => `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const keyboard = (orderId) => ({
  inline_keyboard: [[
    { text: "✅ Confirm Safe", callback_data: `ok:${orderId}` },
    { text: "🚫 Revoke Access", callback_data: `no:${orderId}` },
  ]],
});

async function tgCall(method, body) {
  const res = await fetch(tgUrl(method), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (!j.ok) throw new Error(`Telegram ${method}: ${j.description}`);
  return j.result;
}

async function tgSendPhoto(buf, caption, orderId) {
  const fd = new FormData();
  fd.append("chat_id", process.env.TELEGRAM_CHAT_ID);
  fd.append("caption", caption.slice(0, 1000));
  fd.append("parse_mode", "HTML");
  fd.append("reply_markup", JSON.stringify(keyboard(orderId)));
  fd.append("photo", new Blob([buf], { type: "image/jpeg" }), "payment.jpg");
  const res = await fetch(tgUrl("sendPhoto"), { method: "POST", body: fd });
  const j = await res.json();
  if (!j.ok) throw new Error(`Telegram sendPhoto: ${j.description}`);
  return j.result.message_id;
}

const tgAnswer = (id, text) => tgCall("answerCallbackQuery", { callback_query_id: id, text });
const tgEditCaption = (message, caption, orderId) =>
  tgCall("editMessageCaption", {
    chat_id: message.chat.id, message_id: message.message_id,
    caption: caption.slice(0, 1000), reply_markup: keyboard(orderId),
  }).catch(() => {}); // "message not modified" is harmless

const tgSendMessage = (text, markup) =>
  tgCall("sendMessage", { chat_id: process.env.TELEGRAM_CHAT_ID, text: text.slice(0, 4000), parse_mode: "HTML", reply_markup: markup });
const tgEditText = (message, text) =>
  tgCall("editMessageText", { chat_id: message.chat.id, message_id: message.message_id, text: text.slice(0, 4000),
    parse_mode: "HTML", reply_markup: { inline_keyboard: [] } }).catch(() => {});
const withdrawalKeyboard = (id) => ({ inline_keyboard: [[
  { text: "✅ Mark Paid", callback_data: `wp:${id}` },
  { text: "❌ Reject", callback_data: `wx:${id}` },
]] });

module.exports = {
  REF, httpErr, normCode, ensureReferralCode, applyReferralCode, creditReferral, reverseReferral, settleWithdrawal,
  tgSendMessage, tgEditText, withdrawalKeyboard,
  admin, db, Timestamp, FieldValue, crypto, CFG, DAY_MS,
  reply, verifyUser, approveOrder, parsePaymentText,
  esc, tgCall, tgSendPhoto, tgAnswer, tgEditCaption,
};

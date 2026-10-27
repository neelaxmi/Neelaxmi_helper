"use strict";
// Returns the caller's referral code (creating it on first use) and optionally applies someone else's code.
const { db, reply, verifyUser, ensureReferralCode, applyReferralCode } = require("./lib/common");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  try {
    const user = await verifyUser(event);
    const b = JSON.parse(event.body || "{}");
    let applyError = null;
    if (b.applyCode) {
      try { await applyReferralCode(user.uid, b.applyCode); }
      catch (e) { if (!e.status) throw e; applyError = e.message; }
    }
    const code = await ensureReferralCode(user.uid);
    const u = (await db.doc(`users/${user.uid}`).get()).data() || {};
    const signups = (await db.collection("users").where("referredBy", "==", user.uid).count().get()).data().count;
    return reply(200, { code, referredByCode: u.referredByCode || null, signups, applyError });
  } catch (e) {
    console.error(e);
    return reply(e.status || 500, { error: e.status ? e.message : "Server error" });
  }
};

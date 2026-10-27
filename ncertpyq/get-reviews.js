"use strict";
// Public, read-only: returns the latest APPROVED reviews for the homepage. Only name, rating and text are exposed.
const { db } = require("./lib/common");
exports.handler = async () => {
  try {
    const snap = await db.collection("reviews").where("approved", "==", true).limit(30).get();
    const reviews = snap.docs.map((d) => d.data())
      .sort((a, b) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0)).slice(0, 9)
      .map((r) => ({ name: String(r.name || "Student").split(" ")[0].slice(0, 30), rating: r.rating || 5, message: String(r.message || "").slice(0, 400) }));
    return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" }, body: JSON.stringify({ reviews }) };
  } catch (e) { console.error(e); return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviews: [] }) }; }
};

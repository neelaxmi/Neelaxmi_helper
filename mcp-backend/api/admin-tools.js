import { z } from "zod";

const COLLECTIONS = new Set(["free_classes", "courses", "quizzes", "module_pdfs"]);
const EDUCATORS = [
  { id: "ajay_mishra", name: "Ajay Mishra (AKM)" },
  { id: "ramesh_sharda", name: "Ramesh Sharda" },
  { id: "prateek_jain", name: "Prateek Jain" },
  { id: "seep_mam", name: "SEEP PAHUJA" },
  { id: "PRANAV_SIR", name: "PRANAV SIR" },
  { id: "AMIT_GUPTA", name: "AMIT GUPTA" },
  { id: "TEST_SERIES", name: "TEST SERIES" },
  { id: "RAKSHITA_MAM", name: "RAKSHITA SINGH" },
  { id: "neet_pyq", name: "NEET PYQ" },
  { id: "jee_pyq", name: "JEE PYQ" },
  { id: "handwritten_pdf", name: "HANDWRITTEN NOTES" }
];
const result = value => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }] });
const clean = v => String(v ?? "").trim();
const isSuper = user => user.galleryRole === "super_admin";
const isAdmin = user => ["super_admin", "sub_admin"].includes(user.galleryRole);
function requireAdmin(user) {
  if (!isAdmin(user)) throw new Error("Gallery Admin Panel access is not configured for this account.");
}
function requireSuper(user) {
  if (!isSuper(user)) throw new Error("This action requires Gallery Super Admin permission.");
}
function validateCollection(collection) {
  if (!COLLECTIONS.has(collection)) throw new Error("Unsupported educator content collection.");
}
function contentPath(db, educatorId, collection) {
  if (!EDUCATORS.some(e => e.id === educatorId)) throw new Error("Unknown educator ID.");
  validateCollection(collection);
  return db.collection("educators").doc(educatorId).collection(collection);
}
function cleanContent(input, user, status) {
  const out = {};
  for (const k of ["title","name","subject","detailedChapter","description","class","language","link","duration","timeText","targetQuizId","questions"]) {
    if (input[k] !== undefined && input[k] !== null) out[k] = typeof input[k] === "string" ? input[k].trim() : input[k];
  }
  out.createdBy = user.email;
  out.status = status;
  if (input.createdAt !== undefined) out.createdAt = input.createdAt;
  else out.createdAt = new Date();
  return out;
}
function validateQuizPayload(args) {
  const title = clean(args.title);
  if (!title) throw new Error("Quiz title is required.");
  if (!Array.isArray(args.questions) || !args.questions.length) throw new Error("At least one question is required.");
  if (args.questions.length > 400) throw new Error("A quiz can contain at most 400 questions per save.");
  const questions = args.questions.map((q, i) => {
    const question = clean(q?.question);
    const options = {};
    for (const k of ["A","B","C","D"]) if (clean(q?.options?.[k])) options[k] = clean(q.options[k]);
    const answer = clean(q?.answer).toUpperCase();
    if (!question || Object.keys(options).length < 2 || !options[answer]) throw new Error("Invalid question " + (i + 1) + ": use question, options A-D, and answer A-D.");
    const item = { question, options, answer };
    for (const k of ["subject","chapter","class","stream","examLevel","topic","questionLevel","tag","explanation","imageUrl"]) if (q[k] != null && clean(q[k])) item[k] = clean(q[k]);
    if (typeof q.isPYQ === "boolean") item.isPYQ = q.isPYQ;
    if (q.questionYear != null && Number.isFinite(Number(q.questionYear))) item.questionYear = Number(q.questionYear);
    return item;
  });
  return { title, questions, durationMinutes: Math.max(1, Number(args.durationMinutes) || questions.length), videoType: args.videoType || "iframe", videoSolutionUrl: clean(args.videoSolutionUrl), test_quiz: !!args.testQuiz, isPaid: !!args.isPaid };
}
export function registerAdminTools(server, user, ctx) {
  requireAdmin(user);
  const { galleryDb, quizDb, admin } = ctx;
  const F = admin.firestore.FieldValue;

  server.registerTool("list_admin_educators", {
    description: "List the educator IDs/names supported by the existing Admin Panel.",
    inputSchema: {}
  }, async () => result(EDUCATORS));

  server.registerTool("list_educator_content", {
    description: "Read content cards from an educator's existing Content Manager collections. Sub Admins can read; writes remain role-restricted.",
    inputSchema: { educatorId: z.string(), collection: z.enum(["all","free_classes","courses","quizzes","module_pdfs"]).optional(), status: z.enum(["all","pending","approved","rejected"]).optional(), limit: z.number().int().min(1).max(300).optional() }
  }, async ({ educatorId, collection = "all", status = "all", limit = 100 }) => {
    const cols = collection === "all" ? [...COLLECTIONS] : [collection];
    const rows = [];
    for (const col of cols) {
      const snap = await contentPath(galleryDb, educatorId, col).limit(limit).get();
      for (const doc of snap.docs) {
        const d = doc.data();
        if (status !== "all" && d.status !== status) continue;
        rows.push({ id: doc.id, collection: col, educatorId, ...d });
      }
    }
    rows.sort((a,b) => {
      const ta = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
      const tb = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
      return tb - ta;
    });
    return result(rows.slice(0, limit));
  });

  server.registerTool("get_educator_content", {
    description: "Fetch one exact educator content document by educator, collection and document ID.",
    inputSchema: { educatorId: z.string(), collection: z.enum(["free_classes","courses","quizzes","module_pdfs"]), contentId: z.string() }
  }, async ({ educatorId, collection, contentId }) => {
    const doc = await contentPath(galleryDb, educatorId, collection).doc(contentId).get();
    return result(doc.exists ? { id: doc.id, educatorId, collection, ...doc.data() } : null);
  });

  server.registerTool("save_educator_content", {
    description: "Create or edit a Free Class, Course, Module PDF or educator Quiz content card. Sub Admin creates/edits only own pending items; Super Admin saves approved by default. Explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), educatorId: z.string(), collection: z.enum(["free_classes","courses","quizzes","module_pdfs"]), contentId: z.string().optional(), data: z.record(z.any()) }
  }, async ({ confirm, educatorId, collection, contentId, data }) => {
    if (!confirm) throw new Error("Save cancelled. Review the content and set confirm=true.");
    const ref = contentPath(galleryDb, educatorId, collection);
    let existing = null;
    if (contentId) {
      const snap = await ref.doc(contentId).get();
      if (!snap.exists) throw new Error("Content document not found.");
      existing = snap.data();
      if (!isSuper(user) && (existing.createdBy !== user.email || existing.status !== "pending")) throw new Error("Sub Admins may edit only their own pending content.");
    }
    if (!isSuper(user) && existing && data.status && data.status !== "pending") throw new Error("Sub Admins cannot change approval status.");
    const status = isSuper(user) ? (data.status || "approved") : "pending";
    const payload = cleanContent(data, user, status);
    if (existing) {
      delete payload.createdAt;
      await ref.doc(contentId).set(payload, { merge: true });
      return result({ saved: true, contentId, collection, status });
    }
    const doc = await ref.add(payload);
    return result({ saved: true, contentId: doc.id, collection, status });
  });

  server.registerTool("delete_educator_content", {
    description: "Permanently delete an educator content card. Super Admin only; explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), educatorId: z.string(), collection: z.enum(["free_classes","courses","quizzes","module_pdfs"]), contentId: z.string() }
  }, async ({ confirm, educatorId, collection, contentId }) => {
    requireSuper(user);
    if (!confirm) throw new Error("Delete cancelled; set confirm=true after reviewing the exact target.");
    await contentPath(galleryDb, educatorId, collection).doc(contentId).delete();
    return result({ deleted: true, educatorId, collection, contentId });
  });

  server.registerTool("list_pending_content_approvals", {
    description: "List all pending educator content across every Admin Panel educator. Super Admin only.",
    inputSchema: { limit: z.number().int().min(1).max(500).optional() }
  }, async ({ limit = 300 }) => {
    requireSuper(user);
    const rows = [];
    for (const educator of EDUCATORS) for (const col of COLLECTIONS) {
      const snap = await contentPath(galleryDb, educator.id, col).where("status","==","pending").limit(limit).get();
      for (const doc of snap.docs) rows.push({ id: doc.id, educatorId: educator.id, educatorName: educator.name, collection: col, ...doc.data() });
    }
    return result(rows.slice(0, limit));
  });

  server.registerTool("process_content_approval", {
    description: "Approve or reject a pending educator content item. Super Admin only; explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), educatorId: z.string(), collection: z.enum(["free_classes","courses","quizzes","module_pdfs"]), contentId: z.string(), status: z.enum(["approved","rejected"]) }
  }, async ({ confirm, educatorId, collection, contentId, status }) => {
    requireSuper(user);
    if (!confirm) throw new Error("Approval action cancelled; set confirm=true after review.");
    const ref = contentPath(galleryDb, educatorId, collection).doc(contentId);
    const snap = await ref.get();
    if (!snap.exists) throw new Error("Content item not found.");
    if (snap.data().status !== "pending") throw new Error("Only pending content can be approved or rejected.");
    await ref.update({ status, reviewedBy: user.email, reviewedAt: F.serverTimestamp() });
    return result({ updated: true, educatorId, collection, contentId, status });
  });

  server.registerTool("list_admin_quizzes", {
    description: "List global quizzes from quiznew-30700, matching the Admin Panel Quiz Bank.",
    inputSchema: { limit: z.number().int().min(1).max(500).optional() }
  }, async ({ limit = 200 }) => {
    const snap = await quizDb.collection("quizzes").limit(limit).get();
    return result(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });

  server.registerTool("get_admin_quiz", {
    description: "Read one quiz from quiznew-30700 by its UID.",
    inputSchema: { quizId: z.string() }
  }, async ({ quizId }) => {
    const doc = await quizDb.collection("quizzes").doc(quizId).get();
    return result(doc.exists ? { id: doc.id, ...doc.data() } : null);
  });

  server.registerTool("save_admin_quiz", {
    description: "Create or update a quiz in the global quiz bank and its owner mirror. Supports title, duration, canonical questions, video solution, test_quiz and paid flags. Explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), quizId: z.string().optional(), title: z.string(), durationMinutes: z.number().optional(), questions: z.array(z.record(z.any())).min(1).max(400), videoType: z.string().optional(), videoSolutionUrl: z.string().optional(), testQuiz: z.boolean().optional(), isPaid: z.boolean().optional() }
  }, async args => {
    if (!args.confirm) throw new Error("Quiz save cancelled; set confirm=true after reviewing the complete quiz.");
    const quiz = validateQuizPayload(args);
    const quizId = args.quizId || quizDb.collection("quizzes").doc().id;
    const ref = quizDb.collection("quizzes").doc(quizId);
    const old = await ref.get();
    const authorId = old.exists ? (old.data().authorId || user.galleryUid) : user.galleryUid;
    const payload = { ...quiz, authorId, updatedAt: F.serverTimestamp() };
    if (!old.exists) payload.createdAt = F.serverTimestamp();
    await ref.set(payload, { merge: true });
    await quizDb.doc("artifacts/quizzes/users/" + authorId + "/quizzes/" + quizId).set(payload, { merge: true });
    return result({ saved: true, quizId, title: quiz.title, questionCount: quiz.questions.length, isPaid: quiz.isPaid });
  });

  server.registerTool("delete_admin_quiz", {
    description: "Permanently delete a global quiz and its owner mirror. Super Admin only; explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), quizId: z.string() }
  }, async ({ confirm, quizId }) => {
    requireSuper(user);
    if (!confirm) throw new Error("Quiz deletion cancelled; set confirm=true after review.");
    const ref = quizDb.collection("quizzes").doc(quizId);
    const snap = await ref.get();
    if (!snap.exists) throw new Error("Quiz not found.");
    const owner = snap.data().authorId;
    await ref.delete();
    if (owner) await quizDb.doc("artifacts/quizzes/users/" + owner + "/quizzes/" + quizId).delete();
    return result({ deleted: true, quizId });
  });

  server.registerTool("set_admin_quiz_used", {
    description: "Mark a quiz as used/unused in the Quiz Bank. Explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), quizId: z.string(), isUsed: z.boolean() }
  }, async ({ confirm, quizId, isUsed }) => {
    if (!confirm) throw new Error("Update cancelled; set confirm=true.");
    await quizDb.collection("quizzes").doc(quizId).set({ isUsed }, { merge: true });
    return result({ updated: true, quizId, isUsed });
  });

  server.registerTool("set_quiz_custom_alias", {
    description: "Assign a clean custom URL slug to a quiz, or remove its current alias. Explicit confirm=true required.",
    inputSchema: { confirm: z.boolean(), quizId: z.string(), slug: z.string().optional(), remove: z.boolean().optional() }
  }, async ({ confirm, quizId, slug, remove = false }) => {
    if (!confirm) throw new Error("Alias change cancelled; set confirm=true.");
    const quizRef = quizDb.collection("quizzes").doc(quizId);
    const quizSnap = await quizRef.get();
    if (!quizSnap.exists) throw new Error("Quiz not found.");
    const oldSlug = quizSnap.data().customSlug || null;
    const batch = quizDb.batch();
    if (remove) {
      if (oldSlug) batch.delete(quizDb.collection("quiz_aliases").doc(oldSlug));
      batch.update(quizRef, { customSlug: F.delete() });
      await batch.commit();
      return result({ updated: true, quizId, removed: oldSlug });
    }
    const normalized = clean(slug).toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,40);
    if (!normalized) throw new Error("A valid non-empty alias is required.");
    const aliasRef = quizDb.collection("quiz_aliases").doc(normalized);
    const aliasSnap = await aliasRef.get();
    if (aliasSnap.exists && aliasSnap.data().quizId !== quizId) throw new Error("That alias is already assigned to another quiz.");
    batch.set(aliasRef, { quizId, title: quizSnap.data().title || "", createdAt: F.serverTimestamp() });
    batch.update(quizRef, { customSlug: normalized });
    if (oldSlug && oldSlug !== normalized) batch.delete(quizDb.collection("quiz_aliases").doc(oldSlug));
    await batch.commit();
    return result({ updated: true, quizId, slug: normalized, url: "https://neelaxmi.vercel.app/quiz/quizzes.html?uid=" + normalized });
  });

  server.registerTool("get_paid_quiz_token_pool", {
    description: "Read the paid quiz token pool counts. Super Admin only.",
    inputSchema: { quizId: z.string() }
  }, async ({ quizId }) => {
    requireSuper(user);
    const doc = await quizDb.collection("quiz_tokens").doc(quizId).get();
    if (!doc.exists) return result({ quizId, exists: false, totalGenerated: 0, usedCount: 0, remaining: 0 });
    const d = doc.data(), totalGenerated = Number(d.totalGenerated || 0), usedCount = Number(d.usedCount || 0);
    return result({ quizId, exists: true, totalGenerated, usedCount, remaining: Math.max(0,totalGenerated-usedCount) });
  });

  server.registerTool("top_up_paid_quiz_tokens", {
    description: "Add more unique six-digit access tokens to a paid quiz pool without deleting existing tokens. Super Admin only; explicit confirm=true required. Maximum 5,000 per call.",
    inputSchema: { confirm: z.boolean(), quizId: z.string(), count: z.number().int().min(1).max(5000).optional() }
  }, async ({ confirm, quizId, count = 5000 }) => {
    requireSuper(user);
    if (!confirm) throw new Error("Token generation cancelled; set confirm=true after confirming quizId and count.");
    const poolRef = quizDb.collection("quiz_tokens").doc(quizId);
    const codes = new Set();
    while (codes.size < count) codes.add(String(Math.floor(Math.random()*1000000)).padStart(6,"0"));
    const list = [...codes];
    for (let i=0;i<list.length;i+=500) {
      const batch = quizDb.batch();
      for (const code of list.slice(i,i+500)) batch.set(poolRef.collection("tokens").doc(), { code, quizId, used:false, rand:Math.random(), createdAt:F.serverTimestamp() });
      await batch.commit();
    }
    await poolRef.set({ quizId, totalGenerated:F.increment(count), usedCount:F.increment(0), updatedAt:F.serverTimestamp() }, { merge:true });
    return result({ quizId, generated: count });
  });
}

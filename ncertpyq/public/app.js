import { auth, onAuthStateChanged, db, doc, onSnapshot, collection, query, where } from "./firebase-config.js";
import { syncReferral, getPendingRef, cleanCode, captureRefFromUrl } from "./referral.js";
const $ = (id) => document.getElementById(id);
const API = "/api/ncertpyq";
const GRACE_MS = 15 * 60 * 1000; 
const MAX_BYTES = 700 * 1024; 
let user = null, session = null, timerId = null;
onAuthStateChanged(auth, (u) => {
  if (!u) { location.replace("pyq.html"); return; }    
  user = u;
  $("emailInput").value = u.email || "";
  if (u.displayName) $("nameInput").value = u.displayName;
  initReferral(u);
  watchAccount(u);
});

const PENDING = new Set(["pending", "pending_review"]);
const DAY = 86400000, YEAR_DAYS = 365;
const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmtDateTime = (d) => d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
let expiry = null, orders = [], gotUser = false, gotOrders = false, extending = false, tickId = null;

function watchAccount(u) {
  onSnapshot(doc(db, "users", u.uid), (snap) => {
    const ts = snap.exists() && snap.data().subscriptionExpiresAt;
    expiry = ts && ts.toDate ? ts.toDate() : null; gotUser = true; render();
  }, (e) => { console.error(e); gotUser = true; render(); });
  onSnapshot(query(collection(db, "orders"), where("uid", "==", u.uid)), (snap) => {
    orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt ? b.createdAt.toMillis() : Date.now()) - (a.createdAt ? a.createdAt.toMillis() : Date.now()));
    gotOrders = true; render();
  }, (e) => { console.error(e); gotOrders = true; render(); });
  clearInterval(tickId); tickId = setInterval(render, 30000);  
}

function render() {
  if (!gotUser || !gotOrders) return;
  const active = !!expiry && expiry.getTime() > Date.now();
  const pending = orders.find((o) => PENDING.has(o.status));
  const latest = orders[0];
  const justRejected = !pending && !active && latest && latest.status === "revoked";
  $("loadingCard").hidden = true;
  $("subCard").hidden = !active;
  $("pendingCard").hidden = !pending;
  $("rejectCard").hidden = !justRejected;
  const showFlow = !pending && (!active || extending);
  $("flowWrap").hidden = !showFlow;
  $("steps").hidden = !(showFlow || pending);
  $("paiseNote").hidden = !showFlow;
  $("priceCard").hidden = !showFlow;
  if (pending) setStep(3); else if (showFlow && !session) setStep(1);

  if (active) renderSub();
  if (pending) {
    $("pendRef").textContent = "Order #" + pending.id.slice(0, 8).toUpperCase();
    $("pendAt").textContent = pending.createdAt ? "Submitted " + fmtDateTime(pending.createdAt.toDate()) : "Just now";
    clearInterval(timerId);
  }
  renderHistory();
}

function renderSub() {
  const ms = expiry.getTime() - Date.now(), days = Math.ceil(ms / DAY);
  $("daysNum").textContent = days;
  $("daysLbl").textContent = days === 1 ? "day left" : "days left";
  $("expDate").textContent = fmtDate(expiry);
  const d = Math.floor(ms / DAY), h = Math.floor((ms % DAY) / 3600000), m = Math.floor((ms % 3600000) / 60000);
  $("expExact").textContent = d > 0 ? `${d}d ${h}h remaining` : `${h}h ${m}m remaining`;
  const frac = Math.max(0.02, Math.min(1, days / YEAR_DAYS)), C = 326.7;
  $("ringFg").style.strokeDashoffset = String(C * (1 - frac));
  $("ringFg").classList.toggle("low", days <= 15);
  $("soonWarn").hidden = days > 15;
  $("extendBtn").hidden = extending;
}

function renderHistory() {
  const label = { approved: ["ok", "Approved"], pending: ["wait", "Pending review"], pending_review: ["wait", "Pending review"], revoked: ["bad", "Not verified"] };
  const list = orders.slice(0, 5);
  $("historyCard").hidden = list.length === 0;
  $("histList").innerHTML = list.map((o) => {
    const [cls, txt] = label[o.status] || ["wait", o.status || "Processing"];
    const when = o.createdAt ? fmtDateTime(o.createdAt.toDate()) : "Just now";
    return `<li><span>#${o.id.slice(0, 8).toUpperCase()}<small>${when}</small></span><span class="co-chip ${cls}">${txt}</span></li>`;
  }).join("");
}

$("extendBtn").addEventListener("click", () => { extending = true; render(); window.scrollTo({ top: 0, behavior: "smooth" }); });

const setStep = (n) => document.querySelectorAll("#steps li").forEach((li) => {
  const i = Number(li.dataset.s); li.className = i < n ? "done" : i === n ? "now" : "";
});
function refMsg(text, kind) { const m = $("refMsg"); m.hidden = !text; m.textContent = text || ""; m.className = "co-msg " + (kind || ""); }
function showApplied(code) {
  $("refInput").value = code; $("refInput").readOnly = true; $("refApplyBtn").hidden = true;
  $("refSub").textContent = "Applied — your friend earns a reward once your payment is approved.";
  refMsg("✓ Referral code applied", "good");
  $("refSummary").hidden = false; $("refSummary").textContent = `Referral code ${code} will be used for this order.`;
}
async function initReferral(u) {
  captureRefFromUrl();                               
  const r = await syncReferral(u);                  
  if (!r) return;
  if (r.referredByCode) return showApplied(r.referredByCode);
  if (r.applyError) refMsg(r.applyError, "err");
}
$("refApplyBtn").addEventListener("click", async () => {
  const code = cleanCode($("refInput").value);
  if (code.length < 4) return refMsg("Enter a valid referral code.", "err");
  const btn = $("refApplyBtn"); btn.disabled = true; refMsg("");
  try {
    const r = await api("referral-init", { applyCode: code });
    if (r.referredByCode) showApplied(r.referredByCode); else refMsg(r.applyError || "Couldn't apply this code.", "err");
  } catch (err) { refMsg(err.message, "err"); }
  btn.disabled = false;
});

async function api(name, body) {
  const token = await user.getIdToken();
  const res = await fetch(`${API}/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

$("startBtn").addEventListener("click", async () => {
  const btn = $("startBtn"); btn.disabled = true; $("startError").hidden = true;
  try {
    session = await api("create-session");
    $("amountText").textContent = session.amount;
    $("qrImg").src = session.qrDataUrl;
    $("stepStart").hidden = true; $("startCard").hidden = true; $("stepPay").hidden = false; $("stepUpload").hidden = false;
    setStep(2);
    startTimer();
  } catch (err) {
    $("startError").textContent = err.message; $("startError").hidden = false; btn.disabled = false;
  }
});

function startTimer() {
  clearInterval(timerId);
  const tick = () => {
    const left = session.expiresAtMs - Date.now(), el = $("timer");
    if (left > 0) {
      el.textContent = `QR valid for ${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, "0")}`;
      el.classList.remove("expired");
    } else {
      $("qrImg").hidden = true; el.classList.add("expired");
      if (Date.now() - session.expiresAtMs > GRACE_MS) {
        el.textContent = "Session ended. Refresh to start a new one."; $("submitBtn").disabled = true; clearInterval(timerId);
      } else el.textContent = "QR expired. If you already paid, upload your screenshot now.";
    }
  };
  tick(); timerId = setInterval(tick, 1000);
}

async function sha256Hex(blobOrFile) {
  const d = await crypto.subtle.digest("SHA-256", await blobOrFile.arrayBuffer());
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function compressImage(file) {
  const bmp = await createImageBitmap(file);
  let width = Math.min(bmp.width, 1400);
  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = width / bmp.width;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale); canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
    for (const q of [0.85, 0.7, 0.55]) {
      const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", q));
      if (blob && blob.size <= MAX_BYTES) return blob;
    }
    width = Math.round(width * 0.8);
  }
  throw new Error("Couldn't shrink this image enough. Crop the screenshot and retry.");
}

const toBase64 = (blob) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(String(r.result).split(",")[1]);
  r.onerror = () => rej(new Error("Couldn't read image."));
  r.readAsDataURL(blob);
});

$("fileInput").addEventListener("change", () => { const f = $("fileInput").files[0]; $("fileName").textContent = f ? `Selected: ${f.name}` : ""; });
const fail = (m) => { const e = $("formError"); e.textContent = m; e.hidden = false; };

$("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault(); $("formError").hidden = true;
  if (!user || !session) return fail("Please generate the payment QR first.");

  const name = $("nameInput").value.trim(), phone = $("phoneInput").value.trim(), file = $("fileInput").files[0];
  if (name.length < 2) return fail("Enter your name.");
  if (!/^[6-9]\d{9}$/.test(phone)) return fail("Enter a valid 10-digit Indian mobile number.");
  if (!file) return fail("Choose your payment screenshot.");
  if (!["image/jpeg", "image/png"].includes(file.type)) return fail("Only JPG or PNG images are allowed.");
  if (file.size > 15 * 1024 * 1024) return fail("Image is too large.");

  const btn = $("submitBtn"); btn.disabled = true; btn.textContent = "Preparing…";
  try {
    const imageHash = await sha256Hex(file);             
    const small = await compressImage(file);
    btn.textContent = "Uploading…";
    await api("submit-order", { sessionId: session.sessionId, name, phone, imageHash, imageBase64: await toBase64(small) });

    $("orderForm").hidden = true; $("refCard").hidden = true; clearInterval(timerId); setStep(3);
    $("orderStatus").hidden = false; $("orderStatus").textContent = "✅ Submitted! Loading your review status…";
  } catch (err) {
    fail(err.message || "Upload failed. Please try again.");
    btn.disabled = false; btn.textContent = "Submit for verification";
  }
});


$("priceToggle").addEventListener("click", () => {
  const open = $("priceToggle").getAttribute("aria-expanded") !== "true";
  $("priceToggle").setAttribute("aria-expanded", String(open)); $("priceBody").hidden = !open;
  if (open && user) { $("pdEmail").textContent = user.email || "your account email"; if (!$("pdName").value) $("pdName").value = user.displayName || ""; }
});
$("pdReason").addEventListener("input", () => { $("pdCount").textContent = `${$("pdReason").value.length} / 1000`; });
function pdMsg(t, kind) { const m = $("pdMsg"); m.hidden = !t; m.textContent = t || ""; m.className = "co-msg " + (kind || ""); }
$("priceForm").addEventListener("submit", async (e) => {
  e.preventDefault(); pdMsg("");
  const offerPrice = Number($("pdOffer").value), reason = $("pdReason").value.trim(), name = $("pdName").value.trim(), phone = $("pdPhone").value.trim();
  if (name.length < 2) return pdMsg("Enter your name.", "err");
  if (!Number.isInteger(offerPrice) || offerPrice < 1 || offerPrice > 148) return pdMsg("Enter a whole amount between ₹1 and ₹148.", "err");
  if (reason.length < 15) return pdMsg("Please tell us a little more about why (at least 15 characters).", "err");
  if (phone && !/^[6-9]\d{9}$/.test(phone)) return pdMsg("Enter a valid 10-digit mobile number or leave it empty.", "err");
  const btn = $("pdBtn"); btn.disabled = true; btn.textContent = "Sending…";
  try {
    await api("request-price-drop", { name, offerPrice, reason, phone });
    $("priceForm").hidden = true; pdMsg("✅ Request sent! Our team will reply on your email.", "good");
  } catch (err) { pdMsg(err.message, "err"); btn.disabled = false; btn.textContent = "Send request"; }
});

import { auth, onAuthStateChanged, signOut, updateProfile, db, doc, collection, query, where, onSnapshot } from "./firebase-config.js";
import { SITE_CONFIG } from "./site-config.js";
import { syncReferral, api, referralLink } from "./referral.js";

const $ = (id) => document.getElementById(id);
const MIN_WITHDRAW = 200, REWARD = 30;
const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const say = (el, text, kind) => { el.hidden = !text; el.textContent = text || ""; el.className = "pf-msg " + (kind || ""); };
let coins = 0;

onAuthStateChanged(auth, (user) => {
  $("authCheckSplash").hidden = true;
  if (!user) { location.replace("pyq.html"); return; }
  $("pf").hidden = false;
  renderName(user);
  $("emailText").textContent = user.email || "";
  renderSites();
  watchUser(user);
  watchRewards(user);
  watchWithdrawals(user);
  loadReferral(user);
});

$("logoutBtn").addEventListener("click", async () => { try { await signOut(auth); } finally { location.href = "pyq.html"; } });

function renderName(user) {
  const n = user.displayName || "";
  $("nameInput").value = n;
  $("helloName").textContent = n || "My Profile";
  $("avatar").textContent = (n || user.email || "?").trim().charAt(0).toUpperCase();
}
$("nameForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("nameInput").value.trim().replace(/\s+/g, " ");
  if (name.length < 2) return say($("nameMsg"), "Enter at least 2 characters.", "err");
  const btn = $("nameSaveBtn"); btn.disabled = true;
  try {
    await updateProfile(auth.currentUser, { displayName: name });
    renderName(auth.currentUser);
    say($("nameMsg"), "Name saved ✓", "good");
  } catch (err) { console.error(err); say($("nameMsg"), "Couldn't save your name. Try again.", "err"); }
  btn.disabled = false;
});

function watchUser(user) {
  onSnapshot(doc(db, "users", user.uid), (snap) => {
    const d = snap.exists() ? snap.data() : {};
    const exp = d.subscriptionExpiresAt ? d.subscriptionExpiresAt.toDate() : null;
    const active = !!exp && exp > new Date();
    $("subBadge").innerHTML = active
      ? '<span class="pf-badge ok">● Active</span>'
      : `<span class="pf-badge off">● ${exp ? "Expired" : "No active plan"}</span>`;
    if (active) {
      const days = Math.ceil((exp - Date.now()) / 86400000);
      $("subDetail").innerHTML = `Expires on <b>${fmtDate(exp)}</b> — ${days} day${days === 1 ? "" : "s"} left`;
      $("subBar").style.width = Math.max(3, Math.min(100, (days / 365) * 100)) + "%";
      $("subBarWrap").hidden = false;
      $("subBtn").textContent = "Extend by 365 days";
    } else {
      $("subDetail").textContent = exp ? `Your access ended on ${fmtDate(exp)}.` : "Unlock all chapters, highlights and linked PYQs for 365 days.";
      $("subBarWrap").hidden = true;
      $("subBtn").textContent = exp ? "Renew subscription" : "Unlock all chapters";
    }
    coins = Math.max(0, d.coins || 0);
    $("coinBal").textContent = coins;
    $("statBought").textContent = d.successfulReferrals || 0;
    $("statWithdrawn").textContent = d.coinsWithdrawn || 0;
    updateWithdrawHint();
  });
}

async function loadReferral(user) {
  const r = await syncReferral(user);
  if (!r) { $("codeBox").value = "Unavailable"; return; }
  const link = referralLink(r.code);
  $("codeBox").value = r.code;
  $("linkBox").value = link;
  $("statSignups").textContent = r.signups || 0;
  $("waShare").href = "https://wa.me/?text=" + encodeURIComponent(
    `Join me on ${SITE_CONFIG.brandName} — NCERT chapters with PYQ highlights. Sign up with my link: ${link}  (code: ${r.code})`);
}
document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
  const input = $(b.dataset.copy);
  try { await navigator.clipboard.writeText(input.value); } catch (e) { input.select(); document.execCommand("copy"); }
  const old = b.textContent; b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = old), 1400);
}));

const item = (left, right, cls) => `<div class="pf-item"><span>${left}</span><span class="amt ${cls || ""}">${right}</span></div>`;
const ts = (t) => (t && t.toDate ? t.toDate().getTime() : 0);

function watchRewards(user) {
  onSnapshot(query(collection(db, "referralRewards"), where("referrerUid", "==", user.uid)), (snap) => {
    const rows = snap.docs.map((d) => d.data()).sort((a, b) => ts(b.createdAt) - ts(a.createdAt));
    $("rewardList").innerHTML = rows.length ? rows.map((r) => {
      if (r.status === "credited") return item(`${r.referredLabel || "Student"} subscribed`, `+${r.coins} coins`, "plus");
      if (r.status === "reversed") return item(`${r.referredLabel || "Student"} — payment revoked`, `−${r.coins} coins`, "minus");
      return item(`${r.referredLabel || "Student"} — not eligible`, "0", "");
    }).join("") : '<div class="pf-muted">No referrals yet. Share your link to start earning.</div>';
  });
}
function watchWithdrawals(user) {
  const label = { pending: "⏳ Pending", paid: "✅ Paid", rejected: "❌ Rejected — coins returned" };
  onSnapshot(query(collection(db, "withdrawals"), where("uid", "==", user.uid)), (snap) => {
    const rows = snap.docs.map((d) => d.data()).sort((a, b) => ts(b.createdAt) - ts(a.createdAt));
    $("wdList").innerHTML = rows.length ? rows.map((w) =>
      item(`${label[w.status] || w.status}<br><span class="pf-muted">${w.upiId}</span>`, `${w.coins} coins`, "")).join("")
      : '<div class="pf-muted">No withdrawal requests yet.</div>';
  });
}

function updateWithdrawHint() {
  const ok = coins >= MIN_WITHDRAW;
  $("wdBtn").disabled = !ok;
  $("wdHint").textContent = ok
    ? `Available: ${coins} coins (₹${coins}). Minimum ${MIN_WITHDRAW}.`
    : `You need ${MIN_WITHDRAW} coins to withdraw — ${MIN_WITHDRAW - coins} more to go.`;
  $("wdCoins").max = coins;
  if (ok && !$("wdCoins").value) $("wdCoins").value = coins;
}
$("wdForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = Number($("wdCoins").value), upiId = $("wdUpi").value.trim();
  if (!Number.isInteger(amount) || amount < MIN_WITHDRAW) return say($("wdMsg"), `Minimum withdrawal is ${MIN_WITHDRAW} coins.`, "err");
  if (amount > coins) return say($("wdMsg"), "You don't have that many coins.", "err");
  if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) return say($("wdMsg"), "Enter a valid UPI ID (e.g. name@okaxis).", "err");
  $("wdBtn").disabled = true;
  try {
    await api("request-withdrawal", { coins: amount, upiId });
    say($("wdMsg"), "Request sent ✓ — we'll pay it to your UPI ID after review.", "good");
    $("wdCoins").value = "";
  } catch (err) { say($("wdMsg"), err.message, "err"); }
  updateWithdrawHint();
});

function renderSites() {
  const sites = (SITE_CONFIG.otherWebsites || []).filter((s) => s.url);
  $("sites").innerHTML = sites.map((s) =>
    `<a class="pf-site" href="${s.url}" target="_blank" rel="noopener"><b>${s.icon || "🔗"} ${s.name}</b><span>${s.desc || ""}</span></a>`).join("")
    || '<div class="pf-muted">More websites coming soon.</div>';
}

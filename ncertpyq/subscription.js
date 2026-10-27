import { db, doc, getDoc, onSnapshot, auth } from "./firebase-config.js";

const unlockCtaBtn = document.getElementById("unlockCtaBtn");
const subDaysTag = document.getElementById("subDaysTag");
let cachedExpiry = null;
let unsub = null;
let recheckTimer = null;
let wasActive = false;

const daysRemaining = (d) => Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86400000));

export function hasActiveSubscription() { return !!cachedExpiry && cachedExpiry.getTime() > Date.now(); }
export function getCachedExpiry() { return cachedExpiry; }
export function openUnlockModal() { window.location.href = "checkout.html"; }

function renderTopbarState(known = true) {
  const active = hasActiveSubscription();
  if (unlockCtaBtn) unlockCtaBtn.hidden = !known || active;
  if (subDaysTag) {
    subDaysTag.hidden = !(known && active);
    if (active) {
      const n = daysRemaining(cachedExpiry);
      subDaysTag.textContent = n > 1 ? `${n} days left` : n === 1 ? "1 day left" : "Expires today";
      subDaysTag.title = "Subscription active";
    }
  }
}

function scheduleRecheck() {
  clearTimeout(recheckTimer);
  if (!cachedExpiry) return;
  const ms = cachedExpiry.getTime() - Date.now();
  if (ms > 0) recheckTimer = setTimeout(() => renderTopbarState(true), Math.min(ms + 1000, 2147483000));
}

function apply(data) {
  const ts = data && data.subscriptionExpiresAt;
  cachedExpiry = ts && ts.toDate ? ts.toDate() : null;
  renderTopbarState(true);
  scheduleRecheck();
  const active = hasActiveSubscription();
  if (active && !wasActive) window.dispatchEvent(new CustomEvent("neelaxmi:subscription-active", { detail: { expiresAt: cachedExpiry } }));
  wasActive = active;
}

export async function refreshStatus(user) {
  if (unsub) { unsub(); unsub = null; }
  clearTimeout(recheckTimer);
  if (!user) { cachedExpiry = null; wasActive = false; renderTopbarState(false); return; }
  renderTopbarState(false);
  try {
    unsub = onSnapshot(doc(db, "users", user.uid),
      (snap) => apply(snap.exists() ? snap.data() : {}),
      async (err) => { console.error("Subscription listener failed:", err); try { const s = await getDoc(doc(db, "users", user.uid)); apply(s.exists() ? s.data() : {}); } catch { cachedExpiry = null; renderTopbarState(true); } });
  } catch (err) { console.error("Subscription check failed:", err); cachedExpiry = null; renderTopbarState(true); }
}

if (unlockCtaBtn) unlockCtaBtn.addEventListener("click", openUnlockModal);

import { auth } from "./firebase-config.js";

const PENDING_KEY = "neelaxmi:pendingRef";
const API = "/api/ncertpyq";

export const cleanCode = (c) => String(c || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
export function savePendingRef(code) { try { localStorage.setItem(PENDING_KEY, cleanCode(code)); } catch (e) {} }
export function getPendingRef() { try { return localStorage.getItem(PENDING_KEY) || ""; } catch (e) { return ""; } }
function clearPendingRef() { try { localStorage.removeItem(PENDING_KEY); } catch (e) {} }

export function captureRefFromUrl() {
  const c = cleanCode(new URLSearchParams(location.search).get("ref"));
  if (c) savePendingRef(c);
  return c;
}

export async function api(name, body) {
  const user = auth.currentUser;
  if (!user) throw new Error("Please log in.");
  const res = await fetch(`${API}/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export async function syncReferral(user, applyCode) {
  const code = applyCode || getPendingRef();
  try {
    const r = await api("referral-init", code ? { applyCode: code } : {});
    if (!applyCode) clearPendingRef();      
    return r;
  } catch (e) { console.error("Referral sync failed:", e); return null; }
}

export const referralLink = (code) => `${location.origin}/pyq.html?ref=${code}`;

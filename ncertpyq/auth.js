import {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "./firebase-config.js";
import { refreshStatus } from "./subscription.js";
import { captureRefFromUrl, getPendingRef, savePendingRef, syncReferral } from "./referral.js";

const authCheckSplash = document.getElementById("authCheckSplash");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const authTabs = document.querySelectorAll(".auth-tab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authError = document.getElementById("authError");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const signupSubmitBtn = document.getElementById("signupSubmitBtn");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userNameTag = document.getElementById("userNameTag");

function showAuthError(message) {
  authError.textContent = message;
  authError.hidden = false;
}

function clearAuthError() {
  authError.hidden = true;
  authError.textContent = "";
}

function setButtonBusy(btn, busy, busyLabel) {
  if (busy) {
    btn.dataset.originalLabel = btn.textContent;
    btn.textContent = busyLabel;
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.originalLabel || btn.textContent;
    btn.disabled = false;
  }
}

function friendlyAuthError(err) {
  const code = err && err.code ? err.code : "";
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/email-already-in-use":
      return "An account already exists with that email — try logging in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a bit and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

const authTabsBox = document.querySelector(".auth-tabs");
const googleBtn = document.getElementById("googleBtn");
const googleLabel = document.getElementById("googleLabel");
const authRefBox = document.getElementById("authRefBox");
const COPY = {
  signup: ["Create your free account", "Start reading in under 30 seconds.", "Sign up with Google"],
  login: ["Welcome back 👋", "Log in to pick up where you left off.", "Log in with Google"],
};

function setMode(mode) {
  authTabs.forEach((t) => {
    const on = t.dataset.tab === mode;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", String(on));
  });
  authTabsBox.dataset.active = mode;
  clearAuthError();
  loginForm.hidden = mode !== "login";
  signupForm.hidden = mode !== "signup";
  authRefBox.hidden = mode !== "signup";
  document.getElementById("authTitle").textContent = COPY[mode][0];
  document.getElementById("authSub").textContent = COPY[mode][1];
  googleLabel.textContent = COPY[mode][2];
  const f = mode === "login" ? loginForm : signupForm;
  f.classList.remove("auth-swap"); void f.offsetWidth; f.classList.add("auth-swap");
}
authTabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.tab)));

googleBtn.addEventListener("click", async () => {
  clearAuthError();
  const refCode = document.getElementById("signupRef").value.trim();
  if (refCode) savePendingRef(refCode);
  googleBtn.disabled = true; googleLabel.textContent = "Opening Google…";
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    if (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment") {
      try { await signInWithRedirect(auth, provider); return; } catch (e2) { err = e2; }
    }
    if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
      console.error("Google sign-in failed:", err);
      showAuthError(err.code === "auth/unauthorized-domain"
        ? "This website's domain isn't authorised for Google sign-in yet (Firebase → Authentication → Settings → Authorized domains)."
        : err.code === "auth/account-exists-with-different-credential"
          ? "An account with this email already exists — log in with your email and password instead."
          : friendlyAuthError(err));
    }
  } finally {
    googleBtn.disabled = false; googleLabel.textContent = COPY[authTabsBox.dataset.active][2];
  }
});
getRedirectResult(auth).catch((err) => { if (err && err.code) showAuthError(friendlyAuthError(err)); });

document.querySelectorAll(".pw-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.setAttribute("aria-pressed", String(isHidden));
    btn.textContent = isHidden ? "🙈" : "👁";
  });
});

captureRefFromUrl();
setMode("signup");
if (getPendingRef()) {
  document.getElementById("signupRef").value = getPendingRef();
  authRefBox.open = true;
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAuthError();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const refCode = document.getElementById("signupRef").value.trim();
  if (refCode) savePendingRef(refCode);  
  setButtonBusy(signupSubmitBtn, true, "Creating account…");
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
  } catch (err) {
    console.error("Signup failed:", err);
    showAuthError(friendlyAuthError(err));
  } finally {
    setButtonBusy(signupSubmitBtn, false);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAuthError();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  setButtonBusy(loginSubmitBtn, true, "Logging in…");
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("Login failed:", err);
    showAuthError(friendlyAuthError(err));
  } finally {
    setButtonBusy(loginSubmitBtn, false);
  }
});

forgotPasswordBtn.addEventListener("click", async () => {
  clearAuthError();
  const email = document.getElementById("loginEmail").value.trim();
  if (!email) {
    showAuthError("Type your email above first, then tap “Forgot password?” again.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    authError.hidden = false;
    authError.classList.add("auth-error--info");
    authError.textContent = `Password reset link sent to ${email}.`;
  } catch (err) {
    console.error("Password reset failed:", err);
    authError.classList.remove("auth-error--info");
    showAuthError(friendlyAuthError(err));
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    window.location.reload();
  }
});

onAuthStateChanged(auth, (user) => {
  authCheckSplash.hidden = true;

  if (user) {
    authScreen.hidden = true;
    appShell.hidden = false; 
    if (userNameTag) {
      userNameTag.textContent = user.displayName ? `Hi, ${user.displayName.split(" ")[0]}` : user.email;
    }
    window.dispatchEvent(new CustomEvent("neelaxmi:authenticated", { detail: { user } }));
    refreshStatus(user);
    syncReferral(user);  
  } else {
    appShell.hidden = true;
    authScreen.hidden = false;
    refreshStatus(null);
  }
});

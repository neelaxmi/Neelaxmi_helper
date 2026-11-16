import admin from "firebase-admin";
import crypto from "node:crypto";

const PROJECT = "quiznew-30700";
const BASE = "https://neelaxmi-mcp.vercel.app";
const ISSUER = BASE;
const RESOURCE = BASE + "/api/mcp";
const FIREBASE_WEB_API_KEY = "AIzaSyAOJmK4igVb_P8cV6jLfZhFPGFmAZfVvRE";
const DEFAULT_ADMINS = ["mN6M8SImQzXE8qEtJF2MJ2XV8SG3", "Fjoi3zeE3bNOO1eQDmIolZzjIs03", "soQBFdrszGg3UTvAQSgys0TIUTz2"];
const SCOPE = "mcp:tools";
const CODE_TTL_MS = 5 * 60 * 1000;
const ACCESS_TTL_SEC = 15 * 60;
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;
let firebaseApp;
let clientMetadataCache = { value: null, until: 0 };

const jsonEnv = name => {
  try { return JSON.parse(process.env[name] || ""); }
  catch { throw new Error(name + " is missing or invalid JSON."); }
};
function app() {
  if (!firebaseApp) {
    const sa = jsonEnv("FIREBASE_SERVICE_ACCOUNT_JSON");
    if (sa.project_id !== PROJECT) throw new Error("Firebase service account must belong to " + PROJECT);
    firebaseApp = admin.initializeApp({ credential: admin.credential.cert(sa), projectId: PROJECT }, "neelaxmi-mcp-oauth");
  }
  return firebaseApp;
}
const db = () => admin.firestore(app());
const adminUids = () => (process.env.QUIZ_BANK_ADMIN_UIDS || DEFAULT_ADMINS.join(",")).split(",").map(v => v.trim()).filter(Boolean);
const b64u = value => Buffer.from(value).toString("base64url");
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const random = (bytes = 32) => crypto.randomBytes(bytes).toString("base64url");
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);
function signingInfo() {
  const sa = jsonEnv("FIREBASE_SERVICE_ACCOUNT_JSON");
  if (sa.project_id !== PROJECT || !sa.private_key) throw new Error("Invalid Firebase service account.");
  const privateKey = sa.private_key;
  const publicKey = crypto.createPublicKey(privateKey);
  const jwk = publicKey.export({ format: "jwk" });
  const kid = sha256(publicKey.export({ type: "spki", format: "der" })).slice(0, 24);
  return { privateKey, publicKey, jwk: { ...jwk, kid, use: "sig", alg: "RS256", key_ops: ["verify"] }, kid };
}
function signAccessToken({ uid, email, scope = SCOPE, resource = RESOURCE }) {
  const { privateKey, kid } = signingInfo();
  const now = Math.floor(Date.now() / 1000);
  const header = b64u(JSON.stringify({ alg: "RS256", typ: "at+jwt", kid }));
  const payload = b64u(JSON.stringify({ iss: ISSUER, sub: uid, uid, email: email || null, aud: resource, iat: now, exp: now + ACCESS_TTL_SEC, jti: random(18), scope }));
  const input = header + "." + payload;
  return input + "." + crypto.sign("RSA-SHA256", Buffer.from(input), privateKey).toString("base64url");
}
function verifyAccessToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw new Error("Invalid access token.");
  const header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  const { publicKey, kid } = signingInfo();
  if (header.alg !== "RS256" || header.kid !== kid || header.typ !== "at+jwt") throw new Error("Invalid token header.");
  if (!crypto.verify("RSA-SHA256", Buffer.from(parts[0] + "." + parts[1]), publicKey, Buffer.from(parts[2], "base64url"))) throw new Error("Invalid token signature.");
  const now = Math.floor(Date.now() / 1000);
  if (payload.iss !== ISSUER || payload.aud !== RESOURCE || !payload.sub || !payload.exp || payload.exp <= now || payload.iat > now + 60) throw new Error("Expired or incorrectly scoped token.");
  if (!adminUids().includes(payload.sub)) throw new Error("Firebase user is not an approved Question Bank admin.");
  if (!String(payload.scope || "").split(/\s+/).includes(SCOPE)) throw new Error("Insufficient scope.");
  return { uid: payload.sub, email: payload.email || null };
}
async function getClaudeClient(clientId) {
  if (clientMetadataCache.value && clientMetadataCache.until > Date.now() && clientMetadataCache.value.client_id === clientId) return clientMetadataCache.value;
  let url;
  try { url = new URL(clientId); } catch { throw new Error("Invalid OAuth client_id."); }
  if (url.protocol !== "https:" || url.hostname !== "claude.ai" || url.username || url.password || url.port || url.search || url.hash || !url.pathname.startsWith("/oauth/")) throw new Error("Only Claude's published HTTPS client identity is accepted.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  let response;
  try { response = await fetch(url.href, { method: "GET", redirect: "error", signal: controller.signal, headers: { Accept: "application/json" } }); }
  catch { throw new Error("Could not verify Claude's published client identity. Please retry."); }
  finally { clearTimeout(timer); }
  if (!response.ok) throw new Error("Claude client metadata could not be verified (HTTP " + response.status + ").");
  if (!(response.headers.get("content-type") || "").toLowerCase().includes("application/json")) throw new Error("Claude client metadata was not JSON.");
  const raw = await response.text();
  if (raw.length > 16384) throw new Error("Claude client metadata is too large.");
  let metadata;
  try { metadata = JSON.parse(raw); } catch { throw new Error("Invalid Claude client metadata."); }
  if (metadata.client_id !== clientId || !Array.isArray(metadata.redirect_uris) || !metadata.redirect_uris.length) throw new Error("Claude client metadata does not match its client_id.");
  if (metadata.token_endpoint_auth_method && metadata.token_endpoint_auth_method !== "none") throw new Error("Only public OAuth clients are supported.");
  if (metadata.response_types && !metadata.response_types.includes("code")) throw new Error("Unsupported OAuth response type.");
  if (metadata.grant_types && !metadata.grant_types.includes("authorization_code")) throw new Error("Unsupported OAuth grant type.");
  const allowed = ["https://claude.ai/api/mcp/auth_callback", "https://claude.com/api/mcp/auth_callback"];
  if (metadata.redirect_uris.some(uri => !allowed.includes(uri))) throw new Error("Claude metadata contains an unsupported redirect URI.");
  clientMetadataCache = { value: metadata, until: Date.now() + 3600000 };
  return metadata;
}
async function validateAuthorizeParams(p) {
  const clientId = String(p.client_id || ""), redirectUri = String(p.redirect_uri || "");
  const state = String(p.state || ""), challenge = String(p.code_challenge || "");
  if (p.response_type !== "code" || p.code_challenge_method !== "S256") throw new Error("OAuth authorization code with PKCE S256 is required.");
  if (!/^[A-Za-z0-9_-]{43,128}$/.test(challenge)) throw new Error("Invalid PKCE code challenge.");
  if (!state || state.length > 512) throw new Error("OAuth state is required.");
  const metadata = await getClaudeClient(clientId);
  if (!metadata.redirect_uris.includes(redirectUri)) throw new Error("OAuth redirect_uri does not match Claude's published metadata.");
  const resource = String(p.resource || RESOURCE);
  if (resource !== RESOURCE) throw new Error("Invalid OAuth resource audience.");
  return { clientId, redirectUri, state, challenge, resource, scope: SCOPE };
}
function loginPage(params, error = "") {
  const hidden = Object.entries(params).map(([k,v]) => '<input type="hidden" name="' + esc(k) + '" value="' + esc(v) + '">').join("");
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NEELAXMI MCP Login</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f5f9;font:16px system-ui;color:#172033}.card{width:min(92vw,420px);background:white;padding:30px;border-radius:18px;box-shadow:0 12px 40px #17203318}h1{margin:0 0 8px;font-size:25px}.muted{color:#667085;font-size:14px;line-height:1.5}label{display:block;margin:18px 0 7px;font-size:14px;font-weight:600}input{width:100%;padding:13px;border:1px solid #ccd2dc;border-radius:9px;font:inherit}button{width:100%;margin-top:22px;padding:13px;border:0;border-radius:9px;background:#263c83;color:white;font-weight:700;font-size:16px}.error{color:#b42318;background:#fff1f0;padding:10px;border-radius:8px;font-size:14px}</style></head><body><main class="card"><h1>NEELAXMI MCP</h1><p class="muted">Sign in with your approved NEELAXMI admin account to connect Claude securely.</p>' + (error ? '<p class="error">' + esc(error) + '</p>' : '') + '<form method="post" action="/api/oauth/login">' + hidden + '<label for="email">Admin email</label><input id="email" name="email" type="email" autocomplete="username" required><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Sign in and authorize Claude</button></form><p class="muted">Your password is verified by Firebase Authentication. NEELAXMI MCP does not store it.</p></main></body></html>';
}
function paramsFrom(req) {
  const p = req.method === "POST" && req.body && typeof req.body === "object" ? req.body : req.query || {};
  const out = {};
  for (const [k,v] of Object.entries(p)) if (typeof v === "string" || typeof v === "number") out[k] = String(v);
  return out;
}
function redirect(res, uri, values) {
  const target = new URL(uri);
  for (const [k,v] of Object.entries(values)) target.searchParams.set(k, v);
  res.statusCode = 302; res.setHeader("Location", target.toString()); return res.end();
}
function sendError(res, status, message) { return res.status(status).json({ error: "invalid_request", error_description: message }); }
async function handleAuthorize(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  let p;
  try { p = await validateAuthorizeParams(paramsFrom(req)); }
  catch (e) { return res.status(400).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage({}, e.message)); }
  return res.status(200).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage({
    client_id: p.clientId, redirect_uri: p.redirectUri, state: p.state, code_challenge: p.challenge,
    code_challenge_method: "S256", response_type: "code", resource: p.resource, scope: p.scope
  }));
}
async function handleLogin(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const p = paramsFrom(req), email = String(p.email || "").trim().toLowerCase(), password = String(p.password || "");
  const oauth = { ...p }; delete oauth.email; delete oauth.password;
  let authParams;
  try { authParams = await validateAuthorizeParams(oauth); }
  catch (e) { return res.status(400).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage(oauth, e.message)); }
  if (!email || !password || password.length > 4096) return res.status(400).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage(oauth, "Enter your email and password."));
  let idToken;
  try {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FIREBASE_WEB_API_KEY, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const data = await response.json();
    if (!response.ok || !data.idToken) throw new Error(data.error?.message || "Firebase sign-in failed.");
    idToken = data.idToken;
  } catch (e) {
    const message = /INVALID_PASSWORD|EMAIL_NOT_FOUND|INVALID_LOGIN_CREDENTIALS/.test(e.message) ? "Email or password is incorrect." : "Could not sign in. Please check your details and try again.";
    return res.status(401).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage(oauth, message));
  }
  let decoded;
  try { decoded = await admin.auth(app()).verifyIdToken(idToken, true); }
  catch { return res.status(401).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage(oauth, "Firebase account verification failed. Please try again.")); }
  if (decoded.firebase?.sign_in_provider === "anonymous" || !adminUids().includes(decoded.uid)) return res.status(403).setHeader("Content-Type", "text/html; charset=utf-8").send(loginPage(oauth, "This Firebase account is not an approved NEELAXMI admin."));
  const code = random(32);
  await db().collection("mcp_oauth_codes").doc(sha256(code)).set({
    uid: decoded.uid, email: decoded.email || email, clientId: authParams.clientId, redirectUri: authParams.redirectUri,
    challenge: authParams.challenge, resource: authParams.resource, scope: authParams.scope,
    expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + CODE_TTL_MS), createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  return redirect(res, authParams.redirectUri, { code, state: authParams.state, iss: ISSUER });
}
async function issueTokenPair(res, result) {
  if (!result || !adminUids().includes(result.uid)) return sendError(res, 400, "Admin access has been revoked.");
  const refreshToken = random(48);
  await db().collection("mcp_oauth_refresh_tokens").doc(sha256(refreshToken)).set({
    ...result, expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + REFRESH_TTL_MS),
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  return res.status(200).json({ access_token: signAccessToken(result), token_type: "Bearer", expires_in: ACCESS_TTL_SEC, refresh_token: refreshToken, scope: result.scope });
}
async function handleToken(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const p = paramsFrom(req);
  if (p.grant_type === "authorization_code") {
    const code = String(p.code || ""), verifier = String(p.code_verifier || "");
    if (!code || !/^[A-Za-z0-9._~-]{43,128}$/.test(verifier)) return sendError(res, 400, "Invalid authorization code or PKCE verifier.");
    let result;
    const ref = db().collection("mcp_oauth_codes").doc(sha256(code));
    await db().runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("Authorization code is invalid or already used.");
      const data = snap.data(); tx.delete(ref);
      const challenge = b64u(crypto.createHash("sha256").update(verifier).digest());
      if (data.expiresAt.toMillis() < Date.now() || data.clientId !== p.client_id || data.redirectUri !== p.redirect_uri || data.resource !== (p.resource || RESOURCE) || challenge !== data.challenge) throw new Error("Authorization code validation failed.");
      result = { uid: data.uid, email: data.email, clientId: data.clientId, resource: data.resource, scope: data.scope };
    });
    return issueTokenPair(res, result);
  }
  if (p.grant_type === "refresh_token") {
    const oldToken = String(p.refresh_token || "");
    if (!oldToken) return sendError(res, 400, "Missing refresh token.");
    const ref = db().collection("mcp_oauth_refresh_tokens").doc(sha256(oldToken));
    let result; const nextToken = random(48);
    await db().runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("Refresh token is invalid or revoked.");
      const data = snap.data();
      if (data.expiresAt.toMillis() < Date.now() || data.clientId !== p.client_id || data.resource !== (p.resource || RESOURCE)) throw new Error("Refresh token expired or client mismatch.");
      tx.delete(ref);
      result = { uid: data.uid, email: data.email, clientId: data.clientId, resource: data.resource, scope: data.scope };
      tx.set(db().collection("mcp_oauth_refresh_tokens").doc(sha256(nextToken)), { ...result, expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + REFRESH_TTL_MS), createdAt: admin.firestore.FieldValue.serverTimestamp() });
    });
    return res.status(200).json({ access_token: signAccessToken(result), token_type: "Bearer", expires_in: ACCESS_TTL_SEC, refresh_token: nextToken, scope: result.scope });
  }
  return sendError(res, 400, "Unsupported grant_type.");
}
async function handleRevoke(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const token = String(paramsFrom(req).token || "");
  if (token) await db().collection("mcp_oauth_refresh_tokens").doc(sha256(token)).delete().catch(() => {});
  return res.status(200).end();
}
export default async function handler(req, res) {
  const action = String(req.query?.action || "");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  try {
    if (action === "metadata" && req.method === "GET") return res.status(200).json({
      issuer: ISSUER, authorization_endpoint: BASE + "/api/oauth/authorize", token_endpoint: BASE + "/api/oauth/token",
      revocation_endpoint: BASE + "/api/oauth/revoke", jwks_uri: BASE + "/api/oauth/jwks",
      response_types_supported: ["code"], grant_types_supported: ["authorization_code", "refresh_token"],
      code_challenge_methods_supported: ["S256"], token_endpoint_auth_methods_supported: ["none"],
      scopes_supported: [SCOPE], client_id_metadata_document_supported: true,
      authorization_response_iss_parameter_supported: true
    });
    if (action === "resource-metadata" && req.method === "GET") return res.status(200).json({
      resource: RESOURCE, authorization_servers: [ISSUER], scopes_supported: [SCOPE], bearer_methods_supported: ["header"], resource_name: "NEELAXMI MCP"
    });
    if (action === "jwks" && req.method === "GET") return res.status(200).json({ keys: [signingInfo().jwk] });
    if (action === "authorize") return await handleAuthorize(req, res);
    if (action === "login") return await handleLogin(req, res);
    if (action === "token") return await handleToken(req, res);
    if (action === "revoke") return await handleRevoke(req, res);
    return res.status(404).json({ error: "Not found" });
  } catch (e) {
    console.error("[NEELAXMI OAuth]", e?.message || e);
    return sendError(res, 400, e?.message || "OAuth request failed.");
  }
}

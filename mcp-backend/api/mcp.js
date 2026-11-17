import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import admin from "firebase-admin";
import { google } from "googleapis";
import pdf from "pdf-parse";
import crypto from "node:crypto";
import { unzipSync, strFromU8 } from "fflate";
import { registerAdminTools } from "./admin-tools.js";

export const config = { api: { bodyParser: { sizeLimit: "16mb" } } };

const PROJECT = "quiznew-30700";
const DEFAULT_ADMINS = ["mN6M8SImQzXE8qEtJF2MJ2XV8SG3","Fjoi3zeE3bNOO1eQDmIolZzjIs03","soQBFdrszGg3UTvAQSgys0TIUTz2"];
let firebaseApp;
let galleryApp;
const jsonEnv = name => {
  try { return JSON.parse(process.env[name] || ""); }
  catch { throw new Error(name + " is missing or invalid JSON."); }
};
function gallery() {
  if (!galleryApp) {
    const sa = jsonEnv("GALLERY_FIREBASE_SERVICE_ACCOUNT_JSON");
    if (sa.project_id !== "gallery-83144") throw new Error("Gallery Firebase service account must belong to gallery-83144.");
    galleryApp = admin.initializeApp({ credential: admin.credential.cert(sa), projectId: "gallery-83144" }, "neelaxmi-gallery-admin");
  }
  return { db: admin.firestore(galleryApp), auth: admin.auth(galleryApp) };
}
function db() {
  if (!firebaseApp) {
    const sa = jsonEnv("FIREBASE_SERVICE_ACCOUNT_JSON");
    if (sa.project_id !== PROJECT) throw new Error("Firebase service account must belong to " + PROJECT);
    firebaseApp = admin.initializeApp({ credential: admin.credential.cert(sa), projectId: PROJECT }, "neelaxmi-mcp");
  }
  return admin.firestore(firebaseApp);
}
const OAUTH_ISSUER = "https://neelaxmi-mcp.vercel.app";
const OAUTH_RESOURCE = OAUTH_ISSUER + "/api/mcp";
const RESOURCE_METADATA = OAUTH_ISSUER + "/.well-known/oauth-protected-resource/api/mcp";
const REQUIRED_SCOPE = "mcp:tools";
async function verifyOAuthAccessToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw new Error("Invalid access token.");
  let header, payload;
  try {
    header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch { throw new Error("Malformed access token."); }
  const sa = jsonEnv("FIREBASE_SERVICE_ACCOUNT_JSON");
  if (sa.project_id !== PROJECT || !sa.private_key) throw new Error("Firebase service account is invalid.");
  const publicKey = crypto.createPublicKey(sa.private_key);
  const kid = crypto.createHash("sha256").update(publicKey.export({type:"spki",format:"der"})).digest("hex").slice(0,24);
  if (header.alg !== "RS256" || header.typ !== "at+jwt" || header.kid !== kid) throw new Error("Invalid access token header.");
  const valid = crypto.verify("RSA-SHA256", Buffer.from(parts[0]+"."+parts[1]), publicKey, Buffer.from(parts[2],"base64url"));
  if (!valid) throw new Error("Invalid access token signature.");
  const now = Math.floor(Date.now()/1000);
  if (payload.iss !== OAUTH_ISSUER || payload.aud !== OAUTH_RESOURCE || !payload.sub || payload.uid !== payload.sub ||
      !Number.isInteger(payload.exp) || payload.exp <= now || !Number.isInteger(payload.iat) || payload.iat > now+60 ||
      payload.exp-payload.iat > 15*60+5) throw new Error("Expired or incorrectly scoped access token.");
  const allow = (process.env.QUIZ_BANK_ADMIN_UIDS || DEFAULT_ADMINS.join(",")).split(",").map(x=>x.trim()).filter(Boolean);
  if (!allow.includes(payload.sub)) throw new Error("Firebase user is not an approved Question Bank admin.");
  if (!String(payload.scope || "").split(/\s+/).includes(REQUIRED_SCOPE)) throw new Error("Insufficient scope.");
  return resolveAdminIdentity({ uid:payload.sub, email:payload.email || null });
}
async function resolveAdminIdentity(identity) {
  const email = String(identity.email || "").trim().toLowerCase();
  if (!email) throw new Error("OAuth account has no verified email; cannot map Gallery Admin identity.");
  const { db: galleryDb, auth: galleryAuth } = gallery();
  let galleryUser;
  try { galleryUser = await galleryAuth.getUserByEmail(email); }
  catch { throw new Error("This email does not have an account in Gallery Firebase (gallery-83144)."); }
  const superEmails = (process.env.GALLERY_SUPER_ADMIN_EMAILS || "sak06gupta@gmail.com").split(",").map(v => v.trim().toLowerCase()).filter(Boolean);
  const superUids = (process.env.GALLERY_SUPER_ADMIN_UIDS || "").split(",").map(v => v.trim()).filter(Boolean);
  const subUids = (process.env.GALLERY_SUB_ADMIN_UIDS || "Md455pzr0VfEoGkmiVyDhjuDH8m2,j2Br2h6fpGbQgq71HlqSlWVVcaF2,9FRgUCZIivduw1jEjenKqLDj3B72").split(",").map(v => v.trim()).filter(Boolean);
  let galleryRole = "none";
  if (superEmails.includes(email) || superUids.includes(galleryUser.uid)) galleryRole = "super_admin";
  else if (subUids.includes(galleryUser.uid)) galleryRole = "sub_admin";
  if (galleryRole === "none") throw new Error("This account is not an approved Gallery Admin.");
  return { ...identity, email, galleryUid: galleryUser.uid, galleryRole, projects: ["quiznew-30700","gallery-83144"] };
}
async function verifyUser(req) {
  const token = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || ""))?.[1];
  if (!token) throw new Error("Missing bearer access token.");
  if (token.split(".").length === 3) {
    let tokenIssuer = "";
    try { tokenIssuer = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8")).iss || ""; } catch {}
    if (tokenIssuer === OAUTH_ISSUER) return await verifyOAuthAccessToken(token);
  }
  if (!process.env.MCP_BEARER_SECRET || req.headers["x-mcp-secret"] !== process.env.MCP_BEARER_SECRET) throw new Error("Invalid legacy MCP host secret.");
  const decoded = await admin.auth(firebaseApp || (db(), firebaseApp)).verifyIdToken(token, true);
  const allow = (process.env.QUIZ_BANK_ADMIN_UIDS || DEFAULT_ADMINS.join(",")).split(",").map(x => x.trim());
  if (decoded.firebase?.sign_in_provider === "anonymous" || !allow.includes(decoded.uid)) throw new Error("Firebase user is not an approved Question Bank admin.");
  return resolveAdminIdentity({ uid: decoded.uid, email: decoded.email || null });
}
function drive() {
  const sa = jsonEnv("GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON");
  const auth = new google.auth.JWT({ email: sa.client_email, key: sa.private_key, scopes: ["https://www.googleapis.com/auth/drive.readonly"] });
  return google.drive({ version: "v3", auth });
}
async function getPdf(fileId) {
  if (!/^[A-Za-z0-9_-]{10,}$/.test(fileId)) throw new Error("Invalid Google Drive file ID.");
  const d = drive();
  const meta = await d.files.get({ fileId, fields: "id,name,mimeType,size" });
  if (meta.data.mimeType !== "application/pdf") throw new Error("Selected Drive file is not a PDF.");
  if (Number(meta.data.size || 0) > 25 * 1024 * 1024) throw new Error("PDF is larger than 25 MB.");
  const response = await d.files.get({ fileId, alt: "media" }, { responseType: "arraybuffer" });
  const parsed = await pdf(Buffer.from(response.data));
  const content = String(parsed.text || "").trim();
  if (!content) throw new Error("No selectable text found. Scanned PDFs need OCR first.");
  return { fileName: meta.data.name, pages: parsed.numpages, text: content.slice(0, 110000) };
}
function validate(q, i=0) {
  const question = String(q?.question || "").trim(), options = {};
  if (!question) throw new Error("Question " + (i+1) + " has no text.");
  for (const k of ["A","B","C","D"]) if (q.options?.[k]) options[k] = String(q.options[k]).trim();
  const answer = String(q.answer || "").toUpperCase();
  if (Object.keys(options).length < 2 || !options[answer]) throw new Error("Question " + (i+1) + " has invalid A-D options/answer.");
  const out = { question, options, answer };
  for (const k of ["subject","chapter","class","stream","examLevel","topic","questionLevel","tag","explanation","imageUrl"]) if (q[k] != null && String(q[k]).trim()) out[k] = String(q[k]).trim();
  if (typeof q.isPYQ === "boolean") out.isPYQ = q.isPYQ;
  if (q.questionYear != null && Number.isFinite(Number(q.questionYear))) out.questionYear = Number(q.questionYear);
  return out;
}
const result = value => ({ content:[{type:"text",text:JSON.stringify(value,null,2)}] });

async function uploadImageToGetPronto({ filename, mimeType, imageBase64 }) {
  const safeMime = String(mimeType || "").toLowerCase().split(";")[0].trim();
  const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
  if (!allowed.has(safeMime)) throw new Error("Unsupported image type. Use JPEG, PNG, WebP, or GIF.");
  const cleanName = String(filename || "question-image").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "question-image";
  const encoded = String(imageBase64 || "").replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "").replace(/\s/g, "");
  if (!encoded || encoded.length > 14000000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
    throw new Error("Image data must be valid base64 and no larger than 10 MB.");
  }
  const bytes = Buffer.from(encoded, "base64");
  if (!bytes.length || bytes.length > 10 * 1024 * 1024) throw new Error("Image must be no larger than 10 MB for MCP upload.");
  const signatureOk =
    (safeMime === "image/png" && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ||
    (safeMime === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) ||
    (safeMime === "image/gif" && ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"))) ||
    (safeMime === "image/webp" && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP");
  if (!signatureOk) throw new Error("Image bytes do not match the declared image type.");

  const keyDoc = await db().collection("question_bank_meta").doc("pronto_keys").get();
  const keys = keyDoc.exists && Array.isArray(keyDoc.data().keys) ? keyDoc.data().keys : [];
  const usableKeys = keys.map(v => String(v || "").trim()).filter(v => v.startsWith("pronto_sk_"));
  if (!usableKeys.length) throw new Error("No Get Pronto secret keys (pronto_sk_) are configured in quiznew-30700/question_bank_meta/pronto_keys. Add a secret key to the Firebase pronto_keys document.");

  const customFilename = Date.now() + "-" + cleanName;
  let lastError;
  for (let i = 0; i < usableKeys.length; i++) {
    const key = usableKeys[i];
    let pendingUploadId = null;
    try {
      const presignResponse = await fetch("https://api.getpronto.io/v1/upload/presign", {
        method: "POST",
        headers: { Authorization: "ApiKey " + key, Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ filename: cleanName, mimetype: safeMime, size: bytes.length, customFilename }),
        signal: AbortSignal.timeout(30000)
      });
      const presignData = await presignResponse.json().catch(() => ({}));
      if (!presignResponse.ok) {
        const detail = presignData?.error?.message || presignData?.message || "HTTP " + presignResponse.status;
        throw new Error("Get Pronto presign failed: " + String(detail).slice(0, 200));
      }
      const p = presignData.data || presignData.result || presignData;
      const uploadUrl = p.uploadUrl || p.uploadURL || p.url;
      pendingUploadId = p.pendingUploadId || p.pending_upload_id || p.id;
      if (!uploadUrl || !/^https:\/\//i.test(uploadUrl) || !pendingUploadId) throw new Error("Get Pronto returned an incomplete upload reservation.");

      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": safeMime },
        body: bytes,
        signal: AbortSignal.timeout(60000)
      });
      if (!put.ok) throw new Error("Get Pronto storage upload failed with HTTP " + put.status);

      const confirmResponse = await fetch("https://api.getpronto.io/v1/upload/confirm", {
        method: "POST",
        headers: { Authorization: "ApiKey " + key, Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ pendingUploadId }),
        signal: AbortSignal.timeout(30000)
      });
      const confirmData = await confirmResponse.json().catch(() => ({}));
      if (!confirmResponse.ok) {
        const detail = confirmData?.error?.message || confirmData?.message || "HTTP " + confirmResponse.status;
        throw new Error("Get Pronto confirmation failed: " + String(detail).slice(0, 200));
      }
      const item = confirmData.file || confirmData.data?.file || confirmData.data || confirmData;
      const imageUrl = item.rawUrl || item.secureUrl || item.url || item.imageUrl;
      if (!imageUrl || !/^https:\/\//i.test(imageUrl)) throw new Error("Get Pronto confirmed the upload but returned no HTTPS image URL.");
      return { imageUrl, filename: cleanName, mimeType: safeMime, size: bytes.length, storage: "getpronto" };
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error("All configured Get Pronto upload keys failed: " + (lastError?.message || "unknown error"));
}


function normalizeZipPath(value) {
  return String(value || "").replace(/\\\\/g, "/").replace(/^\\.\\//, "").replace(/\\/+/g, "/").toLowerCase();
}
function zipImageMime(name) {
  const ext = String(name).split(".").pop().toLowerCase();
  return ({ jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", webp:"image/webp", gif:"image/gif" })[ext] || "";
}
function extractQuestionArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const key of ["questions","questionBank","question_bank","items","data","results","records"]) {
      if (Array.isArray(data[key])) return data[key];
    }
    if (data.question || data.questionText || data.text) return [data];
  }
  throw new Error("Each JSON must be an array or contain a questions/items/data array.");
}
function normalizeZipQuestion(raw, index) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Question " + (index + 1) + " is not an object.");
  const first = (...keys) => { for (const key of keys) if (raw[key] !== undefined && raw[key] !== null && raw[key] !== "") return raw[key]; };
  const clean = value => value == null ? "" : String(value).replace(/[\\u200B-\\u200D\\uFEFF]/g, "").replace(/\\s+/g, " ").trim();
  const question = clean(first("question","questionText","question_text","text","prompt","q"));
  if (!question) throw new Error("Question " + (index + 1) + " has no question text.");
  const inputOptions = first("options","choices","optionList","answers");
  const options = {};
  const strip = value => clean(value && typeof value === "object" ? (value.text || value.value || value.option || "") : value).replace(/^\\(?\\s*[A-Da-d]\\s*[)\\.:-]\\s+/, "");
  if (Array.isArray(inputOptions)) inputOptions.forEach((v,i)=>{ if (i<4 && strip(v)) options["ABCD"[i]]=strip(v); });
  else if (inputOptions && typeof inputOptions === "object") Object.entries(inputOptions).forEach(([k,v],i)=>{
    const m=clean(k).match(/^\\(?([A-Da-d])\\)?$/)||clean(k).match(/^option\\s*([A-Da-d1-4])$/i);
    let label=m?m[1].toUpperCase():"ABCD"[i];
    if (/^[1-4]$/.test(label)) label="ABCD"[Number(label)-1];
    if ("ABCD".includes(label) && strip(v) && !options[label]) options[label]=strip(v);
  });
  if (Object.keys(options).length < 2) throw new Error("Question " + (index + 1) + " needs at least two options.");
  const answerRaw=first("answer","correctAnswer","correct_answer","correctOption","correct_option","correct","key");
  let answer="";
  if (typeof answerRaw === "number" && Number.isInteger(answerRaw)) answer="ABCD"[answerRaw] || "";
  else {
    const ans=clean(answerRaw);
    let m=ans.match(/^\\(?\\s*(?:option\\s*)?([A-Da-d])\\s*\\)?\\.?$/i);
    if (m && options[m[1].toUpperCase()]) answer=m[1].toUpperCase();
    else if (/^[1-4]$/.test(ans) && options["ABCD"[Number(ans)-1]]) answer="ABCD"[Number(ans)-1];
    else answer=Object.keys(options).find(k=>options[k].toLowerCase()===ans.toLowerCase()) || "";
  }
  if (!answer || !options[answer]) throw new Error("Question " + (index + 1) + " has an invalid or missing answer.");
  const pyq=first("isPYQ","isPyq","pyq","questionsPyq","previousYearQuestion","previous_year_question");
  const year=Number(first("questionYear","question_year","year","pyqYear","pyq_year"));
  const level=clean(first("questionLevel","question_level","difficulty","level"));
  const imageRef=clean(first("imageUrl","imageURL","image_url","imageFile","image_file","imageName","image_name","imagePath","image_path","image"));
  return {
    question, options, answer,
    ...(first("chapter","chapterName","chapter_name") != null ? {chapter:clean(first("chapter","chapterName","chapter_name"))} : {}),
    ...(first("subject","subjectName","subject_name") != null ? {subject:clean(first("subject","subjectName","subject_name"))} : {}),
    ...(first("class","className","class_name","grade","standard") != null ? {class:clean(first("class","className","class_name","grade","standard"))} : {}),
    ...(first("stream","academicStream","academic_stream") != null ? {stream:clean(first("stream","academicStream","academic_stream"))} : {}),
    ...(first("examLevel","exam_level","exam","examName","exam_name") != null ? {examLevel:clean(first("examLevel","exam_level","exam","examName","exam_name"))} : {}),
    ...(first("tag","collection","series") != null ? {tag:clean(first("tag","collection","series")).slice(0,60)} : {}),
    ...(first("topic","subtopic","sub_topic") != null ? {topic:clean(first("topic","subtopic","sub_topic"))} : {}),
    ...(level ? {questionLevel:level} : {}),
    ...(Number.isInteger(year) && year>=1980 && year<=2100 ? {questionYear:year} : {}),
    ...(pyq !== undefined ? {isPYQ:typeof pyq==="boolean"?pyq:/^(1|true|yes|y|pyq)$/i.test(String(pyq).trim())} : {}),
    ...(first("explanation","solution","detailedSolution","detailed_solution","answerExplanation") != null ? {explanation:clean(first("explanation","solution","detailedSolution","detailed_solution","answerExplanation"))} : {}),
    ...(imageRef ? {imageRef} : {}),
    ...(first("id","questionId","question_id","uid") != null ? {originalId:clean(first("id","questionId","question_id","uid"))} : {})
  };
}
async function processQuestionZip({ zipBase64 }) {
  const encoded=String(zipBase64||"").replace(/\\s/g,"");
  if (!encoded || encoded.length > 12500000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) throw new Error("ZIP must be valid base64 and no larger than about 9 MB.");
  const zipBytes=Buffer.from(encoded,"base64");
  if (zipBytes.length < 4 || zipBytes.length > 9*1024*1024 || zipBytes[0]!==0x50 || zipBytes[1]!==0x4b) throw new Error("Invalid ZIP or compressed ZIP exceeds 9 MB.");
  const entries=unzipSync(zipBytes);
  const names=Object.keys(entries).filter(name=>!name.endsWith("/") && !name.split("/").pop().startsWith("__MACOSX"));
  if (names.length > 600) throw new Error("ZIP contains too many files (maximum 600).");
  let totalBytes=0;
  for (const name of names) {
    totalBytes += entries[name].length;
    if (totalBytes > 50*1024*1024) throw new Error("Expanded ZIP exceeds 50 MB safety limit.");
  }
  const imageEntries=new Map(), basenameCounts=new Map(), jsonNames=names.filter(n=>n.toLowerCase().endsWith(".json")).sort();
  for (const name of names) {
    if (!zipImageMime(name)) continue;
    const key=normalizeZipPath(name);
    imageEntries.set(key,{name,bytes:Buffer.from(entries[name]),mimeType:zipImageMime(name)});
    const base=key.split("/").pop();
    basenameCounts.set(base,(basenameCounts.get(base)||0)+1);
  }
  if (!jsonNames.length) throw new Error("ZIP must contain at least one JSON file.");
  if (!imageEntries.size) throw new Error("ZIP contains no supported image files (JPG, PNG, WebP, GIF).");
  const questions=[];
  for (const jsonName of jsonNames) {
    let data;
    try { data=JSON.parse(strFromU8(entries[jsonName])); }
    catch { throw new Error("Invalid JSON file: "+jsonName); }
    const arr=extractQuestionArray(data);
    for (const raw of arr) questions.push({...normalizeZipQuestion(raw,questions.length),_sourceJson:jsonName});
  }
  if (!questions.length) throw new Error("No questions found in ZIP JSON files.");
  const matched=new Map(), missing=[];
  questions.forEach((q,index)=>{
    if (!q.imageRef || /^https:\\/\\//i.test(q.imageRef)) return;
    const ref=normalizeZipPath(q.imageRef);
    let entry=imageEntries.get(ref);
    if (!entry) {
      const base=ref.split("/").pop();
      if (basenameCounts.get(base)===1) entry=[...imageEntries.values()].find(x=>normalizeZipPath(x.name).split("/").pop()===base);
    }
    if (!entry) {
      const id=String(q.originalId||"").toLowerCase();
      const stems=[id,"q"+(index+1),"question"+(index+1),String(index+1)].filter(Boolean);
      entry=[...imageEntries.values()].find(x=>stems.includes(normalizeZipPath(x.name).split("/").pop().replace(/\\.[^.]+$/,"")));
    }
    if (!entry) { missing.push({questionIndex:index+1,imageRef:q.imageRef}); return; }
    matched.set(entry.name,entry);
    q._matchedImageName=entry.name;
  });
  if (!matched.size) throw new Error("No JSON image references matched files in images/. Set imageFile/imageName/imagePath in each question to its relative image path.");
  const uploadedByName=new Map(), failures=[];
  const uploadList=[...matched.values()];
  let cursor=0;
  const workers=Array.from({length:Math.min(3,uploadList.length)},async()=>{
    while(cursor<uploadList.length){
      const entry=uploadList[cursor++];
      try {
        if(entry.bytes.length>10*1024*1024) throw new Error("Image exceeds 10 MB.");
        const response=await uploadImageToGetPronto({filename:entry.name.split("/").pop(),mimeType:entry.mimeType,imageBase64:entry.bytes.toString("base64")});
        uploadedByName.set(entry.name,response.imageUrl);
      } catch(e) { failures.push({filename:entry.name,error:String(e.message||e)}); }
    }
  });
  await Promise.all(workers);
  questions.forEach(q=>{
    if(q._matchedImageName && uploadedByName.has(q._matchedImageName)) q.imageUrl=uploadedByName.get(q._matchedImageName);
    delete q.imageRef; delete q.originalId; delete q._sourceJson; delete q._matchedImageName;
  });
  return {status:failures.length?"partial":"success",questionCount:questions.length,imageFilesFound:imageEntries.size,imagesMatched:matched.size,imagesUploaded:uploadedByName.size,missingImages:missing,uploadFailures:failures,questions};
}

function createServer(user) {
  const s = new McpServer({name:"neelaxmi-mcp",version:"1.0.0"});
  s.registerTool("get_mcp_identity",{description:"Show the verified MCP identity and mapped roles in both Firebase projects.",inputSchema:{}},async()=>result({uid:user.uid,email:user.email,project:PROJECT,galleryUid:user.galleryUid,galleryRole:user.galleryRole,projects:user.projects}));
  registerAdminTools(s, user, { galleryDb: gallery().db, quizDb: db(), admin });


  s.registerTool("process_question_zip_images", {
    description: "Process a ZIP prepared by Claude using NEELAXMI Admin Panel's existing Question Library ZIP format. ZIP must contain one or more JSON files plus images/ files. JSON questions use the existing aliases imageFile, imageName, imagePath, image, or imageUrl to point to a relative image filename such as images/q001.png. MCP reads the ZIP, normalizes questions using the existing Question Bank field conventions, matches referenced images, uploads each unique matched original image to Get Pronto using server-side Firebase pronto_sk_ keys, and returns canonical questions with imageUrl replaced by the returned HTTPS URL. It does NOT save to Firebase; review the returned questions and then use save_questions_to_question_bank with confirm=true. Supports JPG/JPEG, PNG, WebP and GIF. ZIP compressed size max about 9 MB; expanded total max 50 MB; each image max 10 MB. Existing HTTPS imageUrl values are preserved. Claude must create the ZIP from the actual original extracted image files, not image descriptions.",
    inputSchema: { zipBase64: z.string().min(1).max(12500000).describe("Base64-encoded complete ZIP archive containing JSON question files and image files.") }
  }, async ({zipBase64}) => result(await processQuestionZip({zipBase64})));

  s.registerTool("upload_question_image_to_getpronto", {
    description: "Upload the REAL image file extracted from a source PDF (not a textual description, not a recreated drawing, and not a screenshot of the whole page unless that is the only source). Send the extracted image bytes as base64 with the matching MIME type. This tool decodes the base64 and uploads the actual binary image file to NEELAXMI Get Pronto storage using the configured Firebase Get Pronto secret keys (pronto_sk_) on the secure MCP server. Returns the HTTPS imageUrl to attach to that exact question. Preserve original resolution and aspect ratio; do not downscale or recompress unless the file exceeds 10 MB. Supports JPEG, PNG, WebP and GIF up to 10 MB.",
    inputSchema: {
      filename: z.string().min(1).max(160),
      mimeType: z.enum(["image/jpeg","image/png","image/webp","image/gif"]),
      imageBase64: z.string().min(1).max(14000000).describe("Base64-encoded bytes of the actual extracted image file, not a description of the image.")
    }
  }, async ({ filename, mimeType, imageBase64 }) => result(await uploadImageToGetPronto({ filename, mimeType, imageBase64 })));

  s.registerTool("list_drive_pdfs",{description:"List PDF files visible to the configured read-only Google Drive service account.",inputSchema:{query:z.string().optional(),pageSize:z.number().int().min(1).max(100).optional()}},async({query="",pageSize=50})=>{
    const terms=["trashed=false","mimeType='application/pdf'"];
    if(process.env.GOOGLE_DRIVE_FOLDER_ID) terms.push("'"+process.env.GOOGLE_DRIVE_FOLDER_ID+"' in parents");
    if(query) terms.push("name contains '"+query.replace(/'/g,"\\'")+"'");
    const r=await drive().files.list({q:terms.join(" and "),pageSize,orderBy:"modifiedTime desc",fields:"files(id,name,size,modifiedTime,webViewLink)"});
    return result(r.data.files||[]);
  });
  s.registerTool("read_drive_pdf",{description:"Extract selectable text from a Drive PDF. OCR is needed for scanned files.",inputSchema:{fileId:z.string().min(10)}},async({fileId})=>result(await getPdf(fileId)));
  s.registerTool("save_questions_to_question_bank",{description:"Save reviewed canonical questions to quiznew-30700/question_bank. Explicit confirm=true required.",inputSchema:{confirm:z.boolean(),questions:z.array(z.record(z.any())).min(1).max(400),sourceFileId:z.string().optional(),sourceFileName:z.string().optional()}},async({confirm,questions,sourceFileId,sourceFileName})=>{
    if(!confirm) throw new Error("Save cancelled; set confirm=true after reviewing.");
    const clean=questions.map(validate), batch=db().batch(), ids=[];
    clean.forEach((q,i)=>{const ref=db().collection("question_bank").doc();ids.push(ref.id);batch.set(ref,{...q,bankId:ref.id,sourceFile:sourceFileName||sourceFileId||"MCP generated",sourceFileId:sourceFileId||null,sourceIndex:i,aiGenerated:true,generationMethod:"external_mcp_client",createdBy:user.uid,createdAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp(),schemaVersion:2});});
    await batch.commit();
    await db().collection("question_bank_meta").doc("analytics").set({stale:true,invalidatedReason:"mcp_import",updatedAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
    return result({saved:ids.length,ids});
  });
  s.registerTool("sync_chapter_quiz",{description:"Create/update the existing stable chapter quiz in quizzes and mirror it to the admin artifact. Explicit confirm=true required.",inputSchema:{confirm:z.boolean(),subject:z.string().min(1),chapter:z.string().min(1),tag:z.string().optional()}},async({confirm,subject,chapter,tag=""})=>{
    if(!confirm) throw new Error("Sync cancelled; set confirm=true after review.");
    const snap=await db().collection("question_bank").where("chapter","==",chapter).get();
    const qs=snap.docs.filter(d=>String(d.data().subject||"Unclassified").trim().toLowerCase()===subject.trim().toLowerCase()).filter(d=>String(d.data().tag||"").trim().toLowerCase()===tag.trim().toLowerCase()).map(d=>({...validate(d.data()),bankId:d.id}));
    qs.sort((a,b)=>a.bankId.localeCompare(b.bankId,undefined,{numeric:true}));
    if(!qs.length) throw new Error("No valid questions found for "+subject+" / "+chapter);
    const slug=v=>String(v).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,45)||"chapter";
    const identity=tag?tag+"|"+subject+"|"+chapter:subject+"|"+chapter; let h=2166136261;
    for(let i=0;i<identity.length;i++) h=Math.imul(h^identity.charCodeAt(i),16777619)>>>0;
    const mid=tag?slug(tag)+"-"+slug(subject):slug(subject);
    const quizId=("chapter-auto-"+mid+"-"+slug(chapter)+"-"+h.toString(36)).slice(0,140);
    const quiz={title:tag?"<"+tag+"> : "+chapter:subject+" — "+chapter,tag,subject,chapter,questions:qs,questionBankChapterQuiz:false,questionCount:qs.length,durationMinutes:Math.max(1,qs.length),videoType:"iframe",videoSolutionUrl:"",test_quiz:false,isPaid:false,generatedFromQuestionBank:true,authorId:user.uid,updatedAt:admin.firestore.FieldValue.serverTimestamp()};
    await db().collection("quizzes").doc(quizId).set({...quiz,createdAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
    await db().collection("artifacts/quizzes/users/"+user.uid+"/quizzes").doc(quizId).set(quiz,{merge:true});
    return result({quizId,questionCount:qs.length,collection:"quizzes",artifactMirror:true});
  });
  s.registerTool("publish_quiz_to_catalog",{description:"Publish a quiz by writing published_quizzes. active=true makes it visible in the existing public catalogue. Explicit confirm=true required.",inputSchema:{confirm:z.boolean(),quizId:z.string().min(1),active:z.boolean().optional(),exam:z.string().optional(),difficulty:z.string().optional(),description:z.string().optional(),featured:z.boolean().optional(),sortOrder:z.number().int().optional()}},async args=>{
    if(!args.confirm) throw new Error("Publish cancelled; set confirm=true after review.");
    const doc=await db().collection("quizzes").doc(args.quizId).get(); if(!doc.exists) throw new Error("Quiz does not exist.");
    const q=doc.data(); const active=args.active??true;
    await db().collection("published_quizzes").doc(args.quizId).set({quizId:args.quizId,title:q.title||"Untitled quiz",subject:q.subject||"General",chapter:q.chapter||"",exam:args.exam||"NEET",difficulty:args.difficulty||"Mixed",description:args.description||"",questionCount:q.questionCount||q.questions?.length||0,active,featured:args.featured||false,sortOrder:args.sortOrder||9999,generatedFromQuestionBank:!!q.generatedFromQuestionBank,updatedAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
    return result({quizId:args.quizId,active,collection:"published_quizzes"});
  });
  return s;
}

export default async function handler(req,res) {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Authorization, Content-Type, MCP-Protocol-Version, MCP-Session-Id, Last-Event-ID, x-mcp-secret");
  res.setHeader("Vary","Origin");
  if(req.method==="OPTIONS") return res.status(204).end();
  if(req.method==="GET") return res.status(200).json({ok:true,service:"neelaxmi-mcp",transport:"Streamable HTTP stateless",mcpEndpoint:"POST /api/mcp"});
  if(req.method!=="POST" && req.method!=="DELETE") return res.status(405).json({error:"Method not allowed"});
  let user;
  try { user=await verifyUser(req); }
  catch(e) {
    const hasBearer = /^Bearer\\s+.+$/i.test(String(req.headers.authorization || ""));
    res.setHeader("WWW-Authenticate", 'Bearer realm="NEELAXMI MCP", resource_metadata="'+RESOURCE_METADATA+'", scope="'+REQUIRED_SCOPE+'"'+(hasBearer?', error="invalid_token"':""));
    return res.status(401).json({error:"Unauthorized"});
  }
  const server=createServer(user);
  const transport=new StreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true});
  res.on("close",()=>{void transport.close();void server.close();});
  try { await server.connect(transport); await transport.handleRequest(req,res,req.body); }
  catch(e) { console.error("[Neelaxmi MCP]",e); if(!res.headersSent) res.status(500).json({error:"MCP request failed"}); }
}

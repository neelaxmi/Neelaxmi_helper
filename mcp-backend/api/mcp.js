import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import admin from "firebase-admin";
import { google } from "googleapis";
import pdf from "pdf-parse";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

const PROJECT = "quiznew-30700";
const DEFAULT_ADMINS = ["mN6M8SImQzXE8qEtJF2MJ2XV8SG3","Fjoi3zeE3bNOO1eQDmIolZzjIs03","soQBFdrszGg3UTvAQSgys0TIUTz2"];
let firebaseApp;
const jsonEnv = name => {
  try { return JSON.parse(process.env[name] || ""); }
  catch { throw new Error(name + " is missing or invalid JSON."); }
};
function db() {
  if (!firebaseApp) {
    const sa = jsonEnv("FIREBASE_SERVICE_ACCOUNT_JSON");
    if (sa.project_id !== PROJECT) throw new Error("Firebase service account must belong to " + PROJECT);
    firebaseApp = admin.initializeApp({ credential: admin.credential.cert(sa), projectId: PROJECT }, "neelaxmi-mcp");
  }
  return admin.firestore(firebaseApp);
}
async function verifyUser(req) {
  if (process.env.MCP_BEARER_SECRET && req.headers["x-mcp-secret"] !== process.env.MCP_BEARER_SECRET) throw new Error("Invalid MCP host secret.");
  const token = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || ""))?.[1];
  if (!token) throw new Error("Missing Firebase ID token in Authorization: Bearer header.");
  const decoded = await admin.auth(firebaseApp || (db(), firebaseApp)).verifyIdToken(token, true);
  const allow = (process.env.QUIZ_BANK_ADMIN_UIDS || DEFAULT_ADMINS.join(",")).split(",").map(x => x.trim());
  if (decoded.firebase?.sign_in_provider === "anonymous" || !allow.includes(decoded.uid)) throw new Error("Firebase user is not an approved Question Bank admin.");
  return { uid: decoded.uid, email: decoded.email || null };
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
async function generate({fileId,subject,chapter,className,examLevel="NEET",count=20,instructions=""}) {
  if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not configured.");
  const source = await getPdf(fileId), n = Math.min(100,Math.max(1,Number(count)||20));
  const prompt = `Using ONLY this PDF text, create exactly ${n} original ${examLevel} MCQs for class ${className}, ${subject}, chapter ${chapter}. Return JSON only: {"questions":[{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","explanation":"...","questionLevel":"Easy|Medium|Hard"}]}. Exactly one correct answer; no duplicates; don't invent facts. ${instructions}\nPDF: ${source.fileName}\nSOURCE:\n${source.text}`;
  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", { method:"POST", headers:{ "Content-Type":"application/json", Authorization:"Bearer "+process.env.GROQ_API_KEY }, body:JSON.stringify({ model:process.env.GROQ_MODEL||"openai/gpt-oss-120b", messages:[{role:"system",content:"You write accurate exam MCQs grounded strictly in source material. Return valid JSON only."},{role:"user",content:prompt}], response_format:{type:"json_object"}, temperature:0.2 }) });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error?.message || "Groq request failed.");
  const result = JSON.parse(data.choices?.[0]?.message?.content || "{}");
  if (!Array.isArray(result.questions)) throw new Error("AI returned no questions array.");
  return { source:{fileId,fileName:source.fileName,pages:source.pages}, requested:n, generated:result.questions.length, questions:result.questions.map((q,i)=>validate({...q,subject,chapter,class:className,examLevel},i)), note:"Preview only. Nothing has been written to Firebase." };
}
const result = value => ({ content:[{type:"text",text:JSON.stringify(value,null,2)}] });
function createServer(user) {
  const s = new McpServer({name:"neelaxmi-mcp",version:"1.0.0"});
  s.registerTool("get_mcp_identity",{description:"Show the verified Question Bank admin identity.",inputSchema:{}},async()=>result({uid:user.uid,email:user.email,project:PROJECT}));
  s.registerTool("list_drive_pdfs",{description:"List PDF files visible to the configured read-only Google Drive service account.",inputSchema:{query:z.string().optional(),pageSize:z.number().int().min(1).max(100).optional()}},async({query="",pageSize=50})=>{
    const terms=["trashed=false","mimeType='application/pdf'"];
    if(process.env.GOOGLE_DRIVE_FOLDER_ID) terms.push("'"+process.env.GOOGLE_DRIVE_FOLDER_ID+"' in parents");
    if(query) terms.push("name contains '"+query.replace(/'/g,"\\'")+"'");
    const r=await drive().files.list({q:terms.join(" and "),pageSize,orderBy:"modifiedTime desc",fields:"files(id,name,size,modifiedTime,webViewLink)"});
    return result(r.data.files||[]);
  });
  s.registerTool("read_drive_pdf",{description:"Extract selectable text from a Drive PDF. OCR is needed for scanned files.",inputSchema:{fileId:z.string().min(10)}},async({fileId})=>result(await getPdf(fileId)));
  s.registerTool("generate_mcqs_from_drive_pdf",{description:"Generate and validate MCQs from a Drive PDF. Preview only; no database writes.",inputSchema:{fileId:z.string().min(10),subject:z.string().min(1),chapter:z.string().min(1),className:z.string().min(1),examLevel:z.string().optional(),count:z.number().int().min(1).max(100),instructions:z.string().optional()}},async args=>result(await generate(args)));
  s.registerTool("save_questions_to_question_bank",{description:"Save reviewed canonical questions to quiznew-30700/question_bank. Explicit confirm=true required.",inputSchema:{confirm:z.boolean(),questions:z.array(z.record(z.any())).min(1).max(400),sourceFileId:z.string().optional(),sourceFileName:z.string().optional()}},async({confirm,questions,sourceFileId,sourceFileName})=>{
    if(!confirm) throw new Error("Save cancelled; set confirm=true after reviewing.");
    const clean=questions.map(validate), batch=db().batch(), ids=[];
    clean.forEach((q,i)=>{const ref=db().collection("question_bank").doc();ids.push(ref.id);batch.set(ref,{...q,bankId:ref.id,sourceFile:sourceFileName||sourceFileId||"MCP generated",sourceFileId:sourceFileId||null,sourceIndex:i,aiGenerated:true,aiProvider:"groq",createdBy:user.uid,createdAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp(),schemaVersion:2});});
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
  try { db(); user=await verifyUser(req); }
  catch(e) { return res.status(401).json({error:e.message||"Unauthorized"}); }
  const server=createServer(user);
  const transport=new StreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true});
  res.on("close",()=>{void transport.close();void server.close();});
  try { await server.connect(transport); await transport.handleRequest(req,res,req.body); }
  catch(e) { console.error("[Neelaxmi MCP]",e); if(!res.headersSent) res.status(500).json({error:"MCP request failed"}); }
}

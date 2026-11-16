# Neelaxmi MCP Backend — Vercel

Standalone backend inside the existing GitHub repository, isolated under /mcp-backend. No existing website, Admin Portal, auth.js, quiz.js, root vercel.json, or Firebase client files are changed by this branch.

## Deploy
Import this repository into Vercel as a **new project**, choose branch **mcp-backend-deploy**, and set **Root Directory** to `mcp-backend`. This is separate from the current Neelaxmi website deployment.

Endpoint: `https://YOUR-VERCEL-DOMAIN/api/mcp`

## Environment variables
Set these in the new Vercel project only:
- FIREBASE_SERVICE_ACCOUNT_JSON: service-account JSON for Firebase project quiznew-30700.
- GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON: read-only Google Drive service-account JSON; share the PDF folder with its client_email.
- GROQ_API_KEY: Groq API key.
- GROQ_MODEL: optional, defaults to openai/gpt-oss-120b.
- QUIZ_BANK_ADMIN_UIDS: approved Question Bank admin UIDs (defaults are in .env.example).
- GOOGLE_DRIVE_FOLDER_ID: optional folder restriction.
- MCP_BEARER_SECRET: optional extra shared secret.

Never commit real credentials or paste them into chat. Keep all keys in Vercel Environment Variables.

## Authentication
Every MCP POST must carry `Authorization: Bearer <fresh Firebase ID token>` from an approved admin account in project quiznew-30700. If MCP_BEARER_SECRET is configured, also send `x-mcp-secret`.

## Tools
- get_mcp_identity
- list_drive_pdfs
- read_drive_pdf
- generate_mcqs_from_drive_pdf (preview only)
- save_questions_to_question_bank (confirm=true required)
- sync_chapter_quiz (confirm=true required)
- publish_quiz_to_catalog (confirm=true required)

Workflow: list PDF → generate preview → approve/save questions → sync chapter quiz → approve/publish catalog entry.

PDF text extraction is not OCR; scanned PDFs must be OCRed first. AI-generated questions must be reviewed for factual accuracy before publishing.

# Neelaxmi MCP Backend — Vercel

Standalone backend inside the existing GitHub repository, isolated under /mcp-backend. No existing website, Admin Portal, auth.js, quiz.js, root vercel.json, or Firebase client files are changed by this branch.

## Deploy
Import this repository into Vercel as a **new project**, choose branch **mcp-backend-deploy**, and set **Root Directory** to `mcp-backend`. This is separate from the current Neelaxmi website deployment.

Endpoint: `https://YOUR-VERCEL-DOMAIN/api/mcp`

## Environment variables
Set these in the new Vercel project only:
- FIREBASE_SERVICE_ACCOUNT_JSON: service-account JSON for Firebase project quiznew-30700.
- GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON: read-only Google Drive service-account JSON; share the PDF folder with its client_email.
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
- save_questions_to_question_bank (confirm=true required)
- sync_chapter_quiz (confirm=true required)
- publish_quiz_to_catalog (confirm=true required)

Workflow: list PDF → read PDF text → Claude (or another connected AI client) generates and reviews MCQs → save approved questions → sync chapter quiz → publish catalog entry. The MCP backend does not call any AI API and requires no Groq/OpenAI/Gemini key.

PDF text extraction is not OCR; scanned PDFs must be OCRed first. Claude-generated questions must be reviewed for factual accuracy before publishing.

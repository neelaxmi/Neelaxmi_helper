# Neelaxmi MCP Backend — Vercel

Standalone backend inside the existing repository, isolated under `/mcp-backend`. The Admin Portal, student quiz website, `auth.js`, `quiz.js`, root Vercel configuration and existing Firebase client files are not changed.

## Deploy
Vercel project: `neelaxmi-mcp`  
Branch: `mcp-backend-deploy`  
Root Directory: `mcp-backend`  
Endpoint: `https://neelaxmi-mcp.vercel.app/api/mcp`

## Required Vercel environment variables
- `FIREBASE_SERVICE_ACCOUNT_JSON`: service-account JSON for `quiznew-30700`.
- `GALLERY_FIREBASE_SERVICE_ACCOUNT_JSON`: service-account JSON for `gallery-83144`.
- `GALLERY_SUPER_ADMIN_EMAILS`: defaults to `sak06gupta@gmail.com`.
- `GALLERY_SUPER_ADMIN_UIDS`: defaults to no UID override; only the configured Super Admin email is privileged by default.
- `GALLERY_SUB_ADMIN_UIDS`: defaults to the Sub Admin UIDs from the supplied Gallery rules (the stale UID in the older client JS is intentionally not included).
- `QUIZ_BANK_ADMIN_UIDS`: approved Quiz Bank UIDs.
- `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON`: read-only Drive service account; share the PDF folder with its client_email.
- `GOOGLE_DRIVE_FOLDER_ID`: optional folder restriction.
- `MCP_BEARER_SECRET`: optional legacy bearer protection.

Set secrets in Vercel only. Never commit service-account JSON or paste it into chat. Gallery Admin access requires the same email to exist as a Firebase Auth user in `gallery-83144`; the backend resolves its Gallery UID server-side. A matching email/password in two projects does not imply matching UIDs.

## Authentication and role mapping
The existing Claude OAuth 2.1 login remains the single login. After verifying the Quiz Bank OAuth identity, the backend resolves that verified email against Gallery Firebase Auth:
- `sak06gupta@gmail.com` is configured as Gallery Super Admin.
- Other Gallery admins must have UIDs in `GALLERY_SUB_ADMIN_UIDS` or `GALLERY_SUPER_ADMIN_UIDS`.
- The MCP backend uses Firebase Admin SDK on both projects; Admin SDK writes bypass client Firestore rules, so each MCP tool performs its own role/ownership checks.
- If the Gallery account is absent, Gallery service account is missing, or role is not allowlisted, MCP authentication is rejected rather than granting fallback access.

## MCP tools
### Existing Question Bank / Drive
- `get_mcp_identity`
- `list_drive_pdfs`, `read_drive_pdf`
- `save_questions_to_question_bank` (confirm=true)
- `sync_chapter_quiz` (confirm=true)
- `publish_quiz_to_catalog` (confirm=true)

### Gallery Admin Panel / Quiz Bank
- `list_admin_educators`
- `list_educator_content`, `get_educator_content`
- `save_educator_content` (confirm=true; Sub Admins may create/edit only their own pending items)
- `delete_educator_content` (Super Admin only; confirm=true)
- `list_pending_content_approvals`, `process_content_approval` (Super Admin only; confirm=true)
- `list_admin_quizzes`, `get_admin_quiz`, `save_admin_quiz`
- `create_quiz_and_link_to_educator` (one action creates Quiz Bank quiz + educator card with generated UID)
- `delete_admin_quiz` (Super Admin only; confirm=true)
- `set_admin_quiz_used`
- `set_quiz_custom_alias` (confirm=true)
- `set_published_quiz_status` (publish/unpublish; confirm=true)
- `get_paid_quiz_token_pool`, `top_up_paid_quiz_tokens` (Super Admin only; confirm=true; max 5,000 per call)

All destructive, publishing, approval, and token-generation actions require explicit `confirm=true`. The Admin SDK bypasses Firestore rules, so do not add tools without equivalent server-side checks. Question/quiz content must be reviewed for accuracy before publishing.

## PDF limitation
Text extraction is not OCR. Scanned PDFs need OCR before extraction.

# Vercel migration guide

This repository now has Vercel-compatible API adapters while retaining the original Netlify function source for rollback.

## Vercel project setup

1. Import `neelaxmi/Neelaxmi_helper` into Vercel.
2. Set the project Root Directory to the repository root (`.`), not `ncertpyq/`.
3. Use the **Other** framework preset. Leave Build Command and Output Directory empty/default; this is a static site with Node API routes.
4. Add the environment variables below to Preview and Production as appropriate, then redeploy.
5. In Firebase Authentication settings, add the Vercel preview hostname and `neelaxmi.site` to Authorized domains. Do not blindly replace the existing `authDomain` value; verify the Firebase project's configured auth handler and test login/OAuth flows first.
6. Test the Vercel preview deployment before moving the `neelaxmi.site` domain away from Netlify.

## API route mapping

- `POST /api/quiz-submit` — offline quiz result sync and server-side scoring.
- `/api/ncertpyq/create-session`
- `/api/ncertpyq/get-reviews`
- `/api/ncertpyq/referral-init`
- `/api/ncertpyq/request-price-drop`
- `/api/ncertpyq/request-withdrawal`
- `/api/ncertpyq/send-feedback`
- `/api/ncertpyq/submit-order`
- `/api/ncertpyq/process-order-background` — internal endpoint; protect with `INTERNAL_SECRET`.
- `/api/ncertpyq/telegram-webhook`
- `GET /api/ncertpyq/drive-pdf?id=<GOOGLE_DRIVE_FILE_ID>`

## Required server environment variables

Never commit service-account JSON, private keys, Telegram tokens, or internal secrets to GitHub.

### Quiz backend (Firebase project `quiznew-30700`)

- `FIREBASE_SERVICE_ACCOUNT_JSON` — complete service-account JSON for the same Firebase project used by the quiz. Grant only the Firestore/Auth permissions the scorer needs.

### NCERT PYQ / payment backend (Firebase project configured for the PYQ app)

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` — paste the private key from the service account; keep escaped newline sequences (`\n`) if the Vercel environment editor stores them that way.
- `UPI_ID` — receiving UPI ID used to generate payment QR codes.
- `PAYEE_NAME` — payee name shown in the payment QR.
- `INTERNAL_SECRET` — long, random secret shared by submit-order and process-order-background.
- `OCR_SPACE_KEY` — OCR.Space API key used to inspect payment screenshots.
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET` — secret Telegram sends in the webhook header.
- `TELEGRAM_ADMIN_IDS` — comma-separated Telegram numeric IDs allowed to approve/reject actions.
- `APP_BASE_URL` — stable absolute base URL used for the internal background-processing request, e.g. the Vercel production URL during testing and `https://neelaxmi.site` after the domain cutover. If omitted, the code falls back to Vercel's `VERCEL_URL`.

The quiz and NCERT PYQ app use different Firebase project configurations in the repository. Do not accidentally paste the quiz service account into the NCERT PYQ variables, or vice versa.

## Telegram webhook

After the production URL is selected, configure the Telegram bot webhook to:

`https://YOUR_PRODUCTION_HOST/api/ncertpyq/telegram-webhook`

Use the same `TELEGRAM_WEBHOOK_SECRET` value in Vercel and as Telegram's webhook secret token. Do not paste the bot token or secret into source code or this file.

## Verification checklist

- [ ] Vercel deployment succeeds from the repository root.
- [ ] Main site pages, CSS, images, and client-side scripts load.
- [ ] Quiz login still works; submit a test result online.
- [ ] Test Mode can save a pending attempt offline and sync it after reconnecting; confirm the attempt remains saved if the API fails.
- [ ] `/api/ncertpyq/get-reviews` returns JSON.
- [ ] NCERT PYQ login, chapter PDF loading, checkout session creation, and referral lookup work.
- [ ] Submit feedback and verify its Firestore document and Telegram notification.
- [ ] Use a test payment order to confirm screenshot processing, OCR, and Telegram admin actions.
- [ ] Verify internal processing rejects requests without the correct `x-internal-secret`.
- [ ] Confirm the Telegram webhook uses the Vercel production URL.
- [ ] Only after these checks pass, move the custom domain to Vercel. Keep the Netlify project intact until the Vercel site has been stable.

## Rollback

The original `netlify/functions/` and `ncertpyq/netlify/functions/` sources are intentionally retained. If migration testing fails, restore the Netlify domain and the original Netlify environment variables. Do not delete the Netlify project during the migration.

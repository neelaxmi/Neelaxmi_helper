# Secure Quiz Attempt API — Deployment Setup

The Test Mode offline/recovery flow now uses a Netlify Function as the trusted boundary for question delivery, answer checks in Quiz Mode, and result calculation.

## Required Netlify environment variable

Set `FIREBASE_SERVICE_ACCOUNT_JSON` in **Netlify → Site configuration → Environment variables** to the complete JSON content of a Firebase service-account key for the same Firebase project used by the quiz app.

The service account must have permissions to:
- Read `quizzes` and `quiz_aliases`.
- Read/delete token documents under `quiz_tokens/{quizId}/tokens` and update the token pool document.
- Create/read/update `quiz_attempts` and `quiz_unlocks`.
- Create result documents under `user_results/{uid}/attempts`.

Keep this value server-side only. **Do not add the service-account JSON to GitHub, frontend JavaScript, or any public file.** Rotate the key if it has ever been exposed.

Optional: set `QUIZ_ALLOWED_ORIGIN` to the exact deployed origin if you want to restrict cross-origin browser requests. If omitted, the function uses `*`; Firebase ID-token verification is still required.

## Deploy and verify

1. Add the environment variable to the Netlify site that serves the main quiz app.
2. Trigger a fresh deploy so Netlify bundles `firebase-admin` and publishes `netlify/functions/quiz-attempt.mjs`.
3. Sign in and open a free quiz. In DevTools → Network, confirm the question payload returned by `/.netlify/functions/quiz-attempt` does not contain `answer`, `correctAnswer`, or other answer-key fields.
4. Test Quiz Mode answer checking and server-calculated submission.
5. Test Test Mode with network disconnected after the attempt starts: select answers, refresh, restore the attempt from local storage, submit offline, reconnect, and confirm the result syncs once.
6. Confirm the browser console shows the matching `✅ SUCCESS`, `⚠️ WARNING`, and `❌ ERROR` messages. Server-side function logs are visible in Netlify function logs.

## Important constraints

- Before production use, verify the Firebase Console Firestore rules deny direct client reads of the `quizzes` answer-key documents (except a properly authorized admin path) and deny client writes to `user_results`, `quiz_attempts`, and `quiz_unlocks`. No root-level Firestore rules file was found in this repository, so the currently deployed rules could not be audited or safely replaced here. The Netlify Function uses Admin SDK privileges and is the intended trusted write path.
- The browser cannot programmatically turn the user's internet connection off. The student must disconnect it manually if that is part of the exam rules.
- An offline browser timer cannot be perfectly tamper-proof against a user changing the device clock or editing browser storage. The server records an authoritative deadline and marks submissions arriving after it as timed out, but offline answer timestamps themselves cannot be independently proven by the server.
- The existing Firebase Firestore security rules still need to prevent clients from writing forged attempt results directly to `user_results`. This function uses Firebase Admin and therefore bypasses Firestore rules; it does not replace the need for secure client rules.

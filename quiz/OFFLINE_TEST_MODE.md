# Offline Normal Test Mode

## What this change does
- Normal Mode + Test Mode requires the student to disconnect from the internet after the quiz/questions have loaded and before starting.
- Test attempts are saved to browser local storage as JSON on answer/navigation changes and timer checkpoints. The local snapshot deliberately strips answer-key fields.
- Refresh restores the saved question, answers, visited/review state and the original deadline. Quiz Mode's existing answer-feedback flow is not converted to offline mode; CBT/proctoring mode is excluded from the new recovery path.
- Submit queues only question IDs and selected answers locally. Once internet returns, the client calls `/.netlify/functions/quiz-submit`; the function verifies Firebase Authentication, reads the answer key from Firestore, scores server-side, and uses the attempt ID as an idempotency key.
- Console messages use `[Quiz][...][SUCCESS|ERROR|INFO]` in the browser and `[quiz-submit][...]` in Netlify function logs. They never log auth tokens or submitted answer values.

## Required Netlify configuration
The root-level Netlify site must deploy the default `netlify/functions` directory. Add a Netlify environment variable named `FIREBASE_SERVICE_ACCOUNT_JSON` containing the JSON service-account credentials for the same Firebase project used by the quiz. Give this service account only the access it needs to read quiz documents and write user attempt results. Never commit the credentials to this repository. Redeploy the site after adding the variable.

The function dependency is declared in the root `package.json` so Netlify can bundle `firebase-admin`.

## Important existing data-model limitation
The current browser quiz loader reads the full `quizzes/{quizId}` document, which includes each question's `answer` field. This patch does not migrate existing quiz documents or change Quiz Mode's immediate feedback flow. Therefore, although answer keys are omitted from the local attempt JSON and the final offline submission is scored by the server, this is **not a complete answer-key confidentiality boundary** while the existing document remains readable by the browser. A later data migration must split public question content from private answer keys and enforce Firestore rules before claiming that Test Mode hides answer keys from browser inspection.

Offline timing is deadline-based and survives refresh, but a fully tamper-proof clock cannot be guaranteed while a device is disconnected from the server. Server-side checks cap submitted timing to the configured duration; do not treat offline client timing as forensic-grade anti-cheat.

## Manual test checklist
1. Load a quiz online, choose Normal Mode > Test Mode, then disconnect the internet and start.
2. Answer questions, navigate, mark/clear an answer; verify local-save success messages in DevTools Console.
3. Refresh during the attempt; verify the same attempt/current question/answers restore and remaining time does not reset.
4. Submit while offline; verify the result-sync screen appears and the pending JSON contains no answer/correct-answer keys.
5. Reconnect; verify a server-side result is saved and the local pending snapshot is removed only after a successful response.
6. Retry the same submission/network request; verify the same attempt ID does not create a duplicate result.
7. Test Quiz Mode and CBT/proctoring separately to confirm their existing flow is unchanged.
8. Verify Netlify function logs show success/error and that missing credentials leave the local pending attempt intact.

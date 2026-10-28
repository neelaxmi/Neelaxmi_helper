# Normal Test Mode: local recovery and server-side scoring setup

This feature is isolated to **Normal Mode → Test Mode**. CBT mode and Quiz Mode keep their existing paths.

## Netlify environment variables

Configure these in the Netlify site that serves this repository. Do not put service-account credentials in GitHub or browser JavaScript.

- `FIREBASE_PROJECT_ID`: `quiznew-30700`
- `FIREBASE_CLIENT_EMAIL`: the `client_email` from a Firebase service-account key
- `FIREBASE_PRIVATE_KEY`: the `private_key` from that service-account key; Netlify may store line breaks as literal `\n`, which the function normalizes
- `FIREBASE_WEB_API_KEY`: the Firebase Web API key for this project (the same public key used by the app)

Create/download the service-account key from Firebase Console → Project settings → Service accounts. Grant the service account only the Firestore permissions needed to read quiz data and create result documents. Restrict the Web API key to the Identity Toolkit API as appropriate for the project.

The Netlify function is `/.netlify/functions/submit-normal-test`. It verifies the Firebase login token, calculates the score from Firestore's quiz answer key, and writes the result under the deterministic attempt ID so retrying a sync does not create a second result.

## Important answer-key note

The existing quiz document currently contains both question content and `answer` fields, and the existing client loads that document for the current Quiz Mode behavior. The new local attempt JSON deliberately omits answer keys, and the new server endpoint calculates the submitted score server-side. However, fully hiding the answer key from browser network/devtools inspection requires a separate data migration: move answer keys into a server-only collection and update Quiz Mode to fetch/use its key under an appropriate access policy. Do not treat the current Firestore document schema as answer-key secrecy.

## Browser test checklist

1. Start an ordinary quiz, choose Normal Mode → Test Mode, and confirm the console shows `[NormalTest][SUCCESS]` local-save messages.
2. Answer several questions, navigate, mark/unmark review, then refresh. The saved-attempt modal should appear and resume should restore the same attempt/current question.
3. Start the test, disconnect the network, answer and submit. The pending-sync screen should remain visible and the attempt should remain in IndexedDB.
4. Reconnect. The page should call the Netlify function and show the server-confirmed result.
5. Refresh/retry after a successful or in-progress sync. The same `attemptId` should return the existing result instead of creating a duplicate.
6. Confirm Quiz Mode and CBT Mode still use their previous paths.
7. Test with IndexedDB disabled/full, an expired login, missing Netlify environment variables, and a server/network error. The console should show an explicit `[...][ERROR]` message and the pending attempt should not be silently deleted.

## Verification status

JavaScript syntax has been checked for the changed JS files. End-to-end browser testing and live Netlify/Firebase verification still need to be run after the environment variables are configured.

# Neelaxmi NCERT PYQ Reader — what changed

## Promotional / landing page
`landing.html` (+ `landing.css`, `landing.js`) is a separate marketing page —
hero, features, "how it works," team, and contact — that links into the app
(`index.html`) via its "Get started" button. It reuses `style.css` for design
tokens/buttons and `branding.js` for the logo, footer, links, and Telegram
modal, so editing `site-config.js` updates both pages at once.

- **Team section** is generated from `SITE_CONFIG.teamMembers` in
  `site-config.js` — it currently has three placeholder entries ("Add your
  name"). Replace those with real names/roles.
- **Contact section** shows `supportEmail` as a `mailto:` link and reuses the
  Telegram modal — no backend/contact-form service required.
- Depending on your hosting, you may want `landing.html` to be the site root
  (`/`) and the reader under something like `/app/` — right now both files
  sit side by side and link to each other by relative filename, so rename/
  move them together if you restructure.

## New files
- `site-config.js` — **edit this first.** Brand name, logo path, website URL,
  Telegram URL, and watermark text/angle/opacity all live here in one place.
- `auth.js` — email/password signup, login, logout, "forgot password", and
  gatekeeping (the reader only loads after someone signs in).
- `branding.js` — applies `site-config.js` everywhere (logo, footer link,
  page title), wires the Telegram modal, and handles the light/dark theme
  toggle + remembering it.
- `assets/neelaxmi.png` — a placeholder badge logo I generated so nothing is
  broken out of the box. **Replace this file with your real logo** (same
  filename, or update `logoPath` in `site-config.js`).

## Before this goes live

1. **Turn on email/password sign-in.** In the Firebase console for
   `utility-destiny-476204-h0`: Authentication → Sign-in method → enable
   "Email/Password". Signup/login won't work until this is on.
2. **Lock down Firestore.** Your config values in `firebase-config.js` are
   fine to be public (that's normal for a client app), but right now your
   Firestore rules are the only thing standing between "logged-in users
   only" and "anyone with the project ID." A starting point:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /chapters/{chapterId}/highlights/{docId} {
         allow read: if request.auth != null;
         allow write: if false; // write from a trusted admin tool only
       }
     }
   }
   ```
3. **Edit `site-config.js`**: `websiteUrl`, `telegramUrl`, and swap in your
   real logo. Everything else (footer, Telegram modal, browser tab title,
   outro page) pulls from this file automatically.
4. **Serve it over http(s)**, not by double-clicking `index.html` — the app
   uses ES modules (`import`/`export`), which browsers block on `file://`.
   Vercel serves the static app and its API routes from this repository.

## What's new for students

- **Signup / login**, gating the reader (Firebase Auth, email + password,
  "forgot password" included, error messages in plain language).
- **HD rendering** — pages render at your screen's actual pixel density
  (capped, so it stays smooth on lower-end phones) instead of a single
  fixed-DPI render, so text looks noticeably sharper.
- **Diagonal watermark** — "NEELAXMI" tiled across every page at a 60°
  angle, 40% opacity, redrawn at the same resolution as the page so it
  stays crisp and always matches the current zoom/page size.
- **Swipe to turn pages** — swipe left/right on a page. Vertical scrolling
  (for pages taller than the screen) still works normally; the app only
  takes over once it detects a horizontal gesture. Tapping the left/right
  edge of a page, the ◄ ► buttons, and the keyboard arrow keys all do the
  same thing.
- **Auto-generated last page** — after the real last page of every chapter,
  a "you've finished this chapter" screen appears with a Telegram button
  and a website link, styled to match the rest of the app.
- **Resume where you left off** — each chapter remembers the last page you
  were on (per device), so switching chapters and coming back doesn't
  dump you back on page 1.
- **Loading progress bar** while a chapter downloads, instead of just a
  spinner.
- Light/dark theme choice now **persists** across visits.
- Basic copy/right-click friction on the page canvas (a deterrent
  alongside the watermark — not real DRM, nothing client-side can be).

## A bug I fixed along the way
The "correct / incorrect" answer styling on PYQ options was never actually
showing — the JS was adding CSS classes (`correctAnswer` / `incorrectAnswer`)
that didn't match what `style.css` defined (`correct` / `incorrect`). Fixed
so the green/red feedback now actually renders.

---
## v3 changes — Google Drive PDFs, Profile page, Referral program, new Checkout

### Google Drive chapters
Paste each chapter's Drive share link in **`public/chapters.json`** (`"ch1": "https://drive.google.com/file/d/…/view"`), files shared "Anyone with the link".
PDFs are public; only the PYQ highlights stay behind login/subscription (Firestore rules). The reader tries Drive directly first and falls back to the
tiny `drive-pdf` function (a plain CORS pass-through, no login, no link list). Chapter titles are in `public/drive-config.js`.

### Profile page (`profile.html` + `profile.js`)
Edit name, subscription status/expiry, referral code + link + coin balance + withdraw form, and "More from Neelaxmi" links
(set the URLs in `SITE_CONFIG.otherWebsites` in `site-config.js`; empty URLs are hidden).

### Referral rules (all enforced server-side in Vercel API routes)
- Every user gets a permanent code + link (`/pyq.html?ref=CODE`).
- A code can be entered at sign-up or on checkout, applied once, only before the first purchase. It is snapshotted on the order at submit time.
- Referrer gets **30 coins (1 coin = ₹1)** only when the referred user's order is **approved** (auto or Telegram "Confirm"), once per referred user.
- If that order is later revoked, the coins are taken back. Same-phone / self referrals are not rewarded.
- Withdrawal: minimum **200 coins**, one pending request at a time. Coins are held immediately; you get a Telegram message with **Mark Paid / Reject** buttons (reject returns the coins).
- Change the numbers in `REF` at the top of the referral section in `netlify/functions/lib/common.js` (and `MIN_WITHDRAW` in `profile.js`).

### Deploy checklist
1. Fill `public/chapters.json`.
2. Publish the updated **`firestore.rules`** (adds `referralRewards` and `withdrawals`, read-only for owners).
3. Deploy the repository root to Vercel. Configure the server environment variables listed in `VERCEL_MIGRATION.md`, then set the Telegram webhook to `/api/ncertpyq/telegram-webhook`.

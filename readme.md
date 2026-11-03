# Neelaxmi — Project Overview

## 1. What is Neelaxmi?

**Neelaxmi: The Helper** is a student-focused study and revision website built around helping learners prepare for competitive and school examinations—especially **NEET UG, JEE Main, and CBSE**—from one central place. The project brings together study resources, practice tools, educational guides, teacher-related pages, community links, and application downloads.

The guiding idea is to make useful learning support easier to find and use, including for students who cannot depend on expensive coaching or paid resources. The homepage describes the project as a student-led effort and presents free study tools, notes, previous-year-question resources, quizzes, and revision aids.

> **Project status note:** This file documents the repository as it is currently organized. Some resource destinations are launch pages or work-in-progress landing pages; the presence of a card does not automatically mean that its full content or any external service has been live-tested.

## 2. Main goals

- Bring study resources for NEET UG, JEE Main, and CBSE together in one website.
- Make practice and revision easier through quizzes, flashcards, notes, and previous-year-question (PYQ) sections.
- Provide clear educational guides and information pages.
- Keep important resources reachable through local site paths wherever available.
- Provide a central homepage for navigation, project information, community links, and contact/feedback.
- Support mobile-friendly access and installable Progressive Web App (PWA) behavior where the browser supports it.

## 3. Website features

### Homepage and navigation
The root `index.html` is the main landing page. It introduces Neelaxmi, explains its purpose, and links to the major study resources and project sections. Its main areas include the project story, mission/how the project helps, the **Everything You Need** study-library section, the wider ecosystem/projects area, team or community information, the app-download area, guides, and contact/feedback.

### Study-library cards
The homepage's study-library area provides entry points to these local sections:

- **Handwritten Notes** — `/notes/index.html`
- **NEET PYQ Quiz** — `/quiz/quizzes.html`
- **JEE PYQ Quiz** — `/quiz/quizzes.html`
- **Important Resources** — `/resources/index.html`
- **Flashcards** — `/flashcards/index.html`
- **NEET previous-year papers** — `/pyqncert/neet.html`
- **JEE previous-year papers** — `/pyqncert/jee.html`
- **CBSE material** — `/cbse/index.html`
- **NEET UG guide** — `/Guides/neet-ug-roadmap.html`
- **Mind Map Studio** — `/mindmap/mindmap.html`
- **NCERT PYQ Library entry point** — `/ncertpyq/index.html`

Some resource pages are lightweight landing pages prepared to keep navigation local and organized. Check each page for its current content and readiness.

### Quizzes and revision
The quiz area is organized under `/quiz/`. The homepage includes NEET and JEE quiz entry points. Flashcards are grouped under `/flashcards/` and are intended for short-form recall and revision.

### Notes, PYQs, and CBSE
The repository includes separate folders for notes, PYQ pages, and CBSE material. This separation keeps different study collections organized and allows their landing pages to grow independently.

### Mind maps
The Mind Map Studio page is located at `/mindmap/mindmap.html`. The intended purpose is to provide a browser-based place to create, edit, or export chapter mind maps. The project deliberately uses this folder-based route instead of a root-level `mindmap.html`.

### Guides and blogs
- `/Guides/` contains educational guide pages, including the NEET UG roadmap.
- `/blogs/` contains blog-related content.
- The homepage also links to learning and exam-information material.

### Teachers and class updates
The `/teachers/` folder contains teacher/profile pages and related information. Some pages include APK download links for teacher-associated builds. The current repository keeps APK files in `/apks/`; teacher pages that refer to available APKs should use these local paths.

### Contact and feedback
The homepage has a contact/feedback area. Its browser code is configured to initialize Firebase and write submitted records to Firestore collections used for feedback, team applications, and issue reports. The page includes status messaging so a visitor can see whether initialization or submission succeeds or fails.

**Important:** a Firebase configuration in source code does not by itself prove that live submissions work. Firestore rules, credentials, network behavior, and production permissions must be checked in the deployed environment before relying on contact submissions.

### Android app downloads
The homepage has an app-download section, and teacher pages may offer additional APKs. Repository APK files are grouped under `/apks/` to avoid cluttering the root directory. A Windows installer link may also appear on the homepage; its availability depends on the configured deployment location.

### PWA support
The repository includes a web app manifest (`manifest.json`) and service-worker code (`sw.js`). These support installability and caching behavior in compatible browsers. PWA behavior should be tested on the deployed site after changes to asset paths or cache versions.

## 4. Repository structure

| Path | Purpose |
| --- | --- |
| `index.html` | Main homepage and primary navigation |
| `style.css`, `Css/` | Shared and section-specific styling |
| `auth.js` and other root JavaScript files | Browser-side behavior used by site features |
| `Guides/` | Exam guides and learning material |
| `blogs/` | Blog content |
| `notes/` | Notes landing pages and related material |
| `resources/` | Curated resource links |
| `flashcards/` | Flashcard/revision section |
| `pyq/` | NEET and JEE previous-year-paper pages |
| `cbse/` | CBSE resources |
| `quiz/` | Quiz pages and practice entry points |
| `mindmap/` | Mind Map Studio page |
| `teachers/` | Teacher/profile pages and associated resources |
| `pictures/` | Images and other visual assets |
| `apks/` | Android application package files |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker and cache behavior |
| `DISCLAIMER.html`, `privacy.html`, `terms.html`, and related HTML pages | Legal, privacy, and policy information |
| `ncertpyq/` | Entry point reserved for the NCERT PYQ bundle |

## 5. Technology and integrations

- **HTML, CSS, and JavaScript** form the core of the website.
- The homepage uses utility/component styling and iconography for its responsive interface.
- **Firebase / Cloud Firestore** is used by the homepage's contact-related submission flow.
- **Vercel** is the planned deployment target. API routes live under `api/`; the old Netlify function sources are retained temporarily for rollback. Backend-dependent bundles still require the correct environment variables and live integration tests.
- **PWA manifest and service worker** support installability and offline/cache behavior where applicable.
- The repository is hosted on GitHub and can be deployed from the configured production branch.

A folder copied into the static site is not automatically a separately configured application. If a bundled project relies on its own serverless functions, package dependencies, secrets, redirects, or environment variables, those need explicit deployment configuration.

## 6. Content and safety notes

- Keep navigation paths consistent with the actual repository structure.
- Do not claim that a resource, quiz, form, or external integration is operational without checking it in the live environment.
- Keep private credentials and service secrets out of committed source files. Public client-side Firebase configuration should still be protected by correctly scoped Firebase security rules.
- Review download links after moving files so old root paths and obsolete subdomain URLs do not remain.
- Test the homepage and key resource links on mobile as well as desktop.
- Keep the user-facing privacy, terms, and disclaimer pages aligned with the actual data collected and services used.

## 7. Current organization changes

This repository organization keeps all APK files in `/apks/`, removes scattered Markdown documentation in favor of this single `project.md` overview, and adds a dedicated NCERT PYQ entry point to the homepage. The NCERT PYQ frontend and its legacy backend source are integrated under `ncertpyq/`; Vercel adapters are under `api/ncertpyq/`. Its complete functionality should only be considered live after Vercel secrets and Firebase/Telegram/payment flows have been tested.

## 8. Suggested validation checklist

- [ ] Open the homepage and confirm the NCERT PYQ card points to `/ncertpyq/index.html`.
- [ ] Verify all APK download links use the new `/apks/` paths.
- [ ] Test the resource cards on desktop and mobile.
- [ ] Submit a test contact/feedback form and verify the expected Firestore record is created.
- [ ] Verify Firebase permissions and security rules.
- [ ] Test PWA installability and service-worker caching after deployment.
- [ ] Configure the Vercel API routes, package dependencies, environment variables, redirects, and Telegram webhook described in `VERCEL_MIGRATION.md` before calling the migration complete.

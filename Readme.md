This document contains the complete source code of the repository consolidated into a single file for streamlined AI analysis.
The repository contents have been processed and combined with security validation bypassed.

# Repository Overview

## About This Document
This consolidated file represents the complete codebase from the repository, 
merged into a unified document optimized for AI consumption and automated 
analysis workflows.

## Repository Information
- **Repository:** neelaxmi/Neelaxmi_helper
- **Branch:** main
- **Total Files:** 72
- **Generated:** 2026-02-01T07:09:03.952Z

## Document Structure
The content is organized in the following sequence:
1. This overview section
2. Repository metadata and information  
3. File system hierarchy
4. Repository files (when included)
5. Individual source files, each containing:
   a. File path header (## File: path/to/file)
   b. Complete file contents within code blocks

## Best Practices
- Treat this document as read-only - make changes in the original repository
- Use file path headers to navigate between different source files
- Handle with appropriate security measures as this may contain sensitive data
- This consolidated view is generated from the live repository state

## Important Notes
- Files excluded by .gitignore and configuration rules are omitted
- Binary assets are not included - refer to the file structure for complete file listings
- Default ignore patterns have been applied to filter content
- Security validation is disabled - review content for sensitive information carefully

# Repository Structure

```
neelaxmi/Neelaxmi_helper/
├── Css
│   ├── index.css
│   ├── owner.css
│   ├── quiz.css
│   ├── Style.css
│   └── teacher.css
├── pictures
│   ├── educator.txt
│   └── Po
├── quiz
│   ├── auth.html
│   ├── auth.js
│   ├── dashboard.html
│   ├── gemini.html
│   ├── Nhu
│   ├── quiz.js
│   ├── quizmain.html
│   ├── quizzes.html
│   ├── result.js
│   └── vedio.js
├── teachers
│   ├── about-owner.html
│   ├── ajay-sir.html
│   ├── amit-gupta-sir.html
│   ├── Fi
│   ├── prateek-jain.html
│   ├── ramesh-sharda.html
│   ├── seep-mam.html
│   └── test-series.html
├── administration.html
├── educator.txt
├── features.json
├── history.js
├── index.html
├── manifest (1).json
├── manifest.json
├── neelaxmi.txt
├── offline.html
├── onesignalsdkworker.js
├── robots.txt
├── sitemap.xml
├── style.css
└── sw.js
```

================================================================================
// File: Css/Style.css
================================================================================


================================================================================
// File: Css/index.css
================================================================================
/* --- 🛠 1. RESET & VARIABLES (UPGRADED) --- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
}

:root {
    /* SPACING */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --spacing-xl: 64px;

    /* RADIUS */
    --border-radius-sm: 8px;
    --border-radius-md: 16px;
    --border-radius-full: 50px;
    
    /* TRANSITIONS */
    --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    --transition-bounce: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    /* FONT */
    --font-main: 'Poppins', sans-serif;

    /* 🆕 FONT SIZES (Modular Scale) */
    --font-size-base: 1rem;
    --font-size-sm: 0.875rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.875rem;
    --font-size-h1: 2.5rem;
    --font-size-h2: 2rem;

    /* 🆕 FONT WEIGHTS */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 600;
    --font-weight-bold: 800;

    /* 🆕 Z-INDICES */
    --z-level-sticky: 100;
    --z-level-modal: 1000;
}

/* 🆕 Accessibility: Use :focus-visible for better focus handling */
*:focus:not(:focus-visible) {
    outline: none;
}
*:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
}

/* --- Theme Definitions (UPGRADED with Accent RGB) --- */
.theme-default {
    --color-primary: #1976D2;
    --color-primary-rgb: 25, 118, 210;
    --color-accent: #00C853;
    --color-accent-rgb: 0, 200, 83; /* Added */
    --color-bg: #F4F7FA;
    --color-surface: #FFFFFF;
    --color-text-main: #1A202C;
    --color-text-muted: #718096;
    --color-border: #E2E8F0;
    --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 20px 50px rgba(25, 118, 210, 0.12);
}

.theme-dark {
    --color-primary: #64B5F6;
    --color-primary-rgb: 100, 181, 246;
    --color-accent: #81C784;
    --color-accent-rgb: 129, 199, 132; /* Added */
    --color-bg: #121212;
    --color-surface: #1E1E1E;
    --color-text-main: #E2E8F0;
    --color-text-muted: #A0AEC0;
    --color-border: #2D3748;
    --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.5);
    --shadow-hover: 0 20px 50px rgba(0, 0, 0, 0.7);
}

.theme-minimalist {
    --color-primary: #E91E63;
    --color-primary-rgb: 233, 30, 99;
    --color-accent: #03A9F4;
    --color-accent-rgb: 3, 169, 244; /* Added */
    --color-bg: #FFFFFF;
    --color-surface: #FAFAFA;
    --color-text-main: #111;
    --color-text-muted: #999;
    --color-border: #EEE;
    --shadow-soft: 0 2px 10px rgba(0,0,0,0.05);
    --shadow-hover: 0 5px 20px rgba(0,0,0,0.1);
}

body {
    background-color: var(--color-bg);
    color: var(--color-text-main);
    font-family: var(--font-main);
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}

/* --- 🧩 2. LAYOUT COMPONENTS (UPGRADED) --- */

.container {
    max-width: 1200px;
    margin-inline: auto; /* 🆕 Use logical property */
    padding: 0 var(--spacing-lg);
    width: 100%;
}

/* Modern Sticky Header with Glassmorphism */
.main-header {
    background-color: rgba(var(--color-primary-rgb), 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
    padding: var(--spacing-md) 0;
    position: sticky;
    top: 0;
    z-index: var(--z-level-sticky); /* Use variable */
    transition: var(--transition-smooth);
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-sm);
}

/* --- 🖼️ LOGO & BRANDING --- */

.logo-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--color-surface);
    padding: 4px;
    box-shadow: 
        0 0 0 2px var(--color-bg),
        0 0 0 5px var(--color-primary),
        0 10px 20px rgba(var(--color-primary-rgb), 0.2);
    transition: var(--transition-bounce);
    margin-bottom: 5px;
}

.logo-wrapper:hover {
    transform: rotate(5deg) scale(1.05);
    box-shadow: 
        0 0 0 3px var(--color-bg),
        0 0 0 7px var(--color-primary), 
        0 15px 30px rgba(var(--color-primary-rgb), 0.3);
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
}

.title {
    font-size: clamp(var(--font-size-h2), 4vw, var(--font-size-h1)); /* Use variable */
    font-weight: var(--font-weight-bold); /* Use variable */
    color: var(--color-primary);
    letter-spacing: -0.5px;
    margin: 0;
}

.subtitle {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm); /* Use variable */
    max-width: 600px;
    margin: 0 auto;
}

/* --- 🎨 3. THEME SWITCHER --- */

.controls-section {
    margin: var(--spacing-lg) 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.theme-switcher {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
    -ms-overflow-style: none;
    scrollbar-width: none;
    justify-content: center;
}

.theme-switcher::-webkit-scrollbar {
    display: none;
}

.theme-btn {
    background: var(--color-surface);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    padding: 8px 16px;
    border-radius: var(--border-radius-full);
    cursor: pointer;
    white-space: nowrap;
    font-weight: var(--font-weight-medium); /* Use variable */
    font-size: var(--font-size-sm); /* Use variable */
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    gap: 6px;
}

.theme-btn:hover, .theme-btn.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

/* --- 🔍 4. SEARCH BAR --- */

.search-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 16px 50px;
    border-radius: var(--border-radius-md);
    border: 2px solid transparent;
    background-color: var(--color-surface);
    color: var(--color-text-main);
    font-size: var(--font-size-base); /* Use variable */
    font-family: inherit;
    box-shadow: var(--shadow-soft);
    transition: var(--transition-smooth);
}

.search-input:focus {
    outline: none;
    border-color: var(--color-primary);
    /* 🆕 Use accent for the focus ring for better contrast */
    box-shadow: 0 0 0 4px rgba(var(--color-accent-rgb), 0.15);
}

.search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-primary);
    font-size: var(--font-size-base);
    pointer-events: none;
}

.clear-search {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    cursor: pointer;
    display: none;
    transition: color 0.2s;
}

.clear-search:hover {
    color: var(--color-primary);
}

/* --- 📇 5. CARDS --- */

main {
    flex: 1;
}

.notifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
}

.teacher-card {
    background-color: var(--color-surface);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-soft);
    transition: var(--transition-bounce);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-border);
    opacity: 0;
    animation: slideUp 0.6s ease forwards;
}

.teacher-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
    border-color: rgba(var(--color-primary-rgb), 0.3); /* Enhanced hover border */
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.card-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.avatar-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid var(--color-primary);
    padding: 2px;
    position: relative;
    flex-shrink: 0;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background-color: #eee;
}

.rank-badge {
    position: absolute;
    bottom: -5px;
    right: -8px;
    background: var(--color-accent);
    color: white;
    font-size: 0.6rem;
    font-weight: var(--font-weight-bold); /* Use variable */
    padding: 2px 6px;
    border-radius: 10px;
    text-transform: uppercase;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.teacher-details h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin-bottom: 2px;
    line-height: 1.2;
}

.teacher-details .designation {
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-body {
    color: var(--color-text-muted);
    font-size: var(--font-size-base);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
    flex-grow: 1;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: var(--spacing-md);
    border-top: 1px dashed var(--color-border);
}

.tag {
    background-color: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    padding: 4px 12px;
    border-radius: var(--border-radius-full);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
}

.btn-profile {
    color: var(--color-text-main);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
}

.btn-profile:hover {
    color: var(--color-primary);
}

.btn-profile i {
    transition: transform 0.2s;
}

.btn-profile:hover i {
    transform: translateX(4px);
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    color: var(--color-text-muted);
}

/* --- 👣 FOOTER (New) --- */

.main-footer {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-lg) 0;
    margin-top: var(--spacing-xl);
    text-align: center;
}

.footer-content p {
    color: var(--color-text-muted);
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-xs);
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
}

.footer-link {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: var(--font-size-lg);
    transition: color 0.2s;
}

.footer-link:hover {
    color: var(--color-primary);
}

/* --- 📟 MODAL --- */

.modal-backdrop {
    display: none;
    position: fixed;
    z-index: var(--z-level-modal); /* Use variable */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-backdrop.show {
    display: flex; /* Ensure it is displayed when 'show' */
    opacity: 1;
}

.modal-card {
    background-color: var(--color-surface);
    width: 90%;
    max-width: 450px;
    padding: 30px;
    border-radius: var(--border-radius-md);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(0.9);
    transition: transform 0.3s;
    position: relative;
    text-align: center;
}

.modal-backdrop.show .modal-card {
    transform: scale(1);
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.5rem;
    color: var(--color-text-muted);
    cursor: pointer;
    background: none;
    border: none;
}

.btn-telegram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px;
    margin-top: 20px;
    background-color: #0088cc;
    color: white;
    border-radius: var(--border-radius-sm);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    box-shadow: 0 4px 14px rgba(0, 136, 204, 0.4);
    transition: transform 0.2s;
}

.btn-telegram:hover {
    transform: translateY(-2px);
}

/* --- 📱 RESPONSIVE --- */
@media (max-width: 768px) {
    .title { font-size: 1.8rem; }
    .container { padding: 0 var(--spacing-md); }
    .theme-switcher { justify-content: flex-start; }
    .logo-wrapper { width: 60px; height: 60px; }
}








================================================================================
// File: Css/owner.css
================================================================================
:root {
    --primary: #FF9933; /* Saffron */
    --secondary: #00F3FF; 
    --dark: #050505;
    --glass: rgba(255, 255, 255, 0.05);
    --sidebar-width: 260px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: none; 
}

body {
    background-color: var(--dark);
    color: white;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    font-size: 1rem; /* Ensure text size adjusts based on screen */
    margin: 0;   
}

/* --- CUSTOM CURSOR --- */
#cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--secondary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
    mix-blend-mode: difference;
}

#cursor-dot {
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
}

/* --- BACKGROUND LAYERS --- */
#vanta-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -2; 
    opacity: 0.8;
}

#map-bg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    background-image: url('/pictures/u67.jpg'); 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    opacity: 1.7; 
    mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%);
    -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%);
    filter: drop-shadow(0 0 20px rgba(0, 243, 255, 0.3)) contrast(1.1);
    mix-blend-mode: screen; 
    pointer-events: none;
    animation: mapPulse 8s infinite ease-in-out;
}

/* Animation for Map */
@keyframes mapPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.8; }
}

/* --- TYPOGRAPHY & ANIMATION --- */
.glitch {
    font-family: 'Orbitron', sans-serif;
    font-size: 5rem;
    font-weight: 900;
    position: relative;
    color: white;
    text-transform: uppercase;
}

.glitch::before, .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
}

.glitch::before {
    left: 2px;
    text-shadow: -2px 0 var(--primary);
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

.glitch::after {
    left: -2px;
    text-shadow: -2px 0 var(--secondary);
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
    0% { clip: rect(10px, 9999px, 30px, 0); }
    20% { clip: rect(80px, 9999px, 100px, 0); }
    40% { clip: rect(10px, 9999px, 120px, 0); }
    100% { clip: rect(40px, 9999px, 60px, 0); }
}

@keyframes glitch-anim-2 {
    0% { clip: rect(60px, 9999px, 80px, 0); }
    20% { clip: rect(20px, 9999px, 40px, 0); }
    100% { clip: rect(90px, 9999px, 10px, 0); }
}

/* --- SECTION & GRID LAYOUTS --- */
section {
    min-height: 100vh;
    padding: 4rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.hero-content h2 {
    color: var(--secondary);
    letter-spacing: 5px;
    margin-bottom: 1rem;
    font-family: 'Orbitron';
    text-shadow: 0 0 10px rgba(0,0,0,0.8);
}

.prime-line {
    margin-top: 2rem;
    padding: 1rem;
    border-left: 4px solid var(--primary);
    background: linear-gradient(90deg, rgba(255,153,51,0.2) 0%, rgba(0,0,0,0) 100%);
    font-style: italic;
    font-size: 1.2rem;
    backdrop-filter: blur(2px);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.stat-card {
    background: rgba(0, 0, 0, 0.45); /* Semi-transparent */
    backdrop-filter: blur(10px);    /* This makes it look premium */
    border: 1px solid rgba(255, 153, 51, 0.3); /* Subtle Saffron border */
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    border-color: #ff9933;
    box-shadow: 0 0 20px rgba(255, 153, 51, 0.2);
    transform: translateY(-5px);
}


.stat-card:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(255, 153, 51, 0.3);
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    font-family: 'Orbitron';
}

.stat-label {
    color: #aaa;
    font-size: 0.9rem;
    text-transform: uppercase;
}

.terminal-window {
    background: rgba(10, 10, 10, 0.9);
    border: 1px solid var(--secondary);
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
    font-family: 'Courier New', monospace;
    padding: 1rem;
    margin-top: 2rem;
}

.terminal-header {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.cmd-line {
    color: var(--secondary);
    margin-bottom: 0.5rem;
}

/* --- PROJECT LIST --- */
.project-item {
    padding: 0.5rem 0;
    border-bottom: 1px dashed #333;
    display: flex;
    justify-content: space-between;
    transition: 0.2s;
    flex-wrap: wrap; 
}

.project-item:hover {
    background: rgba(0, 243, 255, 0.1);
    padding-left: 10px;
    color: var(--secondary);
}

.project-list a {
    color: inherit;
    text-decoration: none;
    cursor: none; 
}

.badge-container {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    flex-wrap: wrap; /* Ensure badges wrap on small screens */
}

.badge {
    background: rgba(255, 255, 255, 0.05); /* Glassmorphism style */
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 153, 51, 0.3);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 12px; /* Slightly more modern than 50px */
    font-family: 'Orbitron';
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
}

.badge:hover {
    background: var(--primary);
    box-shadow: 0 0 25px var(--primary);
    transform: translateY(-3px);
}

.badge-img {
    width: 54px;  
    height: 54px; 
    border-radius: 50%; /* Makes the photos circular */
    object-fit: cover;
    border: 2px solid var(--primary);
    margin-left: 4px;
}

.highlight { color: var(--secondary); }
.highlight-pol { color: var(--primary); }

footer {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid var(--border);
    font-size: 0.8rem;
    color: #666;
    background: rgba(0,0,0,0.8);
}

#progress {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 4px;
    background: var(--primary);
    width: 0%;
    z-index: 10000;
}

/* --- MEDIA QUERIES --- */

/* For larger screens like tablets and desktops */
@media (min-width: 768px) {
    .glitch {
        font-size: 4rem; /* Adjust glitch text size */
    }

    section {
        padding: 4rem 8%;
    }

    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Wider columns */
    }

    .stat-card {
        padding: 3rem;
    }

    .badge {
        font-size: 1.1rem; /* Slightly larger font size for larger screens */
    }
}

/* For mobile devices and small screens */
@media (max-width: 768px) {
    body {
        font-size: 0.9rem; /* Slightly smaller font on mobile */
    }

    .glitch {
        font-size: 3rem; /* Decrease font size for small screens */
    }

    section {
        padding: 4rem 5%;
    }

    #map-bg {
        background-size: cover; 
        width: 120vw; /* Adjust map size for small screens */
    }

    .stats-grid {
        grid-template-columns: 1fr; /* Stack stats grid on mobile */
    }

    .badge-container {
        justify-content: center; /* Center badges on mobile */
    }

    .badge {
        font-size: 1rem; /* Smaller font size for mobile */
        padding: 0.5rem 1rem; /* Reduce padding */
    }

    .stat-card {
        padding: 1.5rem; /* Reduce padding for smaller screens */
    }

    .project-item {
        font-size: 0.9rem; /* Reduce font size in project items */
    }

    footer {
        font-size: 0.7rem; /* Smaller footer text on mobile */
    }

    /* Ensure the custom cursor also resizes on smaller screens */
    #cursor {
        width: 16px;
        height: 16px;
    }

    #cursor-dot {
        width: 4px;
        height: 4px;
    }
}

/* For very small screens like portrait mobile devices */
@media (max-width: 480px) {
    body {
        font-size: 0.8rem; /* Reduce font size even more */
    }

    .glitch {
        font-size: 2.5rem; /* Reduce font size for tiny screens */
    }

    section {
        padding: 3rem 4%;
    }

    .badge {
        font-size: 0.9rem;
        padding: 0.4rem 1rem; /* Further reduce padding */
    }

    .stat-card {
        padding: 1rem; /* Reduce card padding */
    }

    footer {
        font-size: 0.6rem; /* Further reduce footer text */
    }
}

================================================================================
// File: Css/quiz.css
================================================================================
/* General Styling */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --background-color: #f8f9fa;
    --card-background: #ffffff;
    --text-color: #343a40;
    --border-radius: 8px;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.container {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    background: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

h1, h2, h3 {
    color: var(--primary-color);
}

hr {
    border: 0;
    border-top: 1px solid #e9ecef;
    margin: 20px 0;
}

/* --- Buttons (Shared Styles) --- */
.primary-btn, .secondary-btn, .action-btn, .nav-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s, transform 0.1s;
    margin: 5px;
}

.primary-btn, #submit-quiz {
    background-color: var(--success-color);
    color: white;
}

.secondary-btn, #save-for-later {
    background-color: var(--secondary-color);
    color: white;
}

.action-btn, .nav-btn {
    background-color: #e9ecef;
    color: var(--text-color);
}

.primary-btn:hover, .secondary-btn:hover, .action-btn:hover, .nav-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* --- Index Page (Chapter Cards) --- */
.chapter-card {
    display: block;
    width: 100%;
    text-align: left;
    background: #f1f3f5;
    border: 1px solid #dee2e6;
    margin-bottom: 15px;
    padding: 20px;
    border-radius: var(--border-radius);
    transition: background 0.3s;
}

.chapter-card:hover {
    background: #e9ecef;
    border-color: var(--primary-color);
}

/* --- Quiz Page Layout --- */
.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.timer {
    font-size: 1.2em;
    padding: 5px 10px;
    border: 2px solid var(--warning-color);
    border-radius: var(--border-radius);
    background: #fff3cd;
    color: #856404;
}

.question-area {
    margin-bottom: 30px;
}

.question-number {
    color: var(--secondary-color);
    font-size: 1.1em;
    margin-bottom: 10px;
}

.options-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 20px;
}

.option-btn {
    width: 100%;
    padding: 15px;
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    text-align: left;
    font-size: 1em;
}

.option-btn:hover {
    background-color: #e9ecef;
}

/* Highlight for selected option */
.option-btn.selected {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    font-weight: bold;
}

/* Highlight for correct/incorrect feedback (if shown after selection) */
.option-btn.correct {
    background-color: var(--success-color);
    color: white;
}

.option-btn.incorrect {
    background-color: #dc3545; /* Red */
    color: white;
}

.quiz-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
}

.navigation-buttons {
    display: flex;
}

.action-buttons {
    display: flex;
}

/* Utility Class */
.hidden {
    display: none !important;
}

/* Loading Screen */
.loading-screen {
    text-align: center;
    padding: 50px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- Result Page --- */
.result-box {
    background: #e9f7ef;
    border: 1px solid var(--success-color);
    padding: 20px;
    border-radius: var(--border-radius);
    margin-bottom: 20px;
    font-size: 1.1em;
}

.result-box span {
    font-weight: bold;
    color: var(--primary-color);
}

.home-btn {
    display: inline-block;
    text-decoration: none;
    margin-top: 20px;
}

.detailed-answers h2 {
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 10px;
    margin-top: 30px;
}

================================================================================
// File: Css/teacher.css
================================================================================
:root {
    --color-bg-page: #f9f9f9;
    --color-bg-card: #ffffff;
    --color-text-primary: #1f2937;
    --color-text-secondary: #6b7280;
    --color-accent: #2563eb; 
    --color-accent-text: #ffffff;
    --color-border: #e5e7eb;
    --color-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

/* Dark Mode */
body[data-theme='dark'] {
    --color-bg-page: #111827;
    --color-bg-card: #1f2937;
    --color-text-primary: #f3f4f6;
    --color-text-secondary: #9ca3af;
    --color-accent: #4f46e5;
    --color-accent-text: #ffffff;
    --color-border: #374151;
    --color-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
}

/* Vibrant UI */
body[data-theme='vibrant'] {
    --color-bg-page: #f0fdf4;
    --color-bg-card: #ffffff;
    --color-text-primary: #16a34a; 
    --color-text-secondary: #65a30d;
    --color-accent: #10b981; 
    --color-accent-text: #ffffff;
    --color-border: #d1fae5;
    --color-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2), 0 2px 4px -2px rgba(16, 185, 129, 0.1);
}

/* Minimalist Theme */
body[data-theme='minimalist'] {
    --color-bg-page: #ffffff;
    --color-bg-card: #ffffff;
    --color-text-primary: #000000;
    --color-text-secondary: #374151;
    --color-accent: #000000;
    --color-accent-text: #ffffff;
    --color-border: #d1d5db;
    --color-shadow: none;
}

/* Unacademy-Inspired Theme */
body[data-theme='unacademy-inspired'] {
    --color-bg-page: #ffffff;
    --color-bg-card: #ffffff;
    --color-text-primary: #212121;
    --color-text-secondary: #9aa1a7;
    --color-accent: #374151; 
    --color-accent-text: #ffffff;
    --color-border: #e9e9e9;
    --color-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

body {
    font-family: 'Inter', sans-serif;
    transition: background-color 0.3s, color 0.3s;
    background-color: var(--color-bg-page);
    min-height: 100vh;
    position: relative;
}

/* Background Watermark */
#bg-watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-width: 500px;
    opacity: 0.05; /* Very subtle */
    pointer-events: none;
    z-index: 0;
    filter: grayscale(100%);
}

.card {
    background-color: var(--color-bg-card);
    color: var(--color-text-primary);
    box-shadow: var(--color-shadow);
    border: 1px solid var(--color-border);
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 10;
}

.card:hover {
    transform: translateY(-4px); 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.bg-accent { background-color: var(--color-accent); }
.text-accent { color: var(--color-accent); }
.text-accent-text { color: var(--color-accent-text); }
.border-accent { border-color: var(--color-accent); }
.border-border { border-color: var(--color-border); }

/* Custom Tab Styles */
.tab {
    color: var(--color-text-secondary);
    transition: color 0.2s;
    cursor: pointer;
}
.tab:hover {
    color: var(--color-text-primary);
}
.tab-active {
    color: var(--color-text-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--color-accent);
}

/* Filter Buttons */
.filter-btn {
    padding: 6px 16px;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-card);
    color: var(--color-text-secondary);
}
.filter-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
}
.filter-btn.active {
    background-color: var(--color-accent);
    color: var(--color-accent-text);
    border-color: var(--color-accent);
}

/* Theme Button Styles */
.theme-btn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-card);
    color: var(--color-text-primary);
}
.theme-btn:hover {
    background-color: var(--color-bg-page);
}
.theme-btn.active {
    background-color: var(--color-accent);
    color: var(--color-accent-text);
    border-color: var(--color-accent);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Skeleton Loader Animation */
@keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
}
.skeleton {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, var(--color-bg-card) 4%, var(--color-bg-page) 25%, var(--color-bg-card) 36%);
    background-size: 1000px 100%;
}

.content-feature-block:hover .arrow-icon { transform: translateX(4px); }
.content-feature-block .arrow-icon { transition: transform 0.2s ease-out; }
.content-feature-block { text-decoration: none; display: block; transition: all 0.3s ease-in-out; }





================================================================================
// File: administration.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Notification Corner: Find top educators and exclusive updates.">
    <title>Notification Corner | NEELAXMI -: THE HELPER </title>
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
<script>
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "4837b92b-ecaa-4bf4-9a3d-7ed740c82dd9", 
      safari_web_id: "web.onesignal.auto.xxxxx", 
      notifyButton: {
        enable: true, 
      },
      allowLocalhostAsSecureOrigin: true, 
    });
  });
</script>
    
<style>
:root {
    --sidebar-width: min(280px, 85vw);
    --primary-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-main: #f8fafc;
    --text-dim: #94a3b8;
    --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --title-size: clamp(1.8rem, 6vw, 3rem);
    --card-padding: clamp(1rem, 3vw, 2rem);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Poppins', sans-serif;
    background: #0f172a;
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    overflow-x: hidden;
}

/* ========================================
   2. NOTIFICATION SYSTEM STYLES (ENHANCED)
   ======================================== */
.notification-nav {
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 1101;
}

.bell-container {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.bell-container:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #00d2ff;
}

.badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 50%;
    font-weight: 800;
    display: none;
    border: 2px solid #0f172a;
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notif-panel {
    position: fixed;
    top: 75px;
    right: 15px;
    width: 340px; /* Slightly wider for rich content */
    background: #1e293b;
    border: 1px solid rgba(0, 210, 255, 0.3);
    border-radius: 20px;
    display: none;
    flex-direction: column;
    z-index: 1100;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    max-height: 70vh;
    overflow-y: auto;
    animation: slideDown 0.3s ease;
}

.notif-header {
    padding: 15px 20px;
    font-weight: 700;
    border-bottom: 1px solid var(--glass-border);
    background: rgba(0, 210, 255, 0.1);
    color: #fff;
    font-size: 0.95rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* --- RICH NOTIFICATION CARD STYLES --- */
.notif-item {
    padding: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: 0.2s;
    background: rgba(255,255,255,0.02);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notif-item:hover {
    background: rgba(255, 255, 255, 0.05);
}

.notif-item.new {
    border-left: 3px solid #00d2ff;
    background: linear-gradient(90deg, rgba(0, 210, 255, 0.08) 0%, transparent 100%);
}

.notif-banner {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
}

.notif-content-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.notif-title {
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.2;
}

.notif-msg {
    color: #94a3b8;
    font-size: 0.85rem;
    line-height: 1.5;
}

.notif-time {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 5px;
    display: block;
    text-align: right;
}

.notif-action-btn {
    display: inline-block;
    width: 100%;
    padding: 10px;
    background: rgba(0, 210, 255, 0.15);
    color: #00d2ff;
    text-align: center;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    transition: 0.3s;
    border: 1px solid rgba(0, 210, 255, 0.2);
}

.notif-action-btn:hover {
    background: #00d2ff;
    color: #0f172a;
}




@keyframes ring {
  0% { transform: rotate(0); }
  10% { transform: rotate(15deg); }
  20% { transform: rotate(-15deg); }
  30% { transform: rotate(10deg); }
  40% { transform: rotate(-10deg); }
  50% { transform: rotate(0); }
  100% { transform: rotate(0); }
}

.bell-container.has-new i {
  animation: ring 2s infinite;
  color: #00d2ff;
}


/* ========================================
   3. SIDEBAR & NAVIGATION
   ======================================== */
.menu-toggle {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100;
    background: var(--primary-gradient);
    border: none;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.sidebar {
    width: var(--sidebar-width);
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-right: 1px solid var(--glass-border);
    height: 100vh;
    position: fixed;
    left: calc(-1.1 * var(--sidebar-width));
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 80px 1.2rem 2rem;
    transition: var(--transition);
    z-index: 1050;
    overflow-y: auto;
}

.sidebar.active { left: 0; }

.nav-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 18px;
    color: var(--text-dim);
    text-decoration: none;
    border-radius: 14px;
    margin-bottom: 8px;
    transition: 0.3s;
    font-size: 0.95rem;
}

.nav-link:hover, .nav-link.active {
    background: var(--glass-bg);
    color: #00d2ff;
    box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.1);
}

/* ========================================
   4. MAIN CONTENT
   ======================================== */
.main-wrapper {
    flex-grow: 1;
    width: 100%;
    padding: clamp(70px, 10vh, 100px) clamp(15px, 5vw, 50px) 3rem;
    transition: var(--transition);
    min-width: 0;
}

@media (min-width: 1024px) {
    .main-wrapper.shifted { margin-left: var(--sidebar-width); }
}

@media (max-width: 768px) {
    .main-wrapper.shifted { margin-left: 0; filter: blur(5px); }
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: clamp(2rem, 5vh, 4rem);
    text-align: center;
}

@media (min-width: 768px) {
    .header-content { flex-direction: row; text-align: left; }
}

.header-logo {
    width: clamp(100px, 25vw, 180px);
    height: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #00d2ff;
    filter: drop-shadow(0 0 15px rgba(0, 210, 255, 0.4));
    animation: float 3s ease-in-out infinite;
}

.title {
    font-size: var(--title-size);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
    background: linear-gradient(90deg, #fff, #00d2ff, #3a7bd5, #fff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 4s linear infinite;
}

.subtitle { color: var(--text-dim); margin-top: 8px; font-size: clamp(0.9rem, 2vw, 1.1rem); }

/* ========================================
   5. SEARCH & GRID
   ======================================== */
.search-wrapper {
    position: relative;
    max-width: 600px;
    width: 100%;
    margin: 0 auto 3rem;
}

.search-input {
    width: 100%;
    padding: 16px 20px 16px 55px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    color: white;
    outline: none;
    font-size: 1rem;
    transition: 0.3s;
}

.search-input:focus { border-color: #00d2ff; background: rgba(255, 255, 255, 0.08); }
.search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-dim); }

.notifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
    gap: 25px;
}

.teacher-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 28px;
    padding: var(--card-padding);
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.teacher-card:hover {
    border-color: #00d2ff;
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.avatar {
    width: 70px; height: 70px; 
    border-radius: 18px; object-fit: cover; 
    margin-bottom: 1.2rem; border: 2px solid #3a7bd5;
}

.rank-badge { font-size: 0.7rem; font-weight: 700; color: #00d2ff; text-transform: uppercase; letter-spacing: 1px; }
.card-body { color: var(--text-dim); font-size: 0.95rem; line-height: 1.6; margin: 15px 0; flex-grow: 1; }
.btn-profile {
    background: var(--primary-gradient);
    color: white;
    text-decoration: none;
    padding: 12px;
    border-radius: 14px;
    text-align: center;
    font-weight: 600;
    transition: 0.3s;
}

/* ========================================
   6. MODAL & ANIMATIONS
   ======================================== */
.modal-backdrop {
    position: fixed; inset: 0; 
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(10px);
    display: none; 
    align-items: center; justify-content: center; 
    z-index: 2000;
    padding: 20px;
}

.modal-card {
    background: linear-gradient(165deg, #1e293b 0%, #0f172a 100%);
    padding: clamp(1.5rem, 5vw, 2.5rem); 
    border-radius: 30px;
    max-width: 450px; width: 100%;
    text-align: center; 
    border: 1px solid rgba(0, 210, 255, 0.3);
    position: relative;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-card::before {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%); z-index: 0;
}

.modal-content-wrapper { position: relative; z-index: 1; }

.modal-icon {
    font-size: 4rem;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    display: inline-block;
    filter: drop-shadow(0 0 10px rgba(0, 210, 255, 0.4));
    animation: pulseIcon 2s infinite;
}

.btn-join {
    background: var(--primary-gradient);
    color: white;
    text-decoration: none;
    padding: 16px 30px;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    gap: 10px; font-weight: 700; font-size: 1.1rem;
    transition: var(--transition);
    box-shadow: 0 10px 20px rgba(58, 123, 213, 0.3);
    margin-top: 1.5rem;
}
.btn-join:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(58, 123, 213, 0.4); }

.btn-close {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    color: #94a3b8;
    margin-top: 20px;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: 0.3s;
}
.btn-close:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

@keyframes shine { to { background-position: 200% center; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes pulseIcon { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
@keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.2); } 100% { transform: scale(1); } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #00d2ff; }

</style>
</head>
<body>

    <button class="menu-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>

    <div class="notification-nav">
        <div class="bell-container" onclick="toggleNotifPanel()">
            <i class="fas fa-bell"></i>
            <span class="badge" id="notifCount">0</span>
        </div>
    </div>

    <div class="notif-panel" id="notifPanel">
        <div class="notif-header">
            <span>Latest Updates</span>
            <i class="fas fa-sync-alt" style="font-size: 0.8rem; opacity: 0.7;"></i>
        </div>
        <div id="notifList">
            <p style="padding: 30px; color: #64748b; font-size: 0.85rem; text-align: center;">
                No new notifications yet.
            </p>
        </div>
    </div>

    <nav class="sidebar" id="sidebar">
        <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
        <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-comments"></i> DASHBOARD</a>
        <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
        <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
        <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
        <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
        <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
        <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
        <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

        <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
            © <span id="year"></span> TEAM SAKSEN
        </div>
    </nav>

    <main class="main-wrapper" id="mainContent">
       <header class="header-content">
         <img src="/pictures/neelaxmi.jpg" alt="Logo" class="header-logo">
             <div>
                <h1 class="title">NEELAXMI : THE HELPER </h1>
                <p class="subtitle">Curated by <span style="color: #00d2ff; font-weight: 600;">NEELAXMI & SAKEN</span></p>
             </div>
        </header>

        <div class="search-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="searchBar" class="search-input" placeholder="Search educator or subject...">
        </div>

        <div class="notifications-grid" id="notificationsContainer"></div>
    </main>

    <div id="telegramModal" class="modal-backdrop">
        <div class="modal-card">
            <div class="modal-content-wrapper">
                <i class="fab fa-telegram modal-icon"></i>
                <h2 style="color: #fff; margin-bottom: 12px; font-weight: 800;">Join the SAKSEN Squad!</h2>
                <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 5px;">
                    Don't miss out on exclusive notes and direct updates from <b>NEELAXMI & SAKSHAM</b>.
                </p>
                
                <a href="https://telegram.me/saksen_main_bot" target="_blank" class="btn-join" onclick="closeModal()">
                    <span>Join Channel Now</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>

                <button onclick="closeModal()" class="btn-close">
                    Maybe later, I'll browse first
                </button>
            </div>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>

    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
            authDomain: "gallery-83144.firebaseapp.com",
            projectId: "gallery-83144",
            storageBucket: "gallery-83144.firebasestorage.app",
            messagingSenderId: "1005577519231",
            appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // UI Variables
        let unreadCount = 0;
        let isPanelOpen = false;

       // ==========================================
        // 2. DATA SOURCE (TEACHERS)
        // ==========================================
        const TEACHERS_DATA = [
            { name: "Ajay Sir", subject: "Chemistry", rank: "Super Six", description: "Specializes in Physical Chemistry. Known for high-yield concepts and zero-trick mastery.", imgUrl: "/pictures/akmsir.jpg" },
            { name: "Prateek Jain", subject: "Physics", rank: "BRUTAL ", description: "Zero tricks, 100% concepts. The ultimate guide for mastering Physics fundamentals.", imgUrl: "/pictures/pj.jpg" },
            { name: "SEEP MAM", subject: "BIOLOGY", rank: "QUEEN", description: "Beauty is not the only reason for fame sometimes it's just a free version of the brain.", imgUrl: "/pictures/seep.jpg" },
            { name: "Ramesh sharda", subject: "CHEMISTRY", rank: "SMART DADU", description: "AGE WITH EXPERIENCE NEVER GONNA FAIL.", imgUrl: "/pictures/rssir2.jpeg" },
            { name: "AMIT GUPTA SIR", subject: "BIOLOGY", rank: "PG IN UG", description: "The master of Zoology with years of legacy.", imgUrl: "/pictures/AGsir2.jpeg" },
            { name: "TEST SERIES", subject: "TEST SERIES", rank: "CHECK YOUR CAPACITY", description: "IF YOU ARE FLYING THEN IT HAVE POWER TO TAKE DOWN YOU TO EARTH.", imgUrl: "/pictures/neelaxmi.jpg" },
        ];

        // ==========================================
        // 3. CORE UI LOGIC
        // ==========================================
        const container = document.getElementById('notificationsContainer');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        // Sidebar Toggle
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
        }

        // Render Teacher Cards
        function renderCards(data) {
            container.innerHTML = data.map((teacher, index) => {
                const profileSlug = 'teachers/' + teacher.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';
                return `
                    <article class="teacher-card" style="animation: slideDown 0.5s ease forwards; animation-delay: ${index * 0.1}s; opacity: 0;">
                        <div class="rank-badge">${teacher.rank}</div>
                        <img class="avatar" src="${teacher.imgUrl}" onerror="this.src='https://ui-avatars.com/api/?name=${teacher.name}'">
                        <h3 style="font-size: 1.2rem;">${teacher.name}</h3>
                        <p style="color: #00d2ff; font-weight: 600; font-size: 0.8rem;">${teacher.subject}</p>
                        <div class="card-body">${teacher.description}</div>
                        <a href="${profileSlug}" class="btn-profile">View Profile <i class="fas fa-arrow-right" style="margin-left:8px;"></i></a>
                    </article>
                `;
            }).join('');
        }

        // Search Filter
        document.getElementById('searchBar').addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = TEACHERS_DATA.filter(t => 
                t.name.toLowerCase().includes(term) || t.subject.toLowerCase().includes(term)
            );
            renderCards(filtered);
        });

// ==========================================
        // 4. NOTIFICATION LOGIC (REALTIME & PERSISTENT)
        // ==========================================
        
        // 1. Get the last time the user opened the panel from LocalStorage
        let lastOpenedTime = localStorage.getItem('saksen_notif_last_viewed');
        // If never opened, default to 0
        lastOpenedTime = lastOpenedTime ? parseInt(lastOpenedTime) : 0;



        function toggleNotifPanel() {
            const panel = document.getElementById('notifPanel');
            const badge = document.getElementById('notifCount');
            
            isPanelOpen = !isPanelOpen;
            
            if (isPanelOpen) {
                panel.style.display = 'flex';
                
                // When opening, reset badge and update LocalStorage
                unreadCount = 0;
                badge.style.display = 'none';
                
                // Save current time as the new "Last Viewed" time
                lastOpenedTime = Date.now();
                localStorage.setItem('saksen_notif_last_viewed', lastOpenedTime);
                
                // Remove 'new' styling from items visually after a delay
                setTimeout(() => {
                    document.querySelectorAll('.notif-item.new').forEach(el => {
                        el.classList.remove('new');
                        el.style.borderLeft = 'none'; // visual cleanup
                    });
                }, 2000);
            } else {
                panel.style.display = 'none';
            }
        }

        // Firestore Listener
        db.collection("notifications")
          .orderBy("timestamp", "desc") // Latest First
          .limit(20)
          .onSnapshot((snapshot) => {
            const list = document.getElementById('notifList');
            const badge = document.getElementById('notifCount');
            
            // Clear list to ensure order is always correct on update
            list.innerHTML = ''; 

            if (snapshot.empty) {
                list.innerHTML = `<p style="padding: 30px; color: #64748b; font-size: 0.85rem; text-align: center;">No new notifications.</p>`;
                return;
            }
            

            // Reset count for recalculation
            let currentUnread = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                
                // Handle Timestamp
                let notifTimeMs = 0;
                let timeString = 'Just now';
                
                if (data.timestamp) {
                    notifTimeMs = data.timestamp.seconds * 1000;
                    timeString = new Date(notifTimeMs).toLocaleDateString([], {
                        month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                    });
                }

                // Check if this notification is newer than the last time user opened panel
                const isNew = notifTimeMs > lastOpenedTime;
                if (isNew) currentUnread++;

                // Build Elements
                const div = document.createElement('div');
                div.className = `notif-item ${isNew ? 'new' : ''}`;

                // Logic for optional elements (Image, Button)
                const imgHtml = data.img ? 
                    `<img src="${data.img}" class="notif-banner" alt="Update">` : '';
                
                const btnHtml = data.link ? 
                    `<a href="${data.link}" target="_blank" class="notif-action-btn">
                        ${data.btnText || 'Check it out'} <i class="fas fa-arrow-right"></i>
                     </a>` : '';

                div.innerHTML = `
                    ${imgHtml}
                    <div class="notif-content-top">
                        <div class="notif-title">${data.title}</div>
                    </div>
                    <div class="notif-msg">${data.message}</div>
                    ${btnHtml}
                    <small class="notif-time">${timeString}</small>
                `;

                list.appendChild(div);
            });

            // Update Badge Logic
            if (currentUnread > 0) {
                badge.innerText = currentUnread;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
            
            unreadCount = currentUnread; // Sync global var
        });
        
        
        
        // ==========================================
        // 5. MODAL & STARTUP
        // ==========================================
        function closeModal() {
            document.getElementById('telegramModal').style.display = 'none';
            localStorage.setItem('telegram_modal_timestamp', Date.now());
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Set Year
            document.getElementById('year').textContent = new Date().getFullYear();
            
            // Render Cards
            renderCards(TEACHERS_DATA);

            // Modal Logic (1 Week Cooldown)
            const lastInteraction = localStorage.getItem('telegram_modal_timestamp');
            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
            const now = Date.now();

            if (!lastInteraction || (now - lastInteraction) > oneWeekInMs) {
                setTimeout(() => { 
                    document.getElementById('telegramModal').style.display = 'flex'; 
                }, 3000);
            }
        });
    </script>
</body>
</html>

================================================================================
// File: educator.txt
================================================================================
        const educatorList = [
            { id: 'ajay_mishra', name: 'Ajay Mishra (AKM)' },
            { id: 'ramesh_sharda', name: 'Ramesh Sharda' },
            { id: 'prateek_jain', name: 'Prateek Jain' } ,
            { id: 'seep_mam', name: 'SEEP PAHUJA'  } ,
            { id: 'PRANAV_SIR', name: 'PRANAV SIR '  } ,
            { id: 'AMIT_GUPTA', name: 'AMIT GUPTA'  } ,
            { id: 'TEST_SERIES', name: 'TEST SERIES '  } ,
            { id: 'RAKSHITA_MAM', name: 'RAKSHITA SINGH'  } 




        ];
        
        
        
        
        
        
                    {
                name: "ABOUT OWNER",
                subject: "OWNER ",
                rank: "Noise level: Zero. Impact level: Maximum.",
                description: "I'm not here to talk. I'm here to execute.",
                imgUrl: "/pictures/owner.jpg",
                isTop: true
            },


================================================================================
// File: features.json
================================================================================
[
  {
    "question": "Molten sodium chloride conducts electricity due to the presence of :",
    "options": {
      "1": "free electrons",
      "2": "free ions",
      "3": "free molecules",
      "4": "free atoms of Na and Cl"
    },
    "answer": "B"
  },
  {
    "question": "Strong electrolyte are those which :",
    "options": {
      "1": "dissolve readily in water",
      "2": "conduct electricity",
      "3": "dissociate into ions even at high concentration",
      "4": "dissociate into ions at high dilution."
    },
    "answer": "C"
  },
  {
    "question": "Which one of the following is wrong :-",
    "options": {
      "1": "Specific conductance increases on dilution",
      "2": "Specific conductance decreases on dilution",
      "3": "Equivalent conductance increases on dilution",
      "4": "Molar conductance increases on dilution"
    },
    "answer": "A"
  },
  {
    "question": "The value of molar conductivity of HCl is greater than that of NaCl at a particular temperature because :",
    "options": {
      "1": "Molecular mass of HCl is less than that of NaCl.",
      "2": "Velocity of H⁺ ions is more than that of Na⁺ ions",
      "3": "HCl is strongly acidic",
      "4": "Ionisation of HCl is larger than that of NaCl"
    },
    "answer": "B"
  },
  {
    "question": "Electrolytic conduction differs from metallic conduction from the fact that in the former",
    "options": {
      "1": "The resistant increases with increasing temperature",
      "2": "The resistance decreases with increasing temperature",
      "3": "The resistance remains constant with increasing temperature",
      "4": "The resistance is independent of the length of the conductor"
    },
    "answer": "B"
  },
  {
    "question": "Which has maximum conductivity :",
    "options": {
      "1": "[Cr(NH₃)₃Cl₃]",
      "2": "[Cr(NH₃)₄Cl₂]Cl",
      "3": "[Cr(NH₃)₅Cl₂]Cl",
      "4": "[Cr(NH₃)₆]Cl₃"
    },
    "answer": "D"
  },
  {
    "question": "The highest electrical conductivity of the following aqueous solution is of",
    "options": {
      "1": "0.1 M fluoroacetic acid",
      "2": "0.1 M difluoroacetic acid",
      "3": "0.1 M acetic acid",
      "4": "0.1 M chloroacetic acid"
    },
    "answer": "b"
  },
  {
    "question": "Which of the following solutions of NaCl will have the highest specific condutance ?",
    "options": {
      "1": "0.001 N",
      "2": "0.1 N",
      "3": "0.01 N",
      "4": "1.0 N"
    },
    "answer": "4"
  },
  {
    "question": "The specific conductances in ohm⁻¹ cm⁻¹ of four electrolytes P, Q, R and S are given in brackets:\nP (5.0 × 10⁻⁵)\nQ (7.0 × 10⁻⁸)\nR (1.0 × 10⁻¹⁰)\nS (9.2 × 10⁻³)\nThe one that offers highest resistance to the passage of electric current is",
    "options": {
      "1": "P",
      "2": "S",
      "3": "R",
      "4": "Q"
    },
    "answer": "3"
  },
  {
    "question": "If the specific resistance of a solution of concentration C g equivalent litre⁻¹ is R, then its equivalent conductance is :",
    "options": {
      "1": "100R / C",
      "2": "RC / 1000",
      "3": "1000 / RC",
      "4": "C / 1000R"
    },
    "answer": "3"
  },
  {
    "question": "If V, in the equation Λ = sp. cond. × V, is the volume in CC containing 1 eq. of the electrolyte; V for a N/10 solution will be :",
    "options": {
      "1": "10 c.c.",
      "2": "100 c.c.",
      "3": "1000 c.c.",
      "4": "10,000 c.c."
    },
    "answer": "4"
  },
  {
    "question": "Which of the following solutions of KCl has the lowest value of equivalent conductance ?",
    "options": {
      "1": "1 M",
      "2": "0.1 M",
      "3": ".01 M",
      "4": ".001 M"
    },
    "answer": "1"
  },
  {
    "question": "The specific conductivity of N/10 KCl solution at 20ºC is 0.012 Ω⁻¹ cm⁻¹ and the resistance of the cell containing this solution at 20ºC is 56Ω. The cell constant is",
    "options": {
      "1": "4.616 cm⁻¹",
      "2": "0.672 cm⁻¹",
      "3": "2.173 cm⁻¹",
      "4": "3.324 cm⁻¹"
    },
    "answer": "2"
  },
  {
    "question": "The ionization constant of a weak electrolyte is 25×10⁻⁶ while the equivalent conductance of its 0.01 N solution is 19.6 S cm² eq⁻¹. The equivalent conductance of the electrolyte at infinite dilution (in S cm² eq⁻¹) will be",
    "options": {
      "1": "39.2",
      "2": "78.4",
      "3": "392",
      "4": "196"
    },
    "answer": "3"
  },
  {
    "question": "The resistance of 1N solution of CH₃COOH is 250Ω, when measured in a cell of cell constant 1.15 cm⁻¹. The equivalent conductance will be",
    "options": {
      "1": "4.6 Ω⁻¹cm²eq⁻¹",
      "2": "9.2 Ω⁻¹cm²eq⁻¹",
      "3": "18.4 Ω⁻¹cm²eq⁻¹",
      "4": "0.023 Ω⁻¹cm²eq⁻¹"
    },
    "answer": "1"
  },
  {
    "question": "The specific conductance of a 0.01 M solution of KCl is 0.0014 ohm⁻¹ cm⁻¹at 25º C. Its equivalent conductance (cm² ohm⁻¹ equiv⁻¹) is:–",
    "options": {
      "1": "140",
      "2": "14",
      "3": "1.4",
      "4": "0.14"
    },
    "answer": "1"
  },
  {
    "question": "Specific conductance of 0.1 M Nitric acid is 6.3 × 10⁻² ohm⁻¹ cm⁻¹. The molar conductance of the solution is :",
    "options": {
      "1": "630 ohm⁻¹ cm² mol⁻¹",
      "2": "315 ohm⁻¹ cm² mol⁻¹",
      "3": "100 ohm⁻¹ cm² mol⁻¹",
      "4": "6.300 ohm⁻¹ cm² mol⁻¹"
    },
    "answer": "1"
  },
  {
    "question": "The equivalent conductivity of 0.1 N CH₃COOH at 25 ºC is 80 and at infinite dilution 400. The degree of dissociation of CH₃COOH is :",
    "options": {
      "1": "1",
      "2": "0.2",
      "3": "0.1",
      "4": "0.5"
    },
    "answer": "2"
  },
  {
    "question": "At infinite dilution, the eq. conductances of CH₃COONa, HCl and CH₃COOH are 91, 426 and 391 mho cm² respectively at 25 ºC. The eq. conductance of NaCl at infinite dilution will be :",
    "options": {
      "1": "126",
      "2": "209",
      "3": "391",
      "4": "908"
    },
    "answer": "1"
  },
  {
    "question": "The limiting molar conductivities Λ⁰ for NaCl, KBr and KCl are 126, 152 and 150 S cm² mol⁻¹ respectively. The Λ⁰ for NaBr is :",
    "options": {
      "1": "278 S cm² mol⁻¹",
      "2": "176 S cm² mol⁻¹",
      "3": "128 S cm² mol⁻¹",
      "4": "302 S cm² mol⁻¹"
    },
    "answer": "3"
  },
  {
    "question": "The conductivity of a saturated solution of BaSO₄ is 3.06 × 10⁻⁶ ohm⁻¹ cm⁻¹and its molar conductance is 1.53 ohm⁻¹ cm² mol⁻¹. The Ksp of BaSO₄ will be",
    "options": {
      "1": "4 × 10⁻¹²",
      "2": "2.5 × 10⁻⁹",
      "3": "2.5 × 10⁻¹³",
      "4": "4 × 10⁻⁶"
    },
    "answer": "4"
  },
  {
    "question": "For HCl solution at 25ºC, equivalent conductance at infinite dilution, is 425 ohm⁻¹cm²equiv⁻¹. The specific conductance of a solution of HCl is 3.825 ohm⁻¹ cm⁻¹. If the apparent degree of dissociation is 90% the normality of the solution is :-",
    "options": {
      "1": "0.90 N",
      "2": "1.0 N",
      "3": "10 N",
      "4": "1.2 N"
    },
    "answer": "3"
  },
  {
    "question": "Molar conductances of BaCl₂, H₂SO₄ and HCl at infinite dilutions are x₁, x₂ and x₃, respectively. Equivalent conductance of BaSO₄ at infinite dilution will be:",
    "options": {
      "1": "[x₁ + x₂ - x₃] / 2",
      "2": "[x₁ - x₂ - x₃] / 2",
      "3": "2(x₁ + x₂ - 2x₃)",
      "4": "[x₁ + x₂ - 2x₃] / 2"
    },
    "answer": "4"
  },
  {
    "question": "The passage of electricity in the Daniel cell when Zn and Cu electrodes are connected is :",
    "options": {
      "1": "from Cu to Zn in the cell",
      "2": "from Cu to Zn out side the cell",
      "3": "from Zn to Cu outside the cell",
      "4": "in any direction in the cell"
    },
    "answer": "2"
  },
  {
    "question": "In the galvanic cell Cu |Cu²⁺ (1M)||Ag⁺ (1M) | Ag the electrons will travel in the external circuit :",
    "options": {
      "1": "from Ag to Cu",
      "2": "from Cu to Ag",
      "3": "electrons do not travel in the external circuit",
      "4": "in any direction"
    },
    "answer": "2"
  },
  {
    "question": "Which is not true for a standard hydrogen electrode ?",
    "options": {
      "1": "The hydrogen ion concentration is 1 M",
      "2": "Temperature is 25ºC",
      "3": "Pressure of hydrogen is 1 atmosphere",
      "4": "It contains a metallic conductor which does not adsorb hydrogen."
    },
    "answer": "4"
  },
  {
    "question": "Which of the following statements is correct :–",
    "options": {
      "1": "Oxidation occur at anode in both galvanic and electrolytic cell",
      "2": "Reduction occurs at anode in both galvanic and electrolytic cell",
      "3": "Reduction occur at anode in electrolytic cell where as oxidation occur at cathode in galvanic cell",
      "4": "Oxidation occur at anode in electrolytic cell where as reduction occur at anode in galvanic cell"
    },
    "answer": "1"
  },
  {
    "question": "Cu | Cu⁺²(1M) || Zn⁺²(1 M) | Zn\nA cell represented above should have emf.",
    "options": {
      "1": "Positive",
      "2": "Negative",
      "3": "Zero",
      "4": "Cannot be predicted"
    },
    "answer": "2"
  },
  {
    "question": "Which of the following statements is TRUE for the electrochemical Daniel cell :",
    "options": {
      "1": "Electrons flow from copper electrode to zinc electrode.",
      "2": "Current flows from zinc electrode to copper electrode.",
      "3": "Cations move toward copper electrode.",
      "4": "Cations move toward zinc electrode."
    },
    "answer": "3"
  },
  {
    "question": "Other things being equal, the life of a daniel cell may be increased by :–",
    "options": {
      "1": "Keeping low temperature",
      "2": "Using large copper electrode",
      "3": "Decreasing concentration of copper ions",
      "4": "Using large zinc electrodes"
    },
    "answer": "4"
  },
  {
    "question": "The cell emf depends on :–",
    "options": {
      "1": "Size of anode",
      "2": "Volume of solution",
      "3": "Temperature",
      "4": "All of them"
    },
    "answer": "3"
  },
  {
    "question": "The standard electrode potential value of the elements A, B and C are 0.68, –2.50 and 0.50 V respectively. The order of their reducing power is:",
    "options": {
      "1": "A > B > C",
      "2": "A > C > B",
      "3": "C > B > A",
      "4": "B > C > A"
    },
    "answer": "4"
  },
  {
    "question": "The standard reduction potential at 25 ºC of Li⁺ / Li, Ba²⁺ / Ba, Na⁺ / Na and Mg²⁺ / Mg are –3.05, –2.73, –2.71 and –2.37 volt respectively. Which one of the following is the strongest oxidising agent ?",
    "options": {
      "1": "Na⁺",
      "2": "Li⁺",
      "3": "Ba²⁺",
      "4": "Mg²⁺"
    },
    "answer": "4"
  },
  {
    "question": "The reduction potential values are given below : \nAl³⁺ / Al = –1.67 volt, Mg²⁺ / Mg = –2.34 volt \nCu²⁺ / Cu = + 0.34 volt, I₂ / 2I⁻ = + 0.53 volt \nWhich one is the best reducing agent ?",
    "options": {
      "1": "Al",
      "2": "Mg",
      "3": "Cu",
      "4": "I₂"
    },
    "answer": "2"
  },
  {
    "question": "The standard reduction potentials at 25ºC for the following half reactions are given against each : \nZn²⁺ (aq) + 2e⁻ → Zn(s), –0.762 \nCr³⁺ (aq) + 3e⁻ → Cr(s), –0.740 \n2H⁺ + 2e⁻ → H₂(g), 0.00 \nFe³⁺ + 2e⁻ → Fe²⁺, 0.77 \nWhich is the strongest reducing agent ?",
    "options": {
      "1": "Zn",
      "2": "Cr",
      "3": "H₂(g)",
      "4": "Fe²⁺ (aq)"
    },
    "answer": "1"
  },
  {
    "question": "The standard electrode potential of Zn, Ag and Cu are –0.76, 0.80 and 0.34 volt respectively, then :",
    "options": {
      "1": "Ag can oxidise Zn and Cu",
      "2": "Ag can reduce Zn²⁺ and Cu²⁺",
      "3": "Zn can reduce Ag⁺ and Cu²⁺",
      "4": "Cu can oxidise Zn and A"
    },
    "answer": "3"
  },
  {
    "question": "Given A°Ag⁺/Ag = 0.80V, E°Mg²⁺/Mg = –2.37V, E°Cu²⁺/Cu = 0.34 V, E°Hg²⁺/Hg = 0.79V .\nWhich of the following statement is correct",
    "options": {
      "1": "AgNO₃ can be stored in copper vessel",
      "2": "Mg(NO₃)₂ can not be stored in copper vessel",
      "3": "CuCl₂ can be stored in silver vessel",
      "4": "HgCl₂ can be stored in copper vessel"
    },
    "answer": "3"
  },
  {
    "question": "A standard reduction electrode potentials of four elements are \nA = – 0.250 V , B = – 0.140 V \nC = – 0.126 V , D = – 0.402 V \nThe element that displaces A from its compounds aqueous solution is :–",
    "options": {
      "1": "B",
      "2": "C",
      "3": "D",
      "4": "None"
    },
    "answer": "3"
  },
  {
    "question": "Zn can not displace following ions from their aqueous solution :",
    "options": {
      "1": "Ag⁺",
      "2": "Cu²⁺",
      "3": "Fe²⁺",
      "4": "Na⁺"
    },
    "answer": "4"
  },
  {
    "question": "Which one will liberate Br₂ from KBr ?",
    "options": {
      "1": "HI",
      "2": "I₂",
      "3": "Cl₂",
      "4": "SO₂"
    },
    "answer": "3"
  },
  {
    "question": "If a spoon of copper metal is placed in a solution of ferrous sulphate :",
    "options": {
      "1": "Cu will precipitate out",
      "2": "Iron will precipitate",
      "3": "Cu and Fe will precipitate",
      "4": "No rection will take place"
    },
    "answer": "4"
  },
  {
    "question": "Which of the following metals does not give the following reaction ? \nM + water —> oxide or hydroxide + H₂",
    "options": {
      "1": "Iron",
      "2": "Sodium",
      "3": "Mercury",
      "4": "Magnesium"
    },
    "answer": "3"
  },
  {
    "question": "Red hot carbon will remove oxygen from the oxide XO and YO but not from ZO. Y will remove oxygen from XO. Use this evidence to deduce the order of activity of the three metals X, Y and Z putting the most active first.",
    "options": {
      "1": "XYZ",
      "2": "ZYX",
      "3": "YXZ",
      "4": "ZXY"
    },
    "answer": "2"
  },
  {
    "question": "A gas X at 1 atm. is bubbled through a solution containing a mixture of 1 M Y⁻ and 1 M Z⁻ at 25 °C. If the reduction potential of Z > Y > X then :",
    "options": {
      "1": "Y will oxidise X and not Z",
      "2": "Y will oxidise Z and not X",
      "3": "Y will oxidise both X and Z",
      "4": "Y will reduce both X and Z"
    },
    "answer": "1"
  },
  {
    "question": "Each of the three metals x, y and z were put in turn into aqueous solution of the other two. \nx + salt of y (or z) = y (or z) + salt of x \nWhich one of the following observation is probably incorrect ?",
    "options": {
      "1": "y + salt of x = no action observed",
      "2": "y + salt of z = z + salt of y",
      "3": "z + salt of x = x + salt of z",
      "4": "z + salt of y = no action observed"
    },
    "answer": "3"
  },
  {
    "question": "Which of the following displacement does not occur?",
    "options": {
      "1": "Zn + 2H⁺ → Zn²⁺ + H₂ ↑",
      "2": "Fe + 2Ag⁺ → Fe²⁺ + Ag ↓",
      "3": "Cu + Fe²⁺ → Cu²⁺ + Fe ↓",
      "4": "Zn + Pb²⁺ → Zn²⁺ + Pb ↓"
    },
    "answer": "3"
  },
  {
    "question": "The following four colourless salt solutions are placed in separate test tubes and a strip of Cu is placed in each solution which finally turns blue:–",
    "options": {
      "1": "Zn(NO₃)₂",
      "2": "Mg(NO₃)₂",
      "3": "KNO₃",
      "4": "AgNO₃"
    },
    "answer": "4"
  },
  {
    "question": "Adding powdered Pb and Fe to a solution containing 1.0 M in each of Pb⁺² and Fe⁺² ions would result into the formation of :–",
    "options": {
      "1": "More of Pb and Fe⁺² ions",
      "2": "More of Fe and Pb²⁺ ions",
      "3": "More of Fe and Pb",
      "4": "More of Fe⁺² and Pb²⁺ ions"
    },
    "answer": "1"
  },
  {
    "question": "The following facts are available :– \n2X⁻ + Y₂ → 2Y⁻ + X₂ \n2W⁻ + Y₂ → NO reaction \n2Z⁻ + X₂ → 2X⁻ + Z₂ \nWhich of the following statements is correct :–",
    "options": {
      "1": "E°w⁻/w₂ > E°y⁻/y₂ > E°x⁻/x₂ > E°z⁻/z₂",
      "2": "E°w⁻/w₂ < E°y⁻/y₂ < E°x⁻/x₂ < E°z⁻/z₂",
      "3": "E°w⁻/w₂ < E°y⁻/y₂ > E°x⁻/x₂ > E°z⁻/z₂",
      "4": "E°w⁻/w₂ > E°y⁻/y₂ < E°x⁻/x₂ < E°z⁻/z₂"
    },
    "answer": "2"
  },
  {
    "question": "E° for the half cell Zn²⁺ | Zn is –0.76 e.m.f. of the cell \nZn | Zn²⁺ (1M) || 2H⁺ (1M) | H₂ (1 atm) is :",
    "options": {
      "1": "–0.76 V",
      "2": "+0.76 V",
      "3": "–0.38 V",
      "4": "+ 0.38 V"
    },
    "answer": "2"
  },
  {
    "question": "The standard electrode potentials for the reactions \nAg⁺ (aq.) + e⁻ —> Ag(s), \nSn²⁺ (aq.) + 2e⁻ —> Sn (s) \nat 25 °C are 0.80 volt and –0.14 volt, respectively. The standard emf of the cell. \nSn | Sn²⁺ (1M)||Ag⁺ (1M)| Ag is :",
    "options": {
      "1": "0.66 volt",
      "2": "0.80 volt",
      "3": "1.08 volt",
      "4": "0.94 volt"
    },
    "answer": "4"
  },
  {
    "question": "The standard oxidation potentials E°, for the half reaction are as : \nZn —> Zn²⁺ + 2e⁻ E° = + 0.76 volt \nFe —> Fe²⁺ + 2e⁻ E° = + 0.41 volt \nThe standard emf of the cell \nFe²⁺ + Zn → Zn²⁺ + Fe is –",
    "options": {
      "1": "0.35 volt",
      "2": "– 0.35 volt",
      "3": "+1.17 volt",
      "4": "–1.17 volt"
    },
    "answer": "1"
  },
  {
    "question": "E°(Ni²⁺/Ni) = –0.25 volt, \nE° (Au³⁺ / Au) = 1.50 volt. \nThe emf of the voltaic cell. \nNi / Ni²⁺ (1.0 M) | | Au³⁺ (1.0 M) | Au is :",
    "options": {
      "1": "1.25 volt",
      "2": "–1.75 volt",
      "3": "1.75 volt",
      "4": "4.0 volt"
    },
    "answer": "3"
  },
  {
    "question": "The oxidation potential of Zn, Cu, Ag, H₂ and Ni are 0.76, –0.34, –0.80, 0, 0.55 volt respectively. Which of the following reaction will provide maximum voltage ?",
    "options": {
      "1": "Zn + Cu²⁺ —> Cu + Zn²⁺",
      "2": "Zn + 2Ag⁺ —> 2Ag + Zn²⁺",
      "3": "H₂ + Cu²⁺ —> 2H⁺ + Cu",
      "4": "H₂ + Ni²⁺ —> 2H⁺ + Ni"
    },
    "answer": "2"
  },
  {
    "question": "From the following E° values of half cells \n(i) A³⁻ → A⁻² + e; E° = 1.5 V \n(ii) B⁺ + e → B; E° = 0.5 V \n(iii) C²⁺ + e → C⁺; E° = 0.5 V \n(iv) D → D²⁺ + 2e; E° = –1.15 V \nWhat combination of two half cells would result in a cell with the largest potential ?",
    "options": {
      "1": "(i) and (iii)",
      "2": "(i) and (iv)",
      "3": "(ii) and (iv)",
      "4": "(iii) and (iv)"
    },
    "answer": "2"
  },
  {
    "question": "Given electrode potentials : \nFe³⁺ + e —> Fe²⁺ ; E° = 0.771 volts \nI₂ + 2e —> 2I⁻ ; E° = 0.536 volts \nE° cell for the cell reaction \n2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ is -",
    "options": {
      "1": "(2 × 0.771 – 0.536) = 1.006 volts",
      "2": "(0.771 – 0.5 × 0.536) = 0.503 volts",
      "3": "0.771 – 0.536 = 0.235 volts",
      "4": "0.536 – 0.771 = –0.235 volts"
    },
    "answer": "3"
  },
  {
    "question": "The standard reduction electrode potentials of Fe²⁺/Fe and Sn²⁺/Sn are – 0.44 V and – 0.14V respective. What will be the standard E.M.F. of the following cell reaction \nFe²⁺ + Sn → Fe + Sn²⁺",
    "options": {
      "1": "0.3 V",
      "2": "– 0.58 V",
      "3": "+ 0.58 V",
      "4": "– 0.30 V"
    },
    "answer": "4"
  },
  {
    "question": "The standard electrode potentials of the two half cell are given below :– \nNi²⁺ + 2e⁻ → Ni ; E° = – 0.25 V \nZn²⁺ + 2e⁻ → Zn ; E° = – 0.77 V \nThe emf of cell formed by combining the two half cells would be :–",
    "options": {
      "1": "– 1.02 volt",
      "2": "+ 0.52 volt",
      "3": "+ 1.02 volt",
      "4": "– 0.52 volt"
    },
    "answer": "2"
  },
  {
    "question": "Aluminium displaces hydrogen from dilute HCl whereas silver does not, the E.M.F. of a cell prepared by combining Al/Al⁺³ and Ag/Ag⁺ is 2.46V. The reduction potential of silver electrode is +0.80V. The reduction potential of aluminium electrode is :",
    "options": {
      "1": "– 3.26 V",
      "2": "+1.66V",
      "3": "–1.66V",
      "4": "3.26 V"
    },
    "answer": "3"
  },
  {
    "question": "Calculate E⁰cell of following galvanic cell at 298 K; Ca(s)|Ca⁺²(aq.)||Fe⁺²(aq)|Fe(s) \nE⁰Ca⁺²/Ca = –2.87V; E⁰Fe/Fe⁺² = 0.41V",
    "options": {
      "1": "2.46 V",
      "2": "–2.46V",
      "3": "3.28 V",
      "4": "– 3.28V"
    },
    "answer": "1"
  }
]

================================================================================
// File: history.js
================================================================================
/**
 * Navigates back one step in the browser's session history.
 */
function goBack() {
  // Standard and reliable way to use the browser's history stack.
  window.history.back();
}

/**
 * Checks if there is any history available (i.e., if the user didn't 
 * start on this page) and disables the button if not.
 */
document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.getElementById('backButton');
  
  // Check for history. If the length is 1, they likely started on this page.
  if (backButton && window.history.length <= 1) {
    backButton.disabled = true;
    backButton.textContent = '🏠 Home Page';
    // Optional: You could also hide the button completely.
    // backButton.style.display = 'none';
  }
});



const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

function toggleSidebar() {
    // Toggles the 'active' class on sidebar and 'shifted' on the main container
    sidebar.classList.toggle('active');
    if (mainContent) {
        mainContent.classList.toggle('shifted');
    }
}

// Optional: Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !e.target.closest('.menu-toggle')) {
        toggleSidebar();
    }
});

================================================================================
// File: index.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Notification Corner: Find top educators and exclusive updates.">
    <title>Notification Corner | NEELAXMI -: THE HELPER </title>
    
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0f172a">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Neelaxmi">
<link rel="apple-touch-icon" href="/pictures/neelaxmi.png"> 

<link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.png">

    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.png">
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
    <script>
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      OneSignalDeferred.push(function(OneSignal) {
        OneSignal.init({
          appId: "4837b92b-ecaa-4bf4-9a3d-7ed740c82dd9", 
          safari_web_id: "web.onesignal.auto.xxxxx", 
          notifyButton: { enable: true },
          allowLocalhostAsSecureOrigin: true, 
        });
      });
    </script>
    
<style>
/* ... (YOUR EXISTING CSS REMAINS EXACTLY THE SAME) ... */
:root {
    --sidebar-width: min(280px, 85vw);
    --primary-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-main: #f8fafc;
    --text-dim: #94a3b8;
    --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --title-size: clamp(1.8rem, 6vw, 3rem);
    --card-padding: clamp(1rem, 3vw, 2rem);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Poppins', sans-serif;
    background: #0f172a;
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    overflow-x: hidden;
}

/* 2. NOTIFICATION SYSTEM STYLES */
.notification-nav { position: fixed; top: 15px; right: 15px; z-index: 1101; }
.bell-container {
    display: flex !important; /* Force it to show always */
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding-top: 10px;
    background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border); width: 48px; height: 48px;
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; transition: 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.bell-container:hover { background: rgba(255, 255, 255, 0.1); border-color: #00d2ff; }
.badge {
    position: absolute; top: -5px; right: -5px; background: #ff4757;
    color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 50%;
    font-weight: 800; display: none; border: 2px solid #0f172a;
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.notif-panel {
    position: fixed; top: 75px; right: 15px; width: 340px; background: #1e293b;
    border: 1px solid rgba(0, 210, 255, 0.3); border-radius: 20px; display: none;
    flex-direction: column; z-index: 1100; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    max-height: 70vh; overflow-y: auto; animation: slideDown 0.3s ease;
}
.notif-header {
    padding: 15px 20px; font-weight: 700; border-bottom: 1px solid var(--glass-border);
    background: rgba(0, 210, 255, 0.1); color: #fff; font-size: 0.95rem;
    display: flex; justify-content: space-between; align-items: center;
}
.notif-item {
    padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: 0.2s; background: rgba(255,255,255,0.02);
    display: flex; flex-direction: column; gap: 10px;
}
.notif-item:hover { background: rgba(255, 255, 255, 0.05); }
.notif-item.new {
    border-left: 3px solid #00d2ff;
    background: linear-gradient(90deg, rgba(0, 210, 255, 0.08) 0%, transparent 100%);
}
.notif-banner { width: 100%; height: 120px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
.notif-content-top { display: flex; justify-content: space-between; align-items: flex-start; }
.notif-title { color: #fff; font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
.notif-msg { color: #94a3b8; font-size: 0.85rem; line-height: 1.5; }
.notif-time { font-size: 0.7rem; color: #64748b; margin-top: 5px; display: block; text-align: right; }
.notif-action-btn {
    display: inline-block; width: 100%; padding: 10px; background: rgba(0, 210, 255, 0.15);
    color: #00d2ff; text-align: center; border-radius: 10px; text-decoration: none;
    font-weight: 600; font-size: 0.85rem; transition: 0.3s; border: 1px solid rgba(0, 210, 255, 0.2);
}
.notif-action-btn:hover { background: #00d2ff; color: #0f172a; }
@keyframes ring {
  0% { transform: rotate(0); } 10% { transform: rotate(15deg); } 20% { transform: rotate(-15deg); }
  30% { transform: rotate(10deg); } 40% { transform: rotate(-10deg); } 50% { transform: rotate(0); }
  100% { transform: rotate(0); }
}
.bell-container.has-new i { animation: ring 2s infinite; color: #00d2ff; }

/* 3. SIDEBAR & NAV */
.menu-toggle {
    position: fixed; top: 15px; left: 15px; z-index: 1100; background: var(--primary-gradient);
    border: none; color: white; width: 48px; height: 48px; border-radius: 12px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.sidebar {
    width: var(--sidebar-width); background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
    border-right: 1px solid var(--glass-border); height: 100vh; position: fixed;
    left: calc(-1.1 * var(--sidebar-width)); top: 0; display: flex; flex-direction: column;
    padding: 80px 1.2rem 2rem; transition: var(--transition); z-index: 1050; overflow-y: auto;
}
.sidebar.active { left: 0; }
.nav-link {
    display: flex; align-items: center; gap: 15px; padding: 12px 18px; color: var(--text-dim);
    text-decoration: none; border-radius: 14px; margin-bottom: 8px; transition: 0.3s; font-size: 0.95rem;
}
.nav-link:hover, .nav-link.active {
    background: var(--glass-bg); color: #00d2ff; box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.1);
}

/* 4. MAIN CONTENT */
.main-wrapper {
    flex-grow: 1; width: 100%; padding: clamp(70px, 10vh, 100px) clamp(15px, 5vw, 50px) 3rem;
    transition: var(--transition); min-width: 0;
}
@media (min-width: 1024px) { .main-wrapper.shifted { margin-left: var(--sidebar-width); } }
@media (max-width: 768px) { .main-wrapper.shifted { margin-left: 0; filter: blur(5px); } }
.header-content { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-bottom: clamp(2rem, 5vh, 4rem); text-align: center; }
@media (min-width: 768px) { .header-content { flex-direction: row; text-align: left; } }
.header-logo {
    width: clamp(100px, 25vw, 180px); height: auto; aspect-ratio: 1/1; border-radius: 50%;
    object-fit: cover; border: 3px solid #00d2ff; filter: drop-shadow(0 0 15px rgba(0, 210, 255, 0.4));
    animation: float 3s ease-in-out infinite;
}
.title {
    font-size: var(--title-size); font-weight: 800; letter-spacing: -1px; line-height: 1.1;
    background: linear-gradient(90deg, #fff, #00d2ff, #3a7bd5, #fff); background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 4s linear infinite;
}
.subtitle { color: var(--text-dim); margin-top: 8px; font-size: clamp(0.9rem, 2vw, 1.1rem); }

/* 5. SEARCH & GRID */
.search-wrapper { position: relative; max-width: 600px; width: 100%; margin: 0 auto 3rem; }
.search-input {
    width: 100%; padding: 16px 20px 16px 55px; background: var(--glass-bg);
    border: 1px solid var(--glass-border); border-radius: 20px; color: white;
    outline: none; font-size: 1rem; transition: 0.3s;
}
.search-input:focus { border-color: #00d2ff; background: rgba(255, 255, 255, 0.08); }
.search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-dim); }
.notifications-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 25px; }
.teacher-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 28px;
    padding: var(--card-padding); transition: 0.3s; display: flex; flex-direction: column; height: 100%;
}
.teacher-card:hover {
    border-color: #00d2ff; background: rgba(255, 255, 255, 0.08);
    transform: translateY(-10px) scale(1.02); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}
.avatar { width: 70px; height: 70px; border-radius: 18px; object-fit: cover; margin-bottom: 1.2rem; border: 2px solid #3a7bd5; }
.rank-badge { font-size: 0.7rem; font-weight: 700; color: #00d2ff; text-transform: uppercase; letter-spacing: 1px; }
.card-body { color: var(--text-dim); font-size: 0.95rem; line-height: 1.6; margin: 15px 0; flex-grow: 1; }
.btn-profile {
    background: var(--primary-gradient); color: white; text-decoration: none; padding: 12px;
    border-radius: 14px; text-align: center; font-weight: 600; transition: 0.3s;
}

/* 6. MODAL & ANIMATIONS */
.modal-backdrop {
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(10px); display: none; align-items: center; justify-content: center;
    z-index: 2000; padding: 20px;
}
.modal-card {
    background: linear-gradient(165deg, #1e293b 0%, #0f172a 100%);
    padding: clamp(1.5rem, 5vw, 2.5rem); border-radius: 30px;
    max-width: 450px; width: 100%; text-align: center;
    border: 1px solid rgba(0, 210, 255, 0.3); position: relative;
    overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.modal-card::before {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%); z-index: 0;
}
.modal-content-wrapper { position: relative; z-index: 1; }
.modal-icon {
    font-size: 4rem; background: var(--primary-gradient); -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; margin-bottom: 1.5rem; display: inline-block;
    filter: drop-shadow(0 0 10px rgba(0, 210, 255, 0.4)); animation: pulseIcon 2s infinite;
}
.btn-join {
    background: var(--primary-gradient); color: white; text-decoration: none;
    padding: 16px 30px; border-radius: 18px; display: flex; align-items: center; justify-content: center;
    gap: 10px; font-weight: 700; font-size: 1.1rem; transition: var(--transition);
    box-shadow: 0 10px 20px rgba(58, 123, 213, 0.3); margin-top: 1.5rem;
}
.btn-join:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(58, 123, 213, 0.4); }
.btn-close {
    background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); color: #94a3b8;
    margin-top: 20px; padding: 8px 16px; border-radius: 10px; cursor: pointer;
    font-size: 0.85rem; transition: 0.3s;
}
.btn-close:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

@keyframes shine { to { background-position: 200% center; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes pulseIcon { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
@keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.2); } 100% { transform: scale(1); } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #00d2ff; }


/* === NEW: FLOATING INSTALL BUTTON (LEFT SIDE) === */
.install-float {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1102;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    border-radius: 50%;
    display: flex; /* Yaha 'none' ki jagah 'flex' kar diya hai taaki hamesha dikhe */
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(56, 239, 125, 0.4);
    cursor: pointer;
    border: 2px solid rgba(255,255,255,0.2);
    animation: bounceIn 1s ease, glowPulse 2s infinite;
}

/* Sidebar button ko bhi hamesha dikhane ke liye */
#sidebarInstallBtn {
    display: flex !important; 
}
.install-float:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 25px rgba(56, 239, 125, 0.6);
}

.install-float i {
    animation: slideDownArrow 2s infinite;
}

/* Animations for Install Button */
@keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); }
}

@keyframes glowPulse {
    0% { box-shadow: 0 0 0 0 rgba(56, 239, 125, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(56, 239, 125, 0); }
    100% { box-shadow: 0 0 0 0 rgba(56, 239, 125, 0); }
}

@keyframes slideDownArrow {
    0%, 100% { transform: translateY(-2px); }
    50% { transform: translateY(3px); }
}

/* === UPDATED: FULL SCREEN SPLASH VIDEO === */
#pwaSplash {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: #000; /* Dark background */
    z-index: 9999; display: none;
    align-items: center; justify-content: center; 
    overflow: hidden;
}

#pwaSplash video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover; /* This makes it full screen */
    z-index: 1;
}

#pwaSplash h2 {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    z-index: 2;
    text-shadow: 0 2px 10px rgba(0,0,0,0.7);
    animation: pulseIcon 2s infinite;
}

/* DOWNLOAD HUB */
.download-hub {
    margin-top: 5rem;
    padding: 3rem 1.5rem;
    background: rgba(0, 210, 255, 0.03);
    border-top: 1px solid rgba(0, 210, 255, 0.2);
    text-align: center;
}

.sci-fi-header {
    position: relative;
    display: inline-block;
    margin-bottom: 3rem;
}

.scanner-line {
    position: absolute;
    top: -10px; left: 0; width: 100%; height: 2px;
    background: #00d2ff;
    box-shadow: 0 0 15px #00d2ff;
    animation: scanMove 3s infinite linear;
}

.download-options {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.dl-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(0, 210, 255, 0.2);
    padding: 2rem;
    width: 200px;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    overflow: hidden;
}

.dl-card:hover {
    background: rgba(0, 210, 255, 0.1);
    transform: translateY(-5px);
    border-color: #00d2ff;
}

.corner-t-l { position: absolute; top: 0; left: 0; width: 15px; height: 15px; border-top: 2px solid #00d2ff; border-left: 2px solid #00d2ff; }
.corner-b-r { position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; border-bottom: 2px solid #00d2ff; border-right: 2px solid #00d2ff; }

.dl-icon { font-size: 2.5rem; color: #00d2ff; margin-bottom: 1rem; display: block; }

/* JARVIS MODAL */
.jarvis-modal {
    position: fixed; inset: 0; background: rgba(0, 10, 20, 0.95);
    z-index: 3000; display: none; align-items: center; justify-content: center;
    backdrop-filter: blur(15px); padding: 20px;
}

.jarvis-container {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid #00d2ff;
    max-width: 900px; width: 100%;
    padding: 2rem; border-radius: 5px;
    position: relative; box-shadow: 0 0 50px rgba(0, 210, 255, 0.2);
}

.jarvis-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
}

@media (max-width: 768px) {
    .jarvis-grid { grid-template-columns: 1fr; }
    .jarvis-visual { order: -1; }
}

.jarvis-info { text-align: left; }
.system-tag { font-size: 0.6rem; letter-spacing: 2px; color: #00d2ff; border: 1px solid #00d2ff; padding: 2px 8px; display: inline-block; margin-bottom: 1rem; }

.video-frame {
    margin: 20px 0; border: 1px solid rgba(255,255,255,0.1); padding: 5px; background: #000;
}
.video-frame iframe { width: 100%; aspect-ratio: 16/9; }
.frame-label { font-size: 0.6rem; color: #94a3b8; padding-bottom: 5px; }

.jarvis-dl-btn {
    display: flex; align-items: center; justify-content: space-between;
    background: #00d2ff; color: #000; padding: 15px 25px;
    text-decoration: none; font-weight: 800; clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
    transition: 0.3s;
}

.jarvis-dl-btn:hover { filter: brightness(1.2); transform: scale(1.02); }

/* LOGO ORBIT */
.jarvis-visual { display: flex; flex-direction: column; align-items: center; justify-content: center; }
.logo-orbit { position: relative; width: 200px; height: 200px; }
.jarvis-logo { width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 2px solid #00d2ff; }
.orbit-ring {
    position: absolute; inset: 0; border: 1px dashed #00d2ff; border-radius: 50%;
    animation: rotate 10s linear infinite;
}
.orbit-ring:nth-child(2) { inset: 20px; animation-direction: reverse; border-style: solid; border-width: 1px; border-color: rgba(0, 210, 255, 0.3); }

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes scanMove { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }

.modal-exit { position: absolute; top: -15px; right: -15px; background: #ff4757; border: none; color: white; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }

</style>
</head>
<body>

<div id="pwaSplash">
    <video id="splashVideo" autoplay playsinline>
        <source src="/logo.mp4" type="video/mp4">
    </video>
    <h2>Starting Neelaxmi...</h2>
</div>
    <button class="menu-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>
    
    <div id="installFloatBtn" class="install-float" onclick="installPWA()">
    <i class="fas fa-download"></i>
</div>

<div class="notification-nav">
    <div class="bell-container" onclick="toggleNotifPanel()">
        <i class="fas fa-bell"></i>
        <span class="badge" id="notifCount">0</span>
    </div>
    </div>
    <div class="notif-panel" id="notifPanel">
        <div class="notif-header">
            <span>Latest Updates</span>
            <i class="fas fa-sync-alt" style="font-size: 0.8rem; opacity: 0.7;"></i>
        </div>
        <div id="notifList">
            <p style="padding: 30px; color: #64748b; font-size: 0.85rem; text-align: center;">
                No new notifications yet.
            </p>
        </div>
    </div>

    <nav class="sidebar" id="sidebar">
        <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
        <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-comments"></i> DASHBOARD</a>
        <a href="#" class="nav-link" id="sidebarInstallBtn" onclick="installPWA(); return false;" style="display: none;">
           <i class="fas fa-mobile-alt"></i> Install App
        </a>
        <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
        <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
        <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
        <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
        <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
        <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
        <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

        <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
            © <span id="year"></span> TEAM SAKSEN
        </div>
    </nav>
    
    

    <main class="main-wrapper" id="mainContent">
       <header class="header-content">
         <img src="/pictures/neelaxmi.png" alt="Logo" class="header-logo">
             <div>
                <h1 class="title">NEELAXMI : THE HELPER </h1>
                <p class="subtitle">Curated by <span style="color: #00d2ff; font-weight: 600;">NEELAXMI & SAKEN</span></p>
             </div>
        </header>

        <div class="search-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="searchBar" class="search-input" placeholder="Search educator or subject...">
        </div>

        <div class="notifications-grid" id="notificationsContainer"></div>
        
        <section class="download-hub">
    <div class="sci-fi-header">
        <div class="scanner-line"></div>
        <h2><i class="fas fa-microchip"></i> DOWNLOAD OUR APP </h2>
        <p>Access the Neelaxmi  Interface across devices.</p>
    </div>
    
    <div class="download-options">
        <div class="dl-card" onclick="openDownloadModal('apk')">
            <div class="corner-t-l"></div><div class="corner-b-r"></div>
            <i class="fab fa-android dl-icon"></i>
            <span>DOWNLOAD APK</span>
            <small>v2.4.0 - Android OS</small>
        </div>
        <div class="dl-card" onclick="openDownloadModal('exe')">
            <div class="corner-t-l"></div><div class="corner-b-r"></div>
            <i class="fab fa-windows dl-icon"></i>
            <span>DOWNLOAD EXE</span>
            <small>v1.0.2 - Windows x64</small>
        </div>
    </div>
</section>

<div id="downloadModal" class="jarvis-modal">
    <div class="modal-scanner"></div>
    <div class="jarvis-container">
        <button class="modal-exit" onclick="closeDownloadModal()"><i class="fas fa-times"></i></button>
        
        <div class="jarvis-grid">
            <div class="jarvis-info">
                <div class="system-tag">DOWNLOAD OUR APP </div>
                <h2 id="modalAppName">NEELAXMI MOBILE</h2>
                <p class="app-desc">Synchronizing educator databases with real-time notification protocols. Experience the full power of NEELAXMI tools with zero latency.</p>
                
                <div class="video-frame">
                    <div class="frame-label">SYSTEM_TUTORIAL.mp4</div>
                    <iframe src="https://www.youtube.com/embed/0emvAqFTlaE" frameborder="0" allowfullscreen></iframe>
                </div>

                <a href="#" class="jarvis-dl-btn">
                    <span class="btn-glitch">INITIALIZE DOWNLOAD</span>
                    <i class="fas fa-download"></i>
                </a>
            </div>

            <div class="jarvis-visual">
                <div class="logo-orbit">
                    <div class="orbit-ring"></div>
                    <div class="orbit-ring"></div>
                    <img src="/pictures/neelaxmi.png" alt="App Logo" class="jarvis-logo">
                </div>
                <div class="status-bars">
                    <div class="bar"></div><div class="bar"></div><div class="bar"></div>
                </div>
            </div>
        </div>
    </div>
</div>

    </main>
    
    

    <div id="telegramModal" class="modal-backdrop">
        <div class="modal-card">
            <div class="modal-content-wrapper">
                <i class="fab fa-telegram modal-icon"></i>
                <h2 style="color: #fff; margin-bottom: 12px; font-weight: 800;">Join the SAKSEN Squad!</h2>
                <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 5px;">
                    Don't miss out on exclusive notes and direct updates from <b>NEELAXMI & SAKSHAM</b>.
                </p>
                
                <a href="https://telegram.me/saksen_main_bot" target="_blank" class="btn-join" onclick="closeModal()">
                    <span>Join Channel Now</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>

                <button onclick="closeModal()" class="btn-close">
                    Maybe later, I'll browse first
                </button>
            </div>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>

    <script>
        // === PWA LOGIC START ===
        
        // 1. Register Service Worker (Offline Capability)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW Registered'))
                    .catch(err => console.log('SW Fail:', err));
            });
        }

        // 2. Custom PWA Splash Screen Logic
        // This detects if the app is running in "standalone" mode (Installed App)
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    const splash = document.getElementById('pwaSplash');
    const video = document.getElementById('splashVideo');
    
    splash.style.display = 'flex';

    // This will hide the splash screen after 4 seconds
    // Adjust 4000 to match the exact length of your video in milliseconds
    setTimeout(() => {
        splash.style.transition = 'opacity 0.8s ease';
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 800);
    }, 4000); 
}
        // === PWA LOGIC END ===

        const firebaseConfig = {
            apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
            authDomain: "gallery-83144.firebaseapp.com",
            projectId: "gallery-83144",
            storageBucket: "gallery-83144.firebasestorage.app",
            messagingSenderId: "1005577519231",
            appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // UI Variables
        let unreadCount = 0;
        let isPanelOpen = false;

       // ==========================================
        // 2. DATA SOURCE (TEACHERS)
        // ==========================================
        const TEACHERS_DATA = [
            { name: "Ajay Sir", subject: "Chemistry", rank: "Super Six", description: "Specializes in Physical Chemistry. Known for high-yield concepts and zero-trick mastery.", imgUrl: "/pictures/akmsir.jpg" },
            { name: "Prateek Jain", subject: "Physics", rank: "BRUTAL ", description: "Zero tricks, 100% concepts. The ultimate guide for mastering Physics fundamentals.", imgUrl: "/pictures/pj.jpg" },
            { name: "SEEP MAM", subject: "BIOLOGY", rank: "QUEEN", description: "Beauty is not the only reason for fame sometimes it's just a free version of the brain.", imgUrl: "/pictures/seep.jpg" },
            { name: "Ramesh sharda", subject: "CHEMISTRY", rank: "SMART DADU", description: "AGE WITH EXPERIENCE NEVER GONNA FAIL.", imgUrl: "/pictures/rssir2.jpeg" },
            { name: "AMIT GUPTA SIR", subject: "BIOLOGY", rank: "PG IN UG", description: "The master of Zoology with years of legacy.", imgUrl: "/pictures/AGsir2.jpeg" },
            { name: "TEST SERIES", subject: "TEST SERIES", rank: "CHECK YOUR CAPACITY", description: "IF YOU ARE FLYING THEN IT HAVE POWER TO TAKE DOWN YOU TO EARTH.", imgUrl: "/pictures/neelaxmi.png" },
        ];

        // ==========================================
        // 3. CORE UI LOGIC
        // ==========================================
        const container = document.getElementById('notificationsContainer');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        function toggleSidebar() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
        }

        function renderCards(data) {
            container.innerHTML = data.map((teacher, index) => {
                const profileSlug = 'teachers/' + teacher.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';
                return `
                    <article class="teacher-card" style="animation: slideDown 0.5s ease forwards; animation-delay: ${index * 0.1}s; opacity: 0;">
                        <div class="rank-badge">${teacher.rank}</div>
                        <img class="avatar" src="${teacher.imgUrl}" onerror="this.src='https://ui-avatars.com/api/?name=${teacher.name}'">
                        <h3 style="font-size: 1.2rem;">${teacher.name}</h3>
                        <p style="color: #00d2ff; font-weight: 600; font-size: 0.8rem;">${teacher.subject}</p>
                        <div class="card-body">${teacher.description}</div>
                        <a href="${profileSlug}" class="btn-profile">View Profile <i class="fas fa-arrow-right" style="margin-left:8px;"></i></a>
                    </article>
                `;
            }).join('');
        }

        document.getElementById('searchBar').addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = TEACHERS_DATA.filter(t => 
                t.name.toLowerCase().includes(term) || t.subject.toLowerCase().includes(term)
            );
            renderCards(filtered);
        });

        // ==========================================
        // 4. NOTIFICATION LOGIC
        // ==========================================
        let lastOpenedTime = localStorage.getItem('saksen_notif_last_viewed');
        lastOpenedTime = lastOpenedTime ? parseInt(lastOpenedTime) : 0;

        function toggleNotifPanel() {
            const panel = document.getElementById('notifPanel');
            const badge = document.getElementById('notifCount');
            
            isPanelOpen = !isPanelOpen;
            
            if (isPanelOpen) {
                panel.style.display = 'flex';
                unreadCount = 0;
                badge.style.display = 'none';
                lastOpenedTime = Date.now();
                localStorage.setItem('saksen_notif_last_viewed', lastOpenedTime);
                setTimeout(() => {
                    document.querySelectorAll('.notif-item.new').forEach(el => {
                        el.classList.remove('new');
                        el.style.borderLeft = 'none';
                    });
                }, 2000);
            } else {
                panel.style.display = 'none';
            }
        }

        db.collection("notifications")
          .orderBy("timestamp", "desc") 
          .limit(20)
          .onSnapshot((snapshot) => {
            const list = document.getElementById('notifList');
            const badge = document.getElementById('notifCount');
            list.innerHTML = ''; 

            if (snapshot.empty) {
                list.innerHTML = `<p style="padding: 30px; color: #64748b; font-size: 0.85rem; text-align: center;">No new notifications.</p>`;
                return;
            }

            let currentUnread = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                let notifTimeMs = 0;
                let timeString = 'Just now';
                
                if (data.timestamp) {
                    notifTimeMs = data.timestamp.seconds * 1000;
                    timeString = new Date(notifTimeMs).toLocaleDateString([], {
                        month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                    });
                }

                const isNew = notifTimeMs > lastOpenedTime;
                if (isNew) currentUnread++;

                const div = document.createElement('div');
                div.className = `notif-item ${isNew ? 'new' : ''}`;

                const imgHtml = data.img ? 
                    `<img src="${data.img}" class="notif-banner" alt="Update">` : '';
                
                const btnHtml = data.link ? 
                    `<a href="${data.link}" target="_blank" class="notif-action-btn">
                        ${data.btnText || 'Check it out'} <i class="fas fa-arrow-right"></i>
                     </a>` : '';

                div.innerHTML = `
                    ${imgHtml}
                    <div class="notif-content-top">
                        <div class="notif-title">${data.title}</div>
                    </div>
                    <div class="notif-msg">${data.message}</div>
                    ${btnHtml}
                    <small class="notif-time">${timeString}</small>
                `;

                list.appendChild(div);
            });

            if (currentUnread > 0) {
                badge.innerText = currentUnread;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
            unreadCount = currentUnread;
        });
        
        
        
// === UPDATED PWA LOGIC ===
let deferredPrompt = null;
const installFloatBtn = document.getElementById('installFloatBtn');
const sidebarInstallBtn = document.getElementById('sidebarInstallBtn');

// 1. Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW Registered'))
            .catch(err => console.log('SW Fail:', err));
    });
}

// 2. Install Prompt Capture (The "App Store" Logic)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("PWA Install prompt captured.");
});
// 3. Install Function (Triggered by both buttons)
async function installPWA() {
    // Case 1: Agar browser support karta hai aur prompt ready hai
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    } 
    // Case 2: Agar browser incapable hai (iOS ya Unsupported Browsers)
    else {
        showManualInstallInstructions();
    }
}

function showManualInstallInstructions() {
    // Forceful alert/modal for users on iPhone or old browsers
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        alert("Neelaxmi App Install Karein:\n\n1. Browser ke 'Share' button par click karein (Bottom bar).\n2. Thoda niche scroll karein aur 'Add to Home Screen' select karein.");
    } else {
        alert("Install Guide:\n\n1. Browser ke menu (3 dots ⋮) par click karein.\n2. 'Install App' ya 'Add to Home Screen' par tap karein.");
    }
}

// 4. Splash Screen Logic (Fullscreen + Sound)
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    const splash = document.getElementById('pwaSplash');
    const video = document.getElementById('splashVideo');
    
    splash.style.display = 'flex'; // Show Splash

    // Attempt to play with sound
    // Note: Some browsers block audio without a user click. 
    // We try to play; if it fails, we catch it.
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started!
        })
        .catch(error => {
            // Auto-play was prevented. 
            // Fallback: Mute and play if audio is blocked
            video.muted = true;
            video.play();
        });
    }

    // Hide splash after video ends or 4 seconds
    setTimeout(() => {
        splash.style.transition = 'opacity 0.8s ease';
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 800);
    }, 4500); // 4.5 seconds
}     
        // ==========================================
        // 5. MODAL & STARTUP
        // ==========================================
        function closeModal() {
            document.getElementById('telegramModal').style.display = 'none';
            localStorage.setItem('telegram_modal_timestamp', Date.now());
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('year').textContent = new Date().getFullYear();
            renderCards(TEACHERS_DATA);

            const lastInteraction = localStorage.getItem('telegram_modal_timestamp');
            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
            const now = Date.now();

            if (!lastInteraction || (now - lastInteraction) > oneWeekInMs) {
                setTimeout(() => { 
                    document.getElementById('telegramModal').style.display = 'flex'; 
                }, 3000);
            }
        });
        
        // ==========================================
        // Download modal 
        // ==========================================


function openDownloadModal(type) {
    const modal = document.getElementById('downloadModal');
    const nameText = document.getElementById('modalAppName');
    const dlBtn = document.querySelector('.jarvis-dl-btn'); // Select the download button

    modal.style.display = 'flex';

    if(type === 'apk') {
        nameText.innerText = "NEELAXMI ANDROID INTERFACE";
        dlBtn.href = "/downloads/neelaxmi_v2.4.apk"; // Path to your APK
    } else {
        nameText.innerText = "NEELAXMI DESKTOP CORE";
        dlBtn.href = "/downloads/neelaxmi_setup.exe"; // Path to your EXE
    }
}
        
        
        function closeDownloadModal() {
            document.getElementById('downloadModal').style.display = 'none';
            
        }
        
        window.onclick = function(event) {
            const modal = document.getElementById('downloadModal');
            if (event.target == modal) {
                closeDownloadModal();
            }
}

    </script>
</body>
</html>

================================================================================
// File: manifest (1).json
================================================================================
{
  "name": "NEELAXMI: THE HELPER",
  "short_name": "Neelaxmi",
  "start_url": "Index.html",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#00d2ff",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/pictures/neelaxmi.jpg",
      "sizes": "192x192",
      "type": "image/jpeg",
      "purpose": "any"
    },
    {
      "src": "/pictures/neelaxmi.jpg",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "any"
    },
    {
      "src": "/pictures/neelaxmi.jpg",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "maskable"
    }
  ]
}

================================================================================
// File: manifest.json
================================================================================
{
  "name": "NEELAXMI: THE HELPER",
  "short_name": "Neelaxmi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#00d2ff",
  "orientation": "any",
  "icons": [
    {
      "src": "logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}

================================================================================
// File: neelaxmi.txt
================================================================================
If I tell you my company then it's for the students who want to success ,  for the  citizen who want security in emergency let's tell you in detail ...  our company name - neelaxmi , it's substitute 
1. Neelaxmi -:  the helper (working)
        tag line -: When some clicks give you the best version of study library
        features - : best and free resources for study 
2. neelaxmi -: The abhyam (working  )
        tag line -:  when every second matter for you
        features -: creating a app to detect the risk and work auto emergence 24 /7 
                    this app willl take login and when user press the emergency on fiktered type then it will connect all ther3 volunteers near the 200 m , and send request all the users and the user who reach then give them the prize money . 
                    if user call medical emergencies then is also send the alert to nears ambulance and hospitals authorty , police 
                    this app will work with police and gov , but have its database separate 
                     app willrecord all the situations so that work as proof on court also
                     
                     this will work beyond mob leaching so that person who call the emergency is toaly depend for all this cases and penalties 
                     
                     - 
3. neelaxmi -: the quizland (active )
        tag line -: when practice make man perfect 
        features -: free resoruces for lakhs of question and there solutions in all   formate vedio , auido , pdf 
        
4. neelaxmi -: the annpurna(dream project) 
         tag line -: when food is on your fingers
         features -: give food to the 20 cr people , who slept without eating food
          
5.neelaxmi-: The woman (dream project)
         tag line -: when each woman is have power to rise 
         features -: anti rapist team , see and kill , reach within 2 min to that woman who is in risk
         
 owner  -: saksham

================================================================================
// File: offline.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You are Offline | Neelaxmi</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            background: #0f172a;
            color: #fff;
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }
        .icon {
            font-size: 4rem;
            color: #64748b;
            margin-bottom: 20px;
        }
        h1 { margin-bottom: 10px; color: #00d2ff; }
        p { color: #94a3b8; margin-bottom: 30px; }
        .btn {
            padding: 12px 24px;
            background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="icon">📡</div>
    <h1>No Internet Connection</h1>
    <p>You need an active internet connection to access the dashboard and updates.</p>
    <a href="/index.html" class="btn">Try Again</a>
</body>
</html>

================================================================================
// File: onesignalsdkworker.js
================================================================================
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

================================================================================
// File: pictures/Po
================================================================================


================================================================================
// File: pictures/educator.txt
================================================================================
        const educatorList = [
            { id: 'ajay_mishra', name: 'Ajay Mishra (AKM)' },
            { id: 'ramesh_sharda', name: 'Ramesh Sharda' },
            { id: 'prateek_jain', name: 'Prateek Jain' } ,
            { id: 'seep_mam', name: 'SEEP PAHUJA'  } ,
            { id: 'PRANAV_SIR', name: 'PRANAV SIR '  } ,
            { id: 'AMIT_GUPTA', name: 'AMIT GUPTA'  } ,
            { id: 'TEST_SERIES', name: 'TEST SERIES '  } ,
            { id: 'RAKSHITA_MAM', name: 'RAKSHITA SINGH'  } 




        ];

================================================================================
// File: quiz/Nhu
================================================================================


================================================================================
// File: quiz/auth.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Sign Up | NEELAXMI QUIZ CENTER</title>
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#6366f1',
                        darkBg: '#0f172a'
                    }
                }
            }
        }
    </script>

    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass-effect {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dark .glass-effect {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
    </style>
</head>
<body class="bg-slate-50 dark:bg-darkBg min-h-screen flex items-center justify-center p-4 transition-colors duration-300">

    <div id="loading-screen" class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-darkBg transition-opacity duration-300">
        <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600"></div>
            <img src="/pictures/neelaxmi.jpg" class="absolute inset-0 m-auto h-8 w-8 rounded-full">
        </div>
    </div>

    <div class="w-full max-w-md">
        <div class="text-center mb-8">
            <img src="/pictures/neelaxmi.jpg" alt="Logo" class="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-xl">
            <h1 id="auth-title" class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Login to QuizMaster</h1>
            <p class="text-slate-500 dark:text-slate-400 mt-2">Neelaxmi Quiz Center & Excellence Hub</p>
        </div>

        <div id="auth-box" class="glass-effect rounded-3xl shadow-2xl p-8 hidden">
            <div class="space-y-5">
                
                <div id="registration-fields" class="hidden space-y-5">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 ml-1">Full Name</label>
                        <input type="text" id="auth-name" placeholder="John Doe" 
                            class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 ml-1">Username</label>
                        <input type="text" id="auth-username" placeholder="johndoe_123" 
                            class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 ml-1">Class / Standard</label>
                        <select id="auth-class" class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                            <option value="">Select Class</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                            <option value="12+">Class 12+ (Dropper)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 ml-1">Email Address</label>
                    <input type="email" id="auth-email" placeholder="name@example.com" 
                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 ml-1">Password</label>
                    <input type="password" id="auth-password" placeholder="••••••••" 
                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                </div>

                <div id="auth-gemini-key-container" style="display: none;">
                    <div class="flex justify-between items-center mb-1 ml-1">
                        <label class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Gemini API Key</label>
                        <button id="why-gemini-btn" class="text-[10px] text-indigo-500 hover:underline font-bold">What is this?</button>
                    </div>
                    <input type="password" id="auth-gemini-key" placeholder="Enter API key (Optional)" 
                        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition">
                </div>

                <div id="auth-error" class="hidden p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center border border-red-100 dark:border-red-900/30"></div>

                <button id="auth-primary-btn" class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-1">
                    Sign In
                </button>

                <div class="text-center mt-6">
                    <button id="auth-toggle-mode" class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">
                        Don't have an account? <span class="text-indigo-600">Sign Up</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="error-message-area" class="hidden text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
            <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4"></i>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h2>
            <p id="error-text" class="text-slate-500 dark:text-slate-400 mb-6 text-sm"></p>
            <a href="dashboard2.html" class="inline-block px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl transition">Go to Dashboard</a>
        </div>
    </div>

    <div id="why-gemini-modal" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Explanations</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                The Gemini key allows us to provide instant, personalized AI explanations for every question. Your key is stored locally in your browser and never on our servers.
            </p>
            <div class="flex flex-col gap-3">
                <a href="https://aistudio.google.com/app/apikey" target="_blank" class="w-full py-3 text-center bg-indigo-600 text-white font-bold rounded-xl">Get Free Key</a>
                <button id="close-why-gemini-modal" class="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl">Close</button>
            </div>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    
    <script src="auth.js"></script>

    <script>
        // Dark Mode Initialization
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    
    <script>
    // Redirect logic: Run whenever auth state changes
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("User detected, checking destination...");
            
            // Check if the user is trying to access a specific quiz via URL params
            const params = new URLSearchParams(window.location.search);
            const quizId = params.get('uid');

            // If there is NO quiz ID in the URL, send them to the main dashboard
            if (!quizId) {
                window.location.href = 'dashboard.html';
            } else {
                console.log("Quiz ID detected, staying on auth page to load quiz logic.");
            }
        }
    });
</script>
</body>
</html>

================================================================================
// File: quiz/auth.js
================================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAOJmK4igVb_P8cV6jLfZhFPGFmAZfVvRE",
    authDomain: "quiznew-30700.firebaseapp.com",
    projectId: "quiznew-30700",
    storageBucket: "quiznew-30700.firebasestorage.app",
    messagingSenderId: "107821881642",
    appId: "1:107821881642:web:7d708bda99196c85e42653",
    measurementId: "G-0B6095T5X7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let CURRENT_USER_ID = null;
let currentQuizId = null;
let isLoginMode = true;
let userGeminiApiKey = null;
let userData = null;


const authEls = {
    authBox: document.getElementById('auth-box'),
    authEmail: document.getElementById('auth-email'),
    authPassword: document.getElementById('auth-password'),
    authGeminiKey: document.getElementById('auth-gemini-key'),
    authName: document.getElementById('auth-name'),
    authClass: document.getElementById('auth-class'),
    authUsername: document.getElementById('auth-username'),
    registrationFields: document.getElementById('registration-fields'), 
    authGeminiKeyContainer: document.getElementById('auth-gemini-key-container'),
    whyGeminiBtn: document.getElementById('why-gemini-btn'),
    whyGeminiModal: document.getElementById('why-gemini-modal'),
    closeWhyGeminiModal: document.getElementById('close-why-gemini-modal'),
    
    authBtn: document.getElementById('auth-primary-btn'),
    authError: document.getElementById('auth-error'),
    authToggle: document.getElementById('auth-toggle-mode'),
    loader: document.getElementById('loading-screen'),
};


const showWhyGeminiModal = () => {
    if (authEls.whyGeminiModal) authEls.whyGeminiModal.classList.remove('hidden');
};

const hideWhyGeminiModal = () => {
    if (authEls.whyGeminiModal) authEls.whyGeminiModal.classList.add('hidden');
};

if (authEls.whyGeminiBtn) authEls.whyGeminiBtn.onclick = showWhyGeminiModal;
if (authEls.closeWhyGeminiModal) authEls.closeWhyGeminiModal.onclick = hideWhyGeminiModal;


authEls.authToggle.onclick = () => {
    isLoginMode = !isLoginMode;
    authEls.authBox.querySelector('#auth-title').textContent = isLoginMode ? 'Login to QuizMaster' : 'Register for QuizMaster';
    authEls.authBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
    authEls.authError.classList.add('hidden');
    
    if (authEls.authGeminiKeyContainer) {
        authEls.authGeminiKeyContainer.style.display = isLoginMode ? 'none' : 'block';
    }
    if (authEls.registrationFields) {
        authEls.registrationFields.classList.toggle('hidden', isLoginMode);
    }
};
if (authEls.authGeminiKeyContainer) authEls.authGeminiKeyContainer.style.display = isLoginMode ? 'none' : 'block';

authEls.authBtn.onclick = async () => {
    authEls.authError.classList.add('hidden');
    
    const email = authEls.authEmail.value;
    const password = authEls.authPassword.value;
    const geminiKey = authEls.authGeminiKey ? authEls.authGeminiKey.value.trim() : '';
    
    const name = authEls.authName ? authEls.authName.value.trim() : '';
    const userClass = authEls.authClass ? authEls.authClass.value : '';
    const username = authEls.authUsername ? authEls.authUsername.value.trim() : '';
    
    try {
        if (isLoginMode) {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            const usernameCheck = await db.collection('users').where('username', '==', username).get();
            if (!usernameCheck.empty) {
                throw new Error("Username already taken. Please choose another.");
            }
            
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            
            const newUserProfile = {
                uid: userId,
                name: name,
                class: userClass,
                username: username,
                email: email,
                bookmarks: [], 
                geminiApiKey: geminiKey || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('users').doc(userId).set(newUserProfile);
            console.log("✅ Success: New user registered with full profile.");
        }
    } catch (e) {
        authEls.authError.textContent = e.message;
        authEls.authError.classList.remove('hidden');
        console.error("❌ Error: Authentication Failed:", e.message);
    }
};

auth.onAuthStateChanged(user => {
    if (user) {
        CURRENT_USER_ID = user.uid;
        authEls.authBox.classList.add('hidden');
        
        db.collection('users').doc(CURRENT_USER_ID).onSnapshot(doc => {
            if (doc.exists) {
                userData = doc.data();
                userGeminiApiKey = userData.geminiApiKey;
                console.log("✅ User profile loaded/updated.");
            } else {
                console.warn("⚠️ No user profile found.");
            }
        }, e => {
            console.error("❌ Error fetching user data.", e);
        });
        
        const params = new URLSearchParams(window.location.search);
        currentQuizId = params.get('uid');
        
        if (currentQuizId) {
            if (typeof loadQuiz !== 'undefined') loadQuiz(currentQuizId);
        } else {
            const errorArea = document.getElementById('error-message-area');
            if (errorArea) {
                document.getElementById('error-text').textContent = "Quiz ID is missing from the URL.";
                errorArea.classList.remove('hidden');
            }
            authEls.loader.classList.remove('hidden');
        }
    } else {
        authEls.loader.classList.add('hidden');
        authEls.authBox.classList.remove('hidden');
    }
});

window.toggleBookmark = async (questionId) => {
    if (!CURRENT_USER_ID) return;
    const userRef = db.collection('users').doc(CURRENT_USER_ID);
    const isBookmarked = userData.bookmarks && userData.bookmarks.includes(questionId);
    
    try {
        if (isBookmarked) {
            await userRef.update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(questionId)
            });
            console.log("Bookmark removed.");
        } else {
            await userRef.update({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(questionId)
            });
            console.log("Bookmark added.");
        }
    } catch (e) {
        console.error("Error toggling bookmark:", e);
    }
};

================================================================================
// File: quiz/dashboard.html
================================================================================
<!DOCTYPE html>
<html lang="en" class="transition-colors duration-300">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard | NEELAXMI QUIZ CENTER</title>
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { 
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif']
                    },
                    colors: {
                        primary: '#6366f1',
                        primaryHover: '#4f46e5',
                        darkBg: '#0f172a',
                        gold: '#fbbf24'
                    }
                }
            }
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <style>
        .glass-panel {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        .dark .glass-panel {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: #f1f5f9;
        }
        /* Scrollbar for modal lists */
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .dark .custom-scroll::-webkit-scrollbar-thumb { background: #475569; }
    </style>
</head>
<body class="bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 min-h-screen relative">

    <div id="loading-screen" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-darkBg transition-opacity duration-300">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <h2 id="loading-text" class="text-xl font-semibold animate-pulse">Loading Your Journey...</h2>
    </div>

    <div id="mandatory-profile-modal" class="fixed inset-0 z-[70] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-red-500 relative">
            <h3 class="text-2xl font-bold text-red-500 mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Action Required</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">Please complete your profile to access the dashboard.</p>
            
            <form id="mandatory-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-bold mb-1">Full Name</label>
                    <input type="text" id="req-name" class="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" required>
                </div>
                <div>
                    <label class="block text-sm font-bold mb-1">Username</label>
                    <input type="text" id="req-username" class="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" required>
                </div>
                <div>
                    <label class="block text-sm font-bold mb-1">Class / Standard</label>
                    <select id="req-class" class="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" required>
                        <option value="" disabled selected>Select Class</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="12+">Class 12+ (Dropper)</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primaryHover transition">Update Profile</button>
            </form>
        </div>
    </div>

    <nav class="fixed top-0 w-full z-50 glass-panel border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <img src="/pictures/neelaxmi.jpg" alt="Logo" class="h-8 w-8 rounded-full mr-3 border border-slate-300">
                    <span class="font-bold text-xl tracking-tight text-primary">NEELAXMI DASHBOARD</span>
                </div>
                <div class="flex items-center gap-4">
                    <button onclick="window.location.href='/index.html'" class="text-sm font-medium hover:text-primary transition"><i class="fa-solid fa-house mr-1"></i> Home</button>
                    <button id="theme-toggle" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                        <i class="fa-solid fa-moon dark:hidden"></i>
                        <i class="fa-solid fa-sun hidden dark:inline"></i>
                    </button>
                    <button id="logout-btn" class="text-sm font-bold text-red-500 hover:text-red-600 transition"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
                </div>
            </div>
        </div>
    </nav>

    <main class="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
                <div class="flex items-start justify-between relative z-10">
                    <div>
                        <h1 class="text-2xl font-bold mb-1">Welcome, <span id="disp-name" class="text-primary">Student</span>!</h1>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mb-4" id="disp-email">loading...</p>
                        <span id="disp-badge" class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Class --</span>
                    </div>
                    <button onclick="toggleEditProfile()" class="text-slate-400 hover:text-primary transition"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
                
                <div class="mt-6 flex flex-col gap-2">
                    <div class="flex justify-between text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span class="text-slate-500">Username:</span>
                        <span class="font-mono font-medium" id="disp-username">--</span>
                    </div>
                    <div class="flex justify-between text-sm items-center pt-1">
                        <span class="text-slate-500">Gemini AI:</span>
                        <span id="gemini-status" class="text-xs font-bold">Checking...</span>
                    </div>
                    <button onclick="document.getElementById('gemini-modal').classList.remove('hidden')" class="text-xs text-primary underline mt-1 text-left">Update Key</button>
                </div>
            </div>

            <div class="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
                <div class="relative z-10">
                    <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center justify-center lg:justify-start">
                        <i class="fa-solid fa-bullseye mr-2 text-primary"></i> 
                        <span id="countdown-label">Target Exam</span>
                    </h3>
                    <div class="grid grid-cols-4 gap-4 text-center">
                        <div class="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span class="block text-2xl md:text-4xl font-bold text-primary" id="cd-days">00</span>
                            <span class="text-xs text-slate-500 uppercase">Days</span>
                        </div>
                        <div class="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span class="block text-2xl md:text-4xl font-bold text-primary" id="cd-hours">00</span>
                            <span class="text-xs text-slate-500 uppercase">Hours</span>
                        </div>
                        <div class="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span class="block text-2xl md:text-4xl font-bold text-primary" id="cd-mins">00</span>
                            <span class="text-xs text-slate-500 uppercase">Mins</span>
                        </div>
                        <div class="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <span class="block text-2xl md:text-4xl font-bold text-primary" id="cd-secs">00</span>
                            <span class="text-xs text-slate-500 uppercase">Secs</span>
                        </div>
                    </div>
                    <p class="text-center text-xs text-slate-400 mt-4 italic">"Time flows. Make it count."</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="glass-panel p-5 rounded-xl border-l-4 border-blue-500">
                <p class="text-xs text-slate-500 uppercase font-bold">Total Attempts</p>
                <p class="text-2xl font-bold mt-1" id="stat-total-tests">0</p>
            </div>
            <div class="glass-panel p-5 rounded-xl border-l-4 border-green-500">
                <p class="text-xs text-slate-500 uppercase font-bold">Overall Accuracy</p>
                <p class="text-2xl font-bold mt-1" id="stat-accuracy">0%</p>
            </div>
            <div class="glass-panel p-5 rounded-xl border-l-4 border-purple-500">
                <p class="text-xs text-slate-500 uppercase font-bold">Questions Solved</p>
                <p class="text-2xl font-bold mt-1" id="stat-questions">0</p>
            </div>
            <div class="glass-panel p-5 rounded-xl border-l-4 border-orange-500">
                <p class="text-xs text-slate-500 uppercase font-bold">Avg Time/Q</p>
                <p class="text-2xl font-bold mt-1" id="stat-time">0s</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="glass-panel p-6 rounded-2xl lg:col-span-2">
                <h3 class="font-bold text-lg mb-4">Overall Performance History</h3>
                <div class="h-64 w-full">
                    <canvas id="scoreChart"></canvas>
                </div>
            </div>
            <div class="glass-panel p-6 rounded-2xl">
                <h3 class="font-bold text-lg mb-4">Accuracy Split</h3>
                <div class="h-64 w-full flex items-center justify-center">
                    <canvas id="accuracyChart"></canvas>
                </div>
            </div>
        </div>

        <div class="glass-panel p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-900 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 p-10 opacity-10"><i class="fa-solid fa-certificate text-9xl"></i></div>
            <div class="relative z-10">
                <h2 class="text-2xl font-bold mb-2">Claim Your Progress Certificate</h2>
                <p class="text-slate-300 mb-6 max-w-2xl">Generate an official certificate acknowledging your hard work, total questions attempted, and dedication.</p>
                <button onclick="generateCertificate()" class="px-6 py-3 bg-gold hover:bg-yellow-500 text-slate-900 font-bold rounded-lg shadow-lg transition transform hover:-translate-y-1">
                    <i class="fa-solid fa-file-pdf mr-2"></i> Open Certificate (PDF)
                </button>
            </div>
        </div>

        <div class="glass-panel rounded-2xl overflow-hidden">
            <div class="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 class="font-bold text-lg"><i class="fa-solid fa-list-check mr-2 text-primary"></i>Chapter-wise Performance</h3>
                <p class="text-xs text-slate-500 mt-1">Your attempts are grouped by chapter. Click 'View History' to see specific graphs and details.</p>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300 uppercase font-bold text-xs">
                        <tr>
                            <th class="p-4">Chapter / Quiz Title</th>
                            <th class="p-4">Attempts</th>
                            <th class="p-4">Latest Score</th>
                            <th class="p-4">Best Score</th>
                            <th class="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody id="history-table-body" class="divide-y divide-slate-100 dark:divide-slate-700">
                        </tbody>
                </table>
                <div id="no-history-msg" class="p-8 text-center text-slate-400 hidden">No test history found. Go take a quiz!</div>
            </div>
        </div>

    </main>

    <div id="chapter-history-modal" class="fixed inset-0 z-[85] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-700">
            <div class="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <div>
                    <h3 class="text-lg font-bold text-primary" id="ch-modal-title">Chapter Title</h3>
                    <p class="text-xs text-slate-500">Detailed Analysis</p>
                </div>
                <button onclick="closeChapterModal()" class="text-slate-400 hover:text-white transition bg-slate-200 dark:bg-slate-700 rounded-full w-8 h-8 flex items-center justify-center">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="p-6 overflow-y-auto custom-scroll flex-grow">
                
                <div class="mb-6 h-64 w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <canvas id="chapterChart"></canvas>
                </div>

                <h4 class="font-bold text-sm uppercase text-slate-500 mb-3">All Attempts</h4>
                <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-100 dark:bg-slate-700 text-xs font-bold uppercase text-slate-500">
                            <tr>
                                <th class="p-3">Date</th>
                                <th class="p-3">Score</th>
                                <th class="p-3">Accuracy</th>
                                <th class="p-3 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody id="ch-modal-list" class="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="result-modal" class="fixed inset-0 z-[90] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-0 overflow-hidden border border-slate-700">
            <div class="bg-slate-100 dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-bold text-primary" id="modal-quiz-title">Quiz Result</h3>
                    <p class="text-xs text-slate-500" id="modal-date">Date</p>
                </div>
                <button onclick="closeResultModal()" class="text-slate-400 hover:text-white transition"><i class="fa-solid fa-xmark text-xl"></i></button>
            </div>
            
            <div class="p-8 grid grid-cols-2 gap-6">
                <div class="col-span-2 flex flex-col items-center justify-center mb-4">
                    <div class="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-slate-200 dark:border-slate-700">
                        <div class="text-center">
                            <span class="block text-3xl font-bold text-primary" id="modal-score">0</span>
                            <span class="text-xs uppercase text-slate-500">Score</span>
                        </div>
                    </div>
                </div>
                <div class="bg-green-500/10 p-4 rounded-xl border border-green-500/20 text-center">
                    <i class="fa-solid fa-check text-green-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-green-500" id="modal-correct">0</div>
                    <div class="text-xs text-slate-400 uppercase">Correct</div>
                </div>
                <div class="bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-center">
                    <i class="fa-solid fa-xmark text-red-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-red-500" id="modal-incorrect">0</div>
                    <div class="text-xs text-slate-400 uppercase">Incorrect</div>
                </div>
                <div class="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                    <i class="fa-solid fa-clock text-blue-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-blue-500" id="modal-time">0s</div>
                    <div class="text-xs text-slate-400 uppercase">Time Taken</div>
                </div>
                <div class="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                    <i class="fa-solid fa-percent text-purple-500 text-xl mb-2"></i>
                    <div class="text-2xl font-bold text-purple-500" id="modal-accuracy">0%</div>
                    <div class="text-xs text-slate-400 uppercase">Accuracy</div>
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900/50 p-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700">
                <button onclick="closeResultModal()" class="px-5 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">Close</button>
            </div>
        </div>
    </div>

    <div id="certificate-container" style="display: none; position: absolute; left: -9999px; top: -9999px; width: 1123px; height: 794px; background: white;">
        <div class="w-full h-full border-[20px] border-double border-indigo-900 p-12 relative flex flex-col items-center justify-center bg-slate-50" style="font-family: serif;">
            <img src="/pictures/neelaxmi.jpg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; opacity: 0.04; filter: grayscale(100%); pointer-events: none;">
            
            <div style="text-align: center; margin-bottom: 2rem; position: relative; z-index: 10;">
                <img src="/pictures/neelaxmi.jpg" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #312e81; margin: 0 auto 1rem auto; display: block;">
                <h1 style="font-size: 3.5rem; color: #312e81; font-weight: bold; margin-bottom: 0.5rem; letter-spacing: 2px;">CERTIFICATE</h1>
                <h2 style="font-family: sans-serif; font-size: 1.5rem; color: #d97706; font-weight: bold; letter-spacing: 5px; text-transform: uppercase;">Of Achievement</h2>
            </div>
            
            <p style="font-size: 1.25rem; color: #475569; margin-bottom: 0.5rem; font-style: italic;">This is to certify that</p>
            <h3 id="cert-name" style="font-size: 2.5rem; font-weight: bold; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding: 0 40px 10px 40px; margin-bottom: 2rem; display: inline-block;">Student Name</h3>
            
            <p style="font-family: sans-serif; font-size: 1.1rem; line-height: 1.8; color: #334155; max-width: 800px; text-align: center; margin-bottom: 3rem;">
                Has demonstrated exceptional dedication and consistency at <strong style="color: #312e81;">NEELAXMI & SAKSEN</strong>.
                They have successfully attempted <strong id="cert-questions">0</strong> questions across <strong id="cert-tests">0</strong> assessment sessions,
                achieving a cumulative accuracy of <strong id="cert-accuracy">0%</strong>.
            </p>
            
            <div style="display: flex; justify-content: space-between; width: 100%; padding: 0 80px; margin-top: 2rem;">
                <div style="text-align: center;">
                    <p id="cert-date" style="font-family: sans-serif; font-weight: bold; color: #475569; border-top: 1px solid #94a3b8; padding-top: 10px; min-width: 150px;">Date</p>
                </div>
                <div style="text-align: center;">
                    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #312e81; margin-bottom: 5px; font-weight: bold;">Saksen Owner</div>
                    <p style="font-family: sans-serif; font-weight: bold; color: #475569; border-top: 1px solid #94a3b8; padding-top: 10px; min-width: 150px;">Signature</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; font-size: 0.8rem; color: #94a3b8; font-family: sans-serif;">
                Verified ID: <span id="cert-id">UNKNOWN</span> • Generated via Neelaxmi Quiz Center
            </div>
        </div>
    </div>

    <div id="edit-profile-modal" class="fixed inset-0 z-[80] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 class="text-xl font-bold mb-4">Edit Profile</h3>
            <div class="space-y-3">
                <input type="text" id="edit-name" placeholder="Full Name" class="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                <select id="edit-class" class="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                     <option value="11">Class 11</option>
                     <option value="12">Class 12</option>
                     <option value="12+">Class 12+ (Dropper)</option>
                </select>
            </div>
            <div class="flex justify-end gap-3 mt-6">
                <button onclick="toggleEditProfile()" class="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">Cancel</button>
                <button onclick="saveProfileChanges()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover">Save</button>
            </div>
        </div>
    </div>

    <div id="gemini-modal" class="fixed inset-0 z-[80] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 class="text-xl font-bold mb-4">Update Gemini API Key</h3>
            <input type="password" id="input-gemini-key" placeholder="Paste API Key here" class="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 mb-4">
            <div class="flex justify-end gap-3">
                <button onclick="document.getElementById('gemini-modal').classList.add('hidden')" class="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button onclick="updateGeminiKey()" class="px-4 py-2 bg-primary text-white rounded-lg">Update</button>
            </div>
        </div>
    </div>

<div id="pdf-viewer-modal" class="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-700">
        <div class="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
            <h3 class="text-lg font-bold text-primary flex items-center">
                <i class="fa-solid fa-certificate mr-2"></i> Certificate Preview
            </h3>
            <div class="flex gap-3">
                <button id="btn-download-pdf" class="px-5 py-2 bg-primary hover:bg-primaryHover text-white text-sm font-bold rounded-lg transition shadow-lg flex items-center">
                    <i class="fa-solid fa-download mr-2"></i> Save PDF
                </button>
                <button onclick="closePdfModal()" class="text-slate-400 hover:text-white transition bg-slate-200 dark:bg-slate-700 rounded-full w-9 h-9 flex items-center justify-center">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
        </div>
        
        <div class="flex-grow bg-slate-200 dark:bg-slate-900/50 p-4 overflow-auto flex items-center justify-center">
            <img id="cert-preview-image" class="max-w-full h-auto rounded shadow-lg bg-white" src="" alt="Certificate Preview">
        </div>
        <p class="text-center text-xs py-2 text-slate-500 bg-slate-100 dark:bg-slate-900">Long press image to save directly if download button fails</p>
    </div>
</div>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    
    <script>
        // --- FIREBASE INIT ---
        const firebaseConfig = {
            apiKey: "AIzaSyAOJmK4igVb_P8cV6jLfZhFPGFmAZfVvRE",
            authDomain: "quiznew-30700.firebaseapp.com",
            projectId: "quiznew-30700",
            storageBucket: "quiznew-30700.firebasestorage.app",
            messagingSenderId: "107821881642",
            appId: "1:107821881642:web:7d708bda99196c85e42653",
            measurementId: "G-0B6095T5X7"
        };
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore()

        let currentUser = null;
        let userStats = { totalTests: 0, totalQuestions: 0, totalCorrect: 0, totalIncorrect: 0, totalTime: 0 };
        
        // Data Structures
        let groupedHistory = {}; // Key: QuizTitle, Value: Array of Attempts
        let rawHistoryData = {}; // Key: ID, Value: Attempt Data (for direct lookup)
        let chapterChartInstance = null; // To manage destroying old chart in modal

        // --- AUTH & DATA LOADING ---
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                currentUser = user;
                await loadUserProfile(user.uid);
                await loadUserHistory(user.uid);
                document.getElementById('loading-screen').classList.add('hidden');
            } else {
                window.location.href = '/quiz/auth.html';
            }
        });

        document.getElementById('logout-btn').onclick = () => auth.signOut();

        // --- PROFILE LOGIC ---
        async function loadUserProfile(uid) {
            const doc = await db.collection('users').doc(uid).get();
            if (!doc.exists) {
                document.getElementById('mandatory-profile-modal').classList.remove('hidden');
                return;
            }
            const data = doc.data();
            
            if (!data.name || !data.class || !data.username) {
                document.getElementById('mandatory-profile-modal').classList.remove('hidden');
                document.getElementById('req-name').value = data.name || '';
                document.getElementById('req-username').value = data.username || '';
            }

            updateProfileUI(data);
            initCountdown(data.class); 
        }

        function updateProfileUI(data) {
            document.getElementById('disp-name').textContent = data.name || 'User';
            document.getElementById('disp-email').textContent = data.email;
            document.getElementById('disp-badge').textContent = `Class ${data.class || 'N/A'}`;
            document.getElementById('disp-username').textContent = data.username || 'Not Set';
            
            const gStatus = document.getElementById('gemini-status');
            if (data.geminiApiKey) {
                gStatus.innerHTML = '<i class="fa-solid fa-circle-check mr-1"></i> Active';
                gStatus.className = 'flex items-center text-green-500 font-bold text-xs';
            } else {
                gStatus.innerHTML = '<i class="fa-solid fa-circle-xmark mr-1"></i> Inactive';
                gStatus.className = 'flex items-center text-red-500 font-bold text-xs';
            }
        }

        document.getElementById('mandatory-form').onsubmit = async (e) => {
            e.preventDefault();
            const name = document.getElementById('req-name').value;
            const uClass = document.getElementById('req-class').value;
            const username = document.getElementById('req-username').value;
            try {
                await db.collection('users').doc(currentUser.uid).set({
                    name, class: uClass, username
                }, { merge: true });
                document.getElementById('mandatory-profile-modal').classList.add('hidden');
                loadUserProfile(currentUser.uid); 
            } catch (err) {
                alert("Error updating profile: " + err.message);
            }
        };

        function toggleEditProfile() {
            document.getElementById('edit-profile-modal').classList.toggle('hidden');
        }

        async function saveProfileChanges() {
            const name = document.getElementById('edit-name').value;
            const uClass = document.getElementById('edit-class').value;
            if(!name || !uClass) return alert("Please fill details");
            try {
                await db.collection('users').doc(currentUser.uid).update({ name, class: uClass });
                toggleEditProfile();
                loadUserProfile(currentUser.uid);
            } catch(e) { alert("Update failed"); }
        }

        async function updateGeminiKey() {
            const key = document.getElementById('input-gemini-key').value.trim();
            if(!key) return;
            try {
                await db.collection('users').doc(currentUser.uid).update({ geminiApiKey: key });
                document.getElementById('gemini-modal').classList.add('hidden');
                loadUserProfile(currentUser.uid);
            } catch(e) { alert("Failed to save key"); }
        }

        // --- NEW: COMPRESSED HISTORY & STATS LOGIC ---
        async function loadUserHistory(uid) {
            const snapshot = await db.collection('user_results').doc(uid).collection('attempts').orderBy('timestamp', 'desc').get();
            
            if (snapshot.empty) {
                document.getElementById('no-history-msg').classList.remove('hidden');
                return;
            }

            // Reset Global Stats
            userStats = { totalTests: 0, totalQuestions: 0, totalCorrect: 0, totalIncorrect: 0, totalTime: 0 };
            groupedHistory = {};
            rawHistoryData = {};
            
            // Global Chart Data arrays
            let allScores = [];
            let allLabels = [];

            snapshot.forEach((doc, idx) => {
                const d = doc.data();
                const attemptId = doc.id;
                
                // Store raw for single modal lookup
                rawHistoryData[attemptId] = { id: attemptId, ...d };

                // Group by Quiz Title
                const title = d.quizTitle || 'Unknown Quiz';
                if (!groupedHistory[title]) {
                    groupedHistory[title] = [];
                }
                groupedHistory[title].push({ id: attemptId, ...d });

                // Update Global Stats
                userStats.totalTests++;
                userStats.totalQuestions += (d.total || 0);
                userStats.totalCorrect += (d.score || 0);
                userStats.totalIncorrect += ((d.total - d.score) || 0);
                userStats.totalTime += (d.totalTimeSeconds || 0);
                
                // For global chart (chronological reverse later)
                allScores.push(d);
            });

            // Update Global Stats UI
            document.getElementById('stat-total-tests').textContent = userStats.totalTests;
            document.getElementById('stat-questions').textContent = userStats.totalQuestions;
            const accuracy = Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100) || 0;
            document.getElementById('stat-accuracy').textContent = accuracy + '%';
            const avgTime = Math.round(userStats.totalTime / userStats.totalQuestions) || 0;
            document.getElementById('stat-time').textContent = avgTime + 's';

            // Render Compressed Table
            const tbody = document.getElementById('history-table-body');
            tbody.innerHTML = '';
            
            Object.keys(groupedHistory).forEach(title => {
                const attempts = groupedHistory[title];
                // attempts[0] is latest because of sort desc
                const latest = attempts[0];
                const bestScore = Math.max(...attempts.map(a => a.score));
                
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800 transition";
                tr.innerHTML = `
                    <td class="p-4 font-bold text-slate-700 dark:text-slate-200">${title}</td>
                    <td class="p-4"><span class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold">${attempts.length} Attempts</span></td>
                    <td class="p-4">${latest.score}/${latest.total} <span class="text-xs text-slate-400">(${new Date(latest.timestamp.toDate()).toLocaleDateString()})</span></td>
                    <td class="p-4 text-primary font-bold">${bestScore}/${latest.total}</td>
                    <td class="p-4 text-right">
                        <button onclick="openChapterModal('${title.replace(/'/g, "\\'")}')" class="px-3 py-1 bg-primary hover:bg-primaryHover text-white rounded shadow text-xs font-bold">
                            View History
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Render Global Charts
            // Reverse for chronological order (Oldest -> Newest)
            const chronological = [...allScores].reverse();
            const labels = chronological.map((_, i) => `T${i+1}`);
            const dataPoints = chronological.map(a => Math.round((a.score / a.total) * 100));
            renderGlobalCharts(labels, dataPoints, userStats.totalCorrect, userStats.totalIncorrect);
        }

        // --- CHAPTER DETAILED MODAL ---
        function openChapterModal(title) {
            const attempts = groupedHistory[title];
            if (!attempts) return;

            // 1. Set Title
            document.getElementById('ch-modal-title').textContent = title;

            // 2. Render Sub-Table (Chronological Descending)
            const listBody = document.getElementById('ch-modal-list');
            listBody.innerHTML = '';
            
            // Sort attempts chronological for Graph (Old -> New)
            const chronoAttempts = [...attempts].sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
            
            // For Table we want New -> Old
            attempts.forEach(att => {
                const acc = Math.round((att.score / att.total) * 100);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="p-3 text-xs text-slate-500">${new Date(att.timestamp.toDate()).toLocaleString()}</td>
                    <td class="p-3 font-bold text-primary">${att.score}/${att.total}</td>
                    <td class="p-3 text-xs">${acc}%</td>
                    <td class="p-3 text-right">
                         <button onclick="openResultModal('${att.id}')" class="text-xs underline text-indigo-500">View</button>
                    </td>
                `;
                listBody.appendChild(tr);
            });

            // 3. Render Specific Graph
            const ctx = document.getElementById('chapterChart').getContext('2d');
            if (chapterChartInstance) chapterChartInstance.destroy();

            const labels = chronoAttempts.map((_, i) => `Attempt ${i+1}`);
            const scores = chronoAttempts.map(a => Math.round((a.score / a.total) * 100));

            chapterChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Performance Trend (%)',
                        data: scores,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#6366f1',
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(200,200,200,0.1)' } },
                        x: { grid: { display: false } }
                    },
                    plugins: { legend: { display: false } }
                }
            });

            document.getElementById('chapter-history-modal').classList.remove('hidden');
        }

        function closeChapterModal() {
            document.getElementById('chapter-history-modal').classList.add('hidden');
        }

        // --- SINGLE RESULT MODAL ---
        function openResultModal(attemptId) {
            const data = rawHistoryData[attemptId];
            if(!data) return;

            document.getElementById('modal-quiz-title').textContent = data.quizTitle;
            document.getElementById('modal-date').textContent = new Date(data.timestamp.toDate()).toLocaleString();
            document.getElementById('modal-score').textContent = `${data.score}/${data.total}`;
            
            document.getElementById('modal-correct').textContent = data.score;
            document.getElementById('modal-incorrect').textContent = data.total - data.score; 
            document.getElementById('modal-time').textContent = formatTime(data.totalTimeSeconds || 0);
            
            const acc = Math.round((data.score / data.total) * 100) || 0;
            document.getElementById('modal-accuracy').textContent = acc + '%';

            document.getElementById('result-modal').classList.remove('hidden');
        }

        function closeResultModal() {
            document.getElementById('result-modal').classList.add('hidden');
        }

        function formatTime(seconds) {
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            return `${m}m ${s}s`;
        }

        // --- GLOBAL CHARTS ---
        function renderGlobalCharts(labels, data, correct, incorrect) {
            new Chart(document.getElementById('scoreChart'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Score %',
                        data: data,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }
            });

            new Chart(document.getElementById('accuracyChart'), {
                type: 'doughnut',
                data: {
                    labels: ['Correct', 'Incorrect'],
                    datasets: [{
                        data: [correct, incorrect],
                        backgroundColor: ['#22c55e', '#ef4444'],
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // --- COUNTDOWN ---
        function initCountdown(userClass) {
            let targetDateStr = "May 3, 2027 00:00:00"; 
            let label = "Target: May 3, 2027";
            if (userClass === "12" || userClass === "12+") {
                targetDateStr = "May 3, 2026 00:00:00"; 
                label = "Target: May 3, 2026";
            }
            document.getElementById('countdown-label').innerText = label;
            const targetDate = new Date(targetDateStr).getTime();

            setInterval(() => {
                const now = new Date().getTime();
                const distance = targetDate - now;
                if (distance < 0) {
                    document.getElementById('cd-days').innerText = "0";
                    return;
                }
                document.getElementById('cd-days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
                document.getElementById('cd-hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                document.getElementById('cd-mins').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                document.getElementById('cd-secs').innerText = Math.floor((distance % (1000 * 60)) / 1000);
            }, 1000);
        }

        let currentPdfBase64 = null;

         async function generateCertificate() {
          const loader = document.getElementById('loading-screen');
          loader.classList.remove('hidden');

          document.getElementById('cert-name').textContent = document.getElementById('disp-name').textContent;
          document.getElementById('cert-questions').textContent = userStats.totalQuestions;
          document.getElementById('cert-tests').textContent = userStats.totalTests;
          const acc = Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100) || 0;
          document.getElementById('cert-accuracy').textContent = acc + '%';
          document.getElementById('cert-date').textContent = new Date().toLocaleDateString();
          document.getElementById('cert-id').textContent = currentUser.uid.substring(0, 8).toUpperCase();
  
           const container = document.getElementById('certificate-container');
           container.style.display = "flex";

           await new Promise(r => setTimeout(r, 800));

       try {
            const canvas = await html2canvas(container, {
             scale: 2,
             useCORS: true,
             allowTaint: true
            });

             const imgData = canvas.toDataURL('image/png');

             document.getElementById('cert-preview-image').src = imgData;
             const { jsPDF } = window.jspdf;
             const pdf = new jsPDF({
                                  orientation: 'landscape',
                                  unit: 'px',
                                  format: [canvas.width, canvas.height]
                                  });
             pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
             currentPdfBase64 = pdf.output('datauristring');

             document.getElementById('pdf-viewer-modal').classList.remove('hidden');

             } catch (e) {
                         console.error("Gen Error:", e);
                         alert("Preview failed. Please try again.");
                         } finally {
                                container.style.display = "none";
                                loader.classList.add('hidden');
                                }
                         }

             document.getElementById('btn-download-pdf').onclick = function() {
                if (!currentPdfBase64) return alert("Please wait for preview to load");

              const filename = `Certificate_${currentUser.uid.substring(0,6)}.pdf`;
             const link = document.createElement('a');
             link.href = currentPdfBase64;
             link.download = filename;
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
         };

         function closePdfModal() {
             document.getElementById('pdf-viewer-modal').classList.add('hidden');
             document.getElementById('cert-preview-image').src = "";
             }

        // Dark Mode
        const themeToggle = document.getElementById('theme-toggle');
        const updateTheme = () => {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };
        themeToggle.onclick = () => {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        };
        updateTheme();

    </script>
</body>
</html>

================================================================================
// File: quiz/gemini.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Easy Guide: Get Your Gemini API Key</title>
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />

    <style>
        :root {
            --primary-blue: #1a73e8; /* Google Blue */
            --hover-blue: #1557b0;
            --bg-page: #f8f9fa;
            --bg-card: #ffffff;
            --text-main: #202124;
            --text-sub: #5f6368;
            --border-color: #dadce0;
            --success-green: #1e8e3e;
        }

        body {
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            background-color: var(--bg-page);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }

        /* --- Hero Section --- */
        .hero {
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            text-align: center;
            padding: 60px 20px;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin: 0;
            font-weight: 500;
        }

        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-top: 10px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* --- Container --- */
        .container {
            max-width: 800px;
            margin: -40px auto 40px;
            padding: 0 20px;
        }

        /* --- Step Card Styling --- */
        .card {
            background: var(--bg-card);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid transparent;
            transition: transform 0.2s, box-shadow 0.2s;
            position: relative;
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        /* Number Badge */
        .step-badge {
            background-color: var(--primary-blue);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 10px;
            font-size: 1.1rem;
        }

        .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        h2 {
            margin: 0;
            font-size: 1.5rem;
            color: var(--text-main);
        }

        p.instruction {
            color: var(--text-sub);
            margin-bottom: 20px;
            font-size: 1.05rem;
        }

        /* --- Mock Interfaces (The Visual "Fake" Buttons) --- */
        .mock-interface {
            background-color: #f1f3f4;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-top: 15px;
        }

        .mock-label {
            display: block;
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--text-sub);
            margin-bottom: 10px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        /* Button Replicas */
        .btn-google-login {
            background: white;
            color: #3c4043;
            border: 1px solid var(--border-color);
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: default; /* Not clickable */
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .btn-ai-studio {
            background-color: var(--primary-blue);
            color: white;
            padding: 10px 24px;
            border-radius: 24px; /* Pill shape */
            font-weight: 500;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: default;
        }

        .btn-create-key {
            background-color: var(--primary-blue);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 0.9rem;
            display: inline-block;
            margin: 5px;
            opacity: 0.5; /* Dimmed to show not active */
        }
        
        .btn-create-key.highlight {
            opacity: 1;
            box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.3);
            cursor: pointer;
        }

        /* The Key Display Box */
        .key-display-box {
            background: #202124;
            color: #81c995; /* Matrix green-ish */
            font-family: monospace;
            padding: 15px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }

        .blur-text {
            filter: blur(4px);
            user-select: none;
        }

        /* --- Real Action Buttons (The ones that work) --- */
        .action-area {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: right;
        }

        .btn-real {
            background-color: var(--primary-blue);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            display: inline-block;
            transition: background 0.2s;
        }

        .btn-real:hover {
            background-color: var(--hover-blue);
        }

        /* Checkbox interaction */
        .checkbox-wrapper {
            display: flex;
            align-items: center;
            margin-top: 15px;
            cursor: pointer;
        }
        
        .checkbox-wrapper input {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            accent-color: var(--success-green);
        }

        .done-message {
            display: none;
            color: var(--success-green);
            font-weight: bold;
            margin-left: 10px;
        }

        /* --- Footer --- */
        footer {
            text-align: center;
            padding: 40px;
            color: var(--text-sub);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>

    <div class="hero">
        <h1>How to Get a Gemini API Key</h1>
        <p>A simple guide for users . Follow these 4 steps to unlock Google's AI. FULL TUTORIAL WITH <STRONG>SAKSEN </STRONG></p>
    </div>

    <div class="container">

        <div class="card" id="step1">
            <div class="card-header">
                <div class="step-badge">1</div>
                <h2>Go to Google AI Studio</h2>
            </div>
            <p class="instruction">
                First, you need to visit the official Google website where the AI tools live. You will need to sign in with your normal Gmail account.
            </p>
            
            <div class="mock-interface">
                <span class="mock-label">You will see a screen like this:</span>
                <div class="btn-google-login">
                    <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.448 2.805 1.206 3.93l2.758-2.22z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.716 7.143c.708-2.13 2.692-3.715 5.036-3.715z"/></svg>
                    Sign in to Google AI Studio
                </div>
            </div>

            <div class="action-area">
                <a href="https://aistudio.google.com/" target="_blank" class="btn-real">Click here to Open Website &rarr;</a>
            </div>
            
            <label class="checkbox-wrapper">
                <input type="checkbox" onchange="markComplete(this)">
                <span>I have signed in</span>
                <span class="done-message">Great! Next step.</span>
            </label>
        </div>

        <div class="card" id="step2">
            <div class="card-header">
                <div class="step-badge">2</div>
                <h2>Find the "Get API key" Button</h2>
            </div>
            <p class="instruction">
                Once you are inside, look at the top-left corner of the screen. You are looking for a blue button that says "Get API key".
            </p>

            <div class="mock-interface">
                <span class="mock-label">Look for this button on the screen:</span>
                <br>
                <div class="btn-ai-studio">
                    <span style="font-size: 1.2em;">🔑</span> Get API key
                </div>
            </div>

            <label class="checkbox-wrapper">
                <input type="checkbox" onchange="markComplete(this)">
                <span>I found and clicked the button</span>
                <span class="done-message">Nice work!</span>
            </label>
        </div>

        <div class="card" id="step3">
            <div class="card-header">
                <div class="step-badge">3</div>
                <h2>Create the Key</h2>
            </div>
            <p class="instruction">
                A menu will pop up. You want to click the first option: <strong>"Create API key in new project"</strong>. This is the easiest way.
            </p>

            <div class="mock-interface">
                <span class="mock-label">Select the highlighted option:</span>
                <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; text-align: left;">
                    <div style="margin-bottom: 10px; color: #333; font-weight: bold;">Create API Key</div>
                    <div class="btn-create-key highlight">
                        + Create API key in new project
                    </div>
                    <br>
                    <div class="btn-create-key">
                        + Create API key in existing project
                    </div>
                </div>
            </div>

            <label class="checkbox-wrapper">
                <input type="checkbox" onchange="markComplete(this)">
                <span>I clicked "Create in new project"</span>
                <span class="done-message">Almost there!</span>
            </label>
        </div>

        <div class="card" id="step4">
            <div class="card-header">
                <div class="step-badge">4</div>
                <h2>Copy Your Key</h2>
            </div>
            <p class="instruction">
                After a few seconds, your key will appear. It is a long string of random letters. Click the <strong>Copy</strong> button next to it.
            </p>

            <div class="mock-interface">
                <span class="mock-label">Your key looks like this:</span>
                <div class="key-display-box">
                    <span class="blur-text">AIzaSyD-823748237489sdhfksjdhf</span>
                    <button style="background: none; border: 1px solid #555; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Copy</button>
                </div>
                <div style="color: #d93025; font-size: 0.85rem; margin-top: 10px;">
                 Copy the key and paste to the solutions box !
                </div>
            </div>

            <label class="checkbox-wrapper">
                <input type="checkbox" onchange="markComplete(this)">
                <span>I have copied my key!</span>
                <span class="done-message">Congratulations! You are done. 🎉</span>
            </label>
        </div>

    </div>

    <footer>
        <p>Made for Everyone. Created  with <strong>SAKSEN</strong>.</p>
    </footer>

    <script>
        // Simple script to add interactivity to checkboxes
        function markComplete(checkbox) {
            const card = checkbox.closest('.card');
            const message = checkbox.parentElement.querySelector('.done-message');
            
            if (checkbox.checked) {
                // Add a subtle border highlight
                card.style.border = "1px solid #1e8e3e";
                card.style.background = "#f0fdf4"; // Very light green bg
                message.style.display = "inline";
            } else {
                card.style.border = "1px solid transparent";
                card.style.background = "#ffffff";
                message.style.display = "none";
            }
        }
    </script>

</body>
</html>

================================================================================
// File: quiz/quiz.js
================================================================================
let allQuestions = []; 
let questions = [];   
let currentIndex = 0;
let userAnswers = {}; 
let timeLeft = 0;
let timerInterval = null;
let isPaused = false;
let currentMode = 'test';
let checkedQuestions = {}; 

const quizEls = {
    loader: document.getElementById('loading-screen'),
    container: document.getElementById('quiz-container'),
    title: document.getElementById('quiz-title'),
    time: document.getElementById('time-display'),
    qText: document.getElementById('question-text'),
    opts: document.getElementById('options-area'),
    progressBar: document.getElementById('progress-bar'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    pause: document.getElementById('pause-btn'),
    resume: document.getElementById('resume-btn'),
    pausedOverlay: document.getElementById('paused-overlay'),
    saveBtn: document.getElementById('save-btn'),
    exitModal: document.getElementById('exit-modal'),
    resumeModal: document.getElementById('resume-modal'),
    setupModal: document.getElementById('setup-modal'), 
    setupSet: document.getElementById('setup-question-set'),
    setupTimer: document.getElementById('setup-timer'),
    startBtn: document.getElementById('btn-start-custom'),
    setupTitle: document.getElementById('setup-quiz-title'),
    setupModal: document.getElementById('setup-modal'),
    setupHistoryToggle: document.getElementById('toggle-setup-history'),
    setupHistoryContainer: document.getElementById('setup-history-container'),
    setupHistoryList: document.getElementById('setup-history-list'),
    viewLastBtn: document.getElementById('btn-view-last-result'),
};


const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

const renderMath = (element = document.body) => {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
        });
    }
};


const renderQuestion = () => {
    const q = questions[currentIndex];
    
    quizEls.qText.innerHTML = q.question;

    const existingImg = document.getElementById('current-quiz-image');
    if (existingImg) existingImg.remove();


if (q.imageUrl) {
    const imgContainer = document.createElement('div');
    imgContainer.id = 'current-quiz-image';
    imgContainer.className = "w-full flex justify-center my-4";
    
    imgContainer.innerHTML = `
        <div id="trigger-zoom" class="relative group w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-zoom-in transition-all hover:shadow-md">
            <img src="${q.imageUrl}" alt="Question" class="w-full h-32 md:h-48 object-contain mx-auto p-2">
            <div class="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                 <div class="bg-white/90 dark:bg-slate-800/90 text-primary px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                    <i class="fa-solid fa-expand mr-2"></i> Click to Zoom Image
                 </div>
            </div>
        </div>
    `;
    quizEls.qText.parentNode.insertBefore(imgContainer, quizEls.qText.nextSibling);

    document.getElementById('trigger-zoom').addEventListener('click', function() {
        window.openImageZoom(q.imageUrl);
    });
}

    const setOffset = parseInt(quizEls.setupSet.value.split('-')[0]) || 0; 
    document.getElementById('question-meta').textContent = `Question ${currentIndex+1} of ${questions.length}`;
    
    quizEls.progressBar.style.width = `${((currentIndex+1)/questions.length)*100}%`;
    quizEls.opts.innerHTML = '';

    const isChecked = checkedQuestions[q.id];
    const userAnswer = userAnswers[q.id];

    ['A','B','C','D'].forEach(key => {
        const btn = document.createElement('button');
        const isSel = userAnswer === key;
        
        let btnClass = "option-btn w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ";
        let badgeClass = "w-8 h-8 rounded-full flex items-center justify-center ";
        
        if (currentMode === 'quiz' && isChecked) {
             if (key === q.answer) {
                btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 ring-1 ring-green-500 ";
                badgeClass += "bg-green-500 text-white";
            } else if (isSel && key !== q.answer) {
                btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500 ";
                badgeClass += "bg-red-500 text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 opacity-60 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        } else {
             if (isSel) {
                btnClass += "border-primary bg-indigo-50 dark:bg-primary/20 ring-1 ring-primary ";
                badgeClass += "bg-primary text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-primary/50 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        }

        btn.className = btnClass;
        btn.disabled = (currentMode === 'quiz' && isChecked); 
        btn.innerHTML = `<span class="${badgeClass}">${key}</span><span class="text-lg ${isSel && !isChecked ? 'text-primary font-semibold' : 'dark:text-slate-300'}">${q.options[key]}</span>`;
        btn.onclick = () => { 
            if(!isPaused && !(currentMode === 'quiz' && isChecked)) { 
                userAnswers[q.id] = key;
                renderQuestion(); 
            }
        };
        quizEls.opts.appendChild(btn);
    });

    const existingCheckBtn = document.getElementById('check-answer-btn');
    if(existingCheckBtn) existingCheckBtn.remove();
    
    if (currentMode === 'quiz' && !isChecked) {
        const checkBtn = document.createElement('button');
        checkBtn.id = 'check-answer-btn';
        checkBtn.className = "w-full md:w-auto px-6 py-2.5 rounded-xl text-white font-medium bg-purple-600 shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
        checkBtn.innerHTML = '<i class="fa-solid fa-check-double mr-2"></i> Check Answer';
        checkBtn.disabled = !userAnswers[q.id];
        checkBtn.onclick = () => {
            checkedQuestions[q.id] = true;
            renderQuestion();
        };
        const footerDiv = document.querySelector('footer div.flex');
        quizEls.next.classList.add('hidden');
        quizEls.submit.classList.add('hidden');
        if(footerDiv) footerDiv.appendChild(checkBtn);
    } else {
        quizEls.prev.disabled = currentIndex === 0;
        if (currentIndex === questions.length - 1) {
            quizEls.next.classList.add('hidden');
            quizEls.submit.classList.remove('hidden');
        } else {
            quizEls.next.classList.remove('hidden');
            quizEls.submit.classList.add('hidden');
        }
    }
    renderMath(quizEls.container); 
};


const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if(!isPaused && timeLeft > 0) {
            timeLeft--;
            quizEls.time.textContent = formatTime(timeLeft);
        } else if(timeLeft <= 0) {
            submitQuiz(true);
        }
    }, 1000);
};

const togglePause = (state) => {
    isPaused = state;
    if(isPaused) {
        clearInterval(timerInterval);
        document.getElementById('pause-btn').classList.add('hidden'); 
        document.getElementById('resume-btn').classList.remove('hidden');
        document.getElementById('paused-overlay').classList.remove('hidden');
    } else {
        startTimer();
        document.getElementById('pause-btn').classList.remove('hidden'); 
        document.getElementById('resume-btn').classList.add('hidden');
        document.getElementById('paused-overlay').classList.add('hidden');
    }
};

const endQuizEarly = () => {
    togglePause(true); 
    if (confirm("Are you sure you want to end the quiz now and submit your current answers?")) {
        submitQuiz(false);
    } else {
        togglePause(false); 
    }
};



const loadQuiz = async (uid) => {
    quizEls.loader.classList.remove('hidden');
    
    const doc = await db.collection('quizzes').doc(uid).get();
    if(!doc.exists) {
        document.getElementById('error-text').textContent = "Quiz not found or deleted.";
        document.getElementById('error-message-area').classList.remove('hidden');
        return;
    }
    const data = doc.data();
    quizEls.title.textContent = data.title;
    quizEls.setupTitle.textContent = data.title;
    allQuestions = data.questions.map((q,i)=>({...q, id:`Q${i+1}`}));
    quizEls.setupSet.innerHTML = '';
    const setSize = 20;
    const totalQ = allQuestions.length;
    for (let i = 0; i < totalQ; i += setSize) {
        const start = i + 1;
        const end = Math.min(i + setSize, totalQ);
        const option = document.createElement('option');
        option.value = `${i}-${end}`; 
        option.textContent = `Questions ${start} - ${end}`;
        quizEls.setupSet.appendChild(option);
    }
    if (totalQ > setSize) {
        const allOpt = document.createElement('option');
        allOpt.value = `0-${totalQ}`;
        allOpt.textContent = `All Questions (${totalQ})`;
        quizEls.setupSet.appendChild(allOpt);
    }

    quizEls.setupTimer.innerHTML = '';
    const maxDurationMin = data.durationMinutes || Math.ceil(totalQ * 1); 
    
    for (let t = 5; t <= maxDurationMin; t += 5) {
        const option = document.createElement('option');
        option.value = t;
        option.textContent = `${t} Minutes`;
        if (t === 20 || t === maxDurationMin) option.selected = true; 
        quizEls.setupTimer.appendChild(option);
    }
    if (maxDurationMin % 5 !== 0) {
         const maxOpt = document.createElement('option');
         maxOpt.value = maxDurationMin;
         maxOpt.textContent = `${maxDurationMin} Minutes (Max)`;
         maxOpt.selected = true;
         quizEls.setupTimer.appendChild(maxOpt);
    }

    const prog = await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(uid).get();
    
    quizEls.loader.classList.add('hidden');
    
    if(prog.exists) {
        quizEls.resumeModal.classList.remove('hidden');
        document.getElementById('btn-resume-attempt').onclick = () => {
            const s = prog.data();
            questions = allQuestions;
            currentIndex = s.currentIndex; 
            timeLeft = s.timeLeft; 
            userAnswers = s.userAnswers;
            startQuizSession();
        };
        document.getElementById('btn-restart-attempt').onclick = async () => {
            await prog.ref.delete(); 
            quizEls.resumeModal.classList.add('hidden');
            quizEls.setupModal.classList.remove('hidden');
        };
    } else {
        quizEls.setupModal.classList.remove('hidden');
    }

    quizEls.startBtn.onclick = () => {
        const modeInput = document.querySelector('input[name="quiz_mode"]:checked');
        currentMode = modeInput ? modeInput.value : 'test';
        const selectedTime = parseInt(quizEls.setupTimer.value);
        timeLeft = selectedTime * 60;
        const rangeVal = quizEls.setupSet.value; // e.g. "0-20"
        const [start, end] = rangeVal.split('-').map(Number);
        
        questions = allQuestions.slice(start, end);
        currentIndex = 0;
        userAnswers = {};
        checkedQuestions = {};
        startQuizSession();
    };
};

const startQuizSession = () => {
    document.querySelectorAll('.fixed').forEach(m => { if(m.id!=='loading-screen') m.classList.add('hidden') });
    
    quizEls.container.classList.remove('hidden');
    quizEls.time.textContent = formatTime(timeLeft);
    
    renderQuestion();
    startTimer();
    
    if (typeof setupAntiCheatingMeasures === 'function') {
        setupAntiCheatingMeasures();
    }
    
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
        if(!document.getElementById('result-box').classList.contains('hidden')) {
             window.location.replace('/index.html');
        } else { 
            togglePause(true); 
            quizEls.exitModal.classList.remove('hidden'); 
            history.pushState(null, null, location.href); 
        }
    };
};

const saveProgress = async () => {
    await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(currentQuizId).set({
        currentIndex, timeLeft, userAnswers, lastSaved: firebase.firestore.FieldValue.serverTimestamp()
    });
};

quizEls.prev.onclick = () => { if(currentIndex>0) { currentIndex--; renderQuestion(); }};
quizEls.next.onclick = () => { if(currentIndex<questions.length-1) { currentIndex++; renderQuestion(); }};
quizEls.submit.onclick = () => submitQuiz(false); 
document.getElementById('pause-btn').onclick = () => togglePause(true);
document.getElementById('resume-btn').onclick = () => togglePause(false);
document.getElementById('end-quiz-early-btn').onclick = endQuizEarly;

quizEls.saveBtn.onclick = () => {
     togglePause(true);
     quizEls.exitModal.classList.remove('hidden');
     history.pushState(null, null, location.href);
};

document.getElementById('modal-cancel').onclick = () => { 
    quizEls.exitModal.classList.add('hidden'); 
    togglePause(false); 
};
document.getElementById('modal-save').onclick = async () => {
    await saveProgress();
    window.onpopstate = null; 
    window.location.replace('/index.html');
};

window.toggleModeDescription = (mode) => {
    console.log("Selected Mode:", mode);
};

const themeEls = {
    themeToggle: document.getElementById('theme-toggle'),
    sunIcon: document.getElementById('sun-icon'),
    moonIcon: document.getElementById('moon-icon'),
};
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeEls.sunIcon.classList.remove('hidden');
        themeEls.moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeEls.sunIcon.classList.add('hidden');
        themeEls.moonIcon.classList.remove('hidden');
    }
}
themeEls.themeToggle.onclick = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    initTheme();
};
initTheme();



const quizContainer = document.getElementById('quiz-container'); 
let focusLostDetected = false;
let focusLossCount = 0;
const maxFocusLosses = 3; 

function showAntiCheatAlert(message, isCritical = false) {
    console.warn(`Anti-Cheat Alert: ${message}`);
    
    const alertId = 'anticheat-alert';
    const existingAlert = document.getElementById(alertId);
    if (existingAlert) existingAlert.remove();
    
    const alertEl = document.createElement('div');
    alertEl.id = alertId;
    alertEl.className = `fixed top-0 left-0 right-0 p-4 text-center z-[1000] font-bold shadow-lg transition-transform duration-300 transform 
        ${isCritical ? 'bg-red-600 text-white' : 'bg-yellow-400 text-slate-800'}`;
    alertEl.textContent = message;
    
    document.body.appendChild(alertEl);
    
    if (!isCritical) {
        setTimeout(() => {
            if (document.getElementById(alertId)) {
                document.getElementById(alertId).remove();
            }
        }, 4000);
    }
}

function handleFocusLoss() {
    if (!isPaused && !quizContainer.classList.contains('hidden')) {
        focusLossCount++;
        togglePause(true);

        const overlay = document.getElementById('violation-overlay');
        const msg = document.getElementById('violation-msg');
        msg.textContent = `You left the quiz screen. Violation ${focusLossCount}/${maxFocusLosses}.`;
        overlay.classList.remove('hidden');

        document.getElementById('close-violation').onclick = () => {
            overlay.classList.add('hidden');
            if (focusLossCount < maxFocusLosses) {
                togglePause(false);
            } else {
                submitQuiz(true);
            }
        };
    }
}

function handleFocusReturn() {
    if (focusLostDetected) {
        showAntiCheatAlert("Quiz window regained focus. Click 'Resume' to restart the timer.", false);
        focusLostDetected = false;
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        handleFocusLoss();
    } else {
        handleFocusReturn();
    }
}


quizEls.viewLastBtn.onclick = async () => {
    if (!CURRENT_USER_ID || !currentQuizId) return;

    const originalText = quizEls.viewLastBtn.innerHTML;
    quizEls.viewLastBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    quizEls.viewLastBtn.disabled = true;

    try {
        const snapshot = await db.collection('user_results')
            .doc(CURRENT_USER_ID)
            .collection('attempts')
            .where('quizId', '==', currentQuizId)
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();

        if (snapshot.empty) {
            alert("No previous results found for this quiz.");
            quizEls.viewLastBtn.innerHTML = originalText;
            quizEls.viewLastBtn.disabled = false;
            return;
        }

        const lastAttemptId = snapshot.docs[0].id;
        
        quizEls.setupModal.classList.add('hidden');

        if(quizEls.container) quizEls.container.classList.add('hidden');

        document.getElementById('result-box').classList.remove('hidden'); 

        if (typeof loadAttemptDetails === 'function') {
            loadAttemptDetails(lastAttemptId);
        } else {
            console.error("Critical: loadAttemptDetails function not found in result.js");
        }

    } catch (e) {
        console.error("Error redirecting to result:", e);
        alert("Could not load result. Please ensure the Database Index is created.");
    } finally {
        quizEls.viewLastBtn.innerHTML = originalText;
        quizEls.viewLastBtn.disabled = false;
    }
};



function setupAntiCheatingMeasures() {
    document.addEventListener('contextmenu', e => e.preventDefault());

    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showAntiCheatAlert("Copying is prohibited!", true);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            handleFocusLoss();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText(''); 
            showAntiCheatAlert("Screenshots are discouraged.", true);
        }
    });
}

window.openImageZoom = function(src) {
    let modal = document.getElementById('img-zoom-modal');
    
    if (!modal) {
        const modalHtml = `
        <div id="img-zoom-modal" class="fixed inset-0 z-[10000] hidden bg-black/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div class="absolute top-4 right-4 flex gap-3 z-[10001]">
                <button id="z-down" title="Download" class="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><i class="fa-solid fa-download"></i></button>
                
                <button id="z-rotate" title="Rotate" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-rotate"></i></button>
                
                <button id="z-in" title="Zoom In" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-plus"></i></button>
                <button id="z-out" title="Zoom Out" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-minus"></i></button>
                
                <button onclick="closeZoomModal()" class="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="w-full h-full flex items-center justify-center overflow-hidden">
                <img id="img-zoom-target" src="" class="transition-transform duration-200" style="transform: scale(1) rotate(0deg);">
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('img-zoom-modal');
        
        let currentScale = 1;
        let currentRotation = 0;

        const update = () => {
            document.getElementById('img-zoom-target').style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        };

        document.getElementById('z-in').onclick = () => { currentScale += 0.2; update(); };
        document.getElementById('z-out').onclick = () => { if(currentScale > 0.5) currentScale -= 0.2; update(); };

        document.getElementById('z-rotate').onclick = () => { 
            currentRotation += 90; 
            update(); 
        };

        // Download
        document.getElementById('z-down').onclick = () => {
            const link = document.createElement('a');
            link.href = document.getElementById('img-zoom-target').src;
            link.download = 'quiz-image.jpg';
            link.click();
        };
    }

    const targetImg = document.getElementById('img-zoom-target');
    targetImg.src = src;
    targetImg.style.transform = "scale(1) rotate(0deg)"; 
    modal.classList.remove('hidden');
};

window.closeZoomModal = function() {
    document.getElementById('img-zoom-modal').classList.add('hidden');
};


================================================================================
// File: quiz/quizmain.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QUIZ LAND | NEELAXMI</title>
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />

    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --dark: #2d3436;
            --light: #dfe6e9;
            --white: #ffffff;
            --glass: rgba(255, 255, 255, 0.95);
            --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            color: var(--dark);
        }

        /* Navbar with Logo */
        nav {
            background: var(--glass);
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(4px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo span { color: var(--dark); }

        .user-menu {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-email {
            font-size: 0.9rem;
            color: #636e72;
            font-weight: 500;
        }

        .btn-logout {
            background: #ff7675;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-logout:hover {
            background: #d63031;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(214, 48, 49, 0.4);
        }

        /* Main Content */
        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .hero-text {
            text-align: center;
            color: white;
            margin-bottom: 40px;
            animation: fadeInDown 1s ease-out;
        }

        .hero-text h1 { margin-bottom: 10px; font-size: 2.5rem; }
        .hero-text p { font-size: 1.1rem; opacity: 0.9; }

        /* Grid Layout */
        .quiz-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            padding-bottom: 50px;
        }

        /* Quiz Card VFX */
        .quiz-card {
            background: var(--glass);
            border-radius: 16px;
            padding: 25px;
            box-shadow: var(--shadow);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0; /* Hidden initially for animation */
        }

        .quiz-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .quiz-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 5px; height: 100%;
            background: var(--primary);
        }

        .card-header h3 {
            margin: 0;
            font-size: 1.4rem;
            color: var(--dark);
        }

        .card-meta {
            margin: 15px 0;
            color: #636e72;
            font-size: 0.9rem;
            display: flex;
            gap: 15px;
        }

        .meta-item { display: flex; align-items: center; gap: 5px; }

        .btn-start {
            width: 100%;
            padding: 12px;
            border: none;
            background: linear-gradient(to right, #6c5ce7, #a29bfe);
            color: white;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .btn-start:hover { opacity: 0.9; }

        /* Loading Spinner */
        .loader-container {
            text-align: center;
            color: white;
            margin-top: 50px;
        }
        .spinner {
            width: 40px; height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        /* Animations */
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Delay for grid items */
        .quiz-card:nth-child(1) { animation-delay: 0.1s; }
        .quiz-card:nth-child(2) { animation-delay: 0.2s; }
        .quiz-card:nth-child(3) { animation-delay: 0.3s; }
        .quiz-card:nth-child(4) { animation-delay: 0.4s; }
    </style>
</head>
<body>

    <nav>
        <div class="logo">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <span>QuizMaster</span>
        </div>
        <div class="user-menu" id="user-menu" style="display: none;">
            <span class="user-email" id="user-email">Loading...</span>
            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>
    </nav>

    <div class="container">
        <div class="hero-text">
            <h1>Welcome Back!</h1>
            <p>Select a module below to test your skills and track your progress.</p>
        </div>

        <div id="loader" class="loader-container">
            <div class="spinner"></div>
            <p>Loading your profile and quizzes...</p>
        </div>

        <div id="quiz-grid" class="quiz-grid" style="display: none;">
            </div>
        
        <div style="text-align: center; margin-top: 20px;">
            <a href="admin.html" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.8rem;">Admin Access</a>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>

    <script>
        // --- 1. FIREBASE CONFIGURATION ---
        // REPLACE WITH YOUR ACTUAL CONFIG FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyAOJmK4igVb_P8cV6jLfZhFPGFmAZfVvRE",
  authDomain: "quiznew-30700.firebaseapp.com",
  projectId: "quiznew-30700",
  storageBucket: "quiznew-30700.firebasestorage.app",
  messagingSenderId: "107821881642",
  appId: "1:107821881642:web:7d708bda99196c85e42653",
  measurementId: "G-0B6095T5X7"
};
        
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        // --- 2. AUTHENTICATION & LOGIC ---
        
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is logged in
                document.getElementById('user-menu').style.display = 'flex';
                document.getElementById('user-email').textContent = user.email;
                fetchQuizzes(); // Load data
            } else {
                // No user logged in -> Redirect to Auth page
                window.location.href = 'auth.html';
            }
        });

        // Logout Function
        function logout() {
            auth.signOut().then(() => {
                window.location.href = 'auth.html';
            }).catch((error) => {
                console.error("Logout error", error);
            });
        }

        // --- 3. FETCH QUIZZES DYNAMICALLY ---
        async function fetchQuizzes() {
            const grid = document.getElementById('quiz-grid');
            const loader = document.getElementById('loader');
            
            try {
                // Fetch from the 'quizzes' collection we made in Admin
                const snapshot = await db.collection('quizzes').get();
                
                if (snapshot.empty) {
                    grid.innerHTML = '<p style="color:white; text-align:center; grid-column: 1/-1;">No quizzes available yet. Create one in Admin panel!</p>';
                } else {
                    grid.innerHTML = ''; // Clear current
                    
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        const uid = doc.id;
                        const questionCount = data.questions ? data.questions.length : 0;
                        const duration = data.durationMinutes || 10;
                        
                        // Create Card HTML
                        const card = `
                            <div class="quiz-card">
                                <div class="card-header">
                                    <h3>${data.title}</h3>
                                </div>
                                <div class="card-meta">
                                    <div class="meta-item">
                                        <span>❓</span> ${questionCount} Questions
                                    </div>
                                    <div class="meta-item">
                                        <span>⏱️</span> ${duration} Mins
                                    </div>
                                </div>
                                <button class="btn-start" onclick="startQuiz('${uid}')">Attempt Quiz 🚀</button>
                            </div>
                        `;
                        grid.innerHTML += card;
                    });
                }
                
                // Switch UI
                loader.style.display = 'none';
                grid.style.display = 'grid';

            } catch (error) {
                console.error("Error loading quizzes:", error);
                loader.innerHTML = `<p style="color: #ff7675;">Error loading data. <br> ${error.message}</p>`;
            }
        }

        // --- 4. NAVIGATION ---
        function startQuiz(uid) {
            window.location.href = `quizzes.html?uid=${uid}`;
        }
    </script>
</body>
</html>

================================================================================
// File: quiz/quizzes.html
================================================================================
<!DOCTYPE html>
<html lang="en" class="transition-colors duration-300">
<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> QUIZ CORNER | NEELAXMI QUIZ CENTER </title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrF9mu6tB9n7z8U8/u03bLg5W+V93w8L8Fv3w3v+Fz/3tN5V6z8S0g/T/x3X/7" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js" integrity="sha384-N3r8h7mKj4/Hn9p/n0Kx5i0wF3/W7/X7E4C4uCj5/FwR6Q6/W9z/3tZ0Q7/2Z/7" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" integrity="sha384-yS3R/QoXG/0E6/zP/X4tXQ4+C6h1H1z5F6v6v+G6/Q6/4tZ6/3Z/A6" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        primary: '#6366f1', // Indigo 500
                        primaryHover: '#4f46e5',
                        brand: { 500: '#6366f1', 600: '#4f46e5' },
                        darkBg: '#0f172a', // Slate 900
                    },
                    animation: {
                        'blob': 'blob 7s infinite',
                        'twinkle': 'twinkle 4s ease-in-out infinite',
                        'fade-in': 'fadeIn 0.5s ease-out forwards',
                    },
                    keyframes: {
                        blob: {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' },
                        },
                        twinkle: {
                            '0%, 100': { opacity: '0.2' },
                            '50%': { opacity: '1' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0', transform: 'translateY(10px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body { transition: background-color 0.3s, color 0.3s; }
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
        }
        
        .dark .glass-panel {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: #f1f5f9;
        }

        .tab-active { border-bottom: 2px solid #6366f1; color: #6366f1; }
        .tab-inactive { border-bottom: 2px solid transparent; color: #64748b; }
        .dark .tab-inactive { color: #94a3b8; }

        .loader {
            border-top-color: #6366f1;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
        }
        @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .option-btn:active { transform: scale(0.98); }
        
        /* Custom Range Slider for Video Progress */
.video-range {
    -webkit-appearance: none;
    background: rgba(255,255,255,0.2);
    border-radius: 5px;
    height: 5px;
    cursor: pointer;
}
.video-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    background: #ef4444; /* Red-500 */
    border-radius: 50%;
    margin-top: -5px; 
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

/* Animations */
.control-bar {
    transition: opacity 0.3s ease;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}
.video-wrapper:hover .control-bar,
.video-wrapper.paused .control-bar {
    opacity: 1;
}
.video-wrapper:not(.paused):not(:hover) .control-bar {
    opacity: 0; /* Hide controls when playing and not hovering */
}

    </style>
    
    
</head>
<body class="bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 min-h-screen flex items-center justify-center p-4 selection:bg-primary selection:text-white relative overflow-hidden">

    <div class="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div class="absolute top-0 left-0 w-72 h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div id="stars-container" class="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000"></div>
    </div>

<div id="auth-box" class="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
    <h2 id="auth-title" class="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">Login to QuizMaster</h2>
    
    <div class="space-y-4">
        <input id="auth-email" type="email" placeholder="Email Address" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
        <input id="auth-password" type="password" placeholder="Password" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
        
        <div id="registration-fields" class="hidden space-y-4">
            <input id="auth-name" type="text" placeholder="Full Name" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
            <select id="auth-class" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                <option value="" disabled selected>Select Class</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
            </select>
            <input id="auth-username" type="text" placeholder="Unique Username" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
        </div>
        
        <div id="auth-gemini-key-container" style="display: none;">
            <input id="auth-gemini-key" type="password" placeholder="Gemini API Key (Optional)" class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
            <button id="why-gemini-btn" class="text-xs text-primary mt-1 hover:underline">Why do I need this?</button>
        </div>
        
        <button id="auth-primary-btn" class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all">Sign In</button>
        <p id="auth-error" class="text-red-500 text-sm hidden text-center"></p>
        <button id="auth-toggle-mode" class="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Don't have an account? Sign Up</button>
    </div>
</div>


    <div id="loading-screen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-darkBg transition-colors duration-300">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 dark:border-slate-700 h-16 w-16 mb-6"></div>
        <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-300 animate-pulse">Initializing Assessment...</h2>
        <div id="error-message-area" class="hidden mt-4 text-center max-w-md px-4">
            <p id="error-text" class="text-red-500 mb-4"></p>
            <button onclick="history.back()" class="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition">Go Back</button>
        </div>
    </div>

    <div id="quiz-container" class="hidden w-full max-w-4xl mx-auto relative z-10 transition-all duration-500">
        <div class="glass-panel shadow-2xl rounded-2xl overflow-hidden relative">
            <div class="w-full bg-gray-200 dark:bg-slate-700 h-1.5">
                <div id="progress-bar" class="bg-primary h-1.5 transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style="width: 0%"></div>
            </div>

            <header class="flex flex-col md:flex-row justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700/50 gap-4">
                <div class="w-full md:w-auto">
                    <div class="flex items-center gap-3">
                        <h2 id="quiz-title" class="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Loading...</h2>
                        <button id="theme-toggle" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">
                            <i class="fa-solid fa-sun hidden" id="sun-icon"></i>
                            <i class="fa-solid fa-moon" id="moon-icon"></i>
                        </button>
                    </div>
                    <p class="text-xs font-semibold text-primary uppercase tracking-wider mt-1" id="question-meta">Question 1</p>
                </div>
                
                <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <button id="pause-btn" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <i class="fa-solid fa-pause"></i> Pause
                    </button>
                    <button id="resume-btn" class="hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors shadow-lg shadow-green-500/20">
                        <i class="fa-solid fa-play"></i> Resume
                    </button>
                    
                    <button id="end-quiz-early-btn" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg shadow-red-500/20">
                        <i class="fa-solid fa-flag-checkered"></i> End Quiz
                    </button>
                    
                    <div id="timer-box" class="flex items-center gap-2 px-5 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50 rounded-full font-mono font-bold shadow-sm transition-colors">
                        <i class="fa-regular fa-clock"></i> <span id="time-display">00:00</span>
                    </div>
                </div>
            </header>   
            <main class="p-6 md:p-10 relative max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                <div id="paused-overlay" class="hidden absolute inset-0 z-20 backdrop-blur-md bg-white/30 dark:bg-black/30 flex flex-col items-center justify-center rounded-b-2xl">
                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm border border-slate-200 dark:border-slate-700">
                        <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-pause text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quiz Paused</h3>
                        <p class="text-slate-500 dark:text-slate-400 mb-6">Timer stopped.</p>
                        <button onclick="togglePause(false)" class="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all">Resume Quiz</button>
                    </div>
                </div>

                <h2 id="question-text" class="text-lg md:text-2xl font-medium text-slate-800 dark:text-slate-100 mb-8 leading-relaxed"></h2>
                <div id="options-area" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                
                <div id="violation-overlay" class="hidden absolute inset-0 z-30 backdrop-blur-xl bg-red-500/20 flex flex-col items-center justify-center rounded-b-2xl">
    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm border-2 border-red-500">
        <h3 class="text-2xl font-bold text-red-600 mb-2">Security Warning</h3>
        <p id="violation-msg" class="text-slate-600 dark:text-slate-400 mb-6 font-medium"></p>
        <button id="close-violation" class="w-full py-3 bg-red-600 text-white rounded-xl font-semibold">I Understand</button>
    </div>
</div>

            </main>

            <footer class="p-6 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex gap-3 w-full md:w-auto">
                    <button id="prev-btn" class="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-all disabled:opacity-50">Previous</button>
                    <button id="next-btn" class="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-white font-medium bg-primary shadow-lg shadow-indigo-500/30 hover:bg-primaryHover transition-all">Next</button>
                    <button id="submit-btn" class="hidden flex-1 md:flex-none px-6 py-2.5 rounded-xl text-white font-medium bg-green-500 shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all">Submit Quiz</button>
                </div>
                <button id="save-btn" class="w-full md:w-auto text-slate-500 dark:text-slate-400 font-medium hover:text-primary dark:hover:text-primaryHover transition-colors flex items-center justify-center gap-2 px-4 py-2">
                    <i class="fa-regular fa-bookmark"></i> Save & Exit
                </button>
            </footer>
        </div>
    </div>

    <div id="result-box" class="hidden fixed inset-0 z-[80] bg-slate-50 dark:bg-darkBg overflow-y-auto p-4 transition-opacity duration-500 w-full h-full">
        <div class="max-w-7xl mx-auto py-8">
            <div class="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-white" id="res-quiz-title">Quiz Title</h1>
                    <p class="mt-1 text-slate-500 dark:text-slate-400">Result Analysis & Performance Review</p>
                </div>
                <div class="mt-4 sm:mt-0">
                    <span id="res-status-badge" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Completed</span>
                </div>
            </div>

            <div class="border-b border-slate-200 dark:border-slate-700 mb-6">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onclick="switchTab('summary')" id="tab-summary" class="tab-active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
                        <i class="fa-solid fa-chart-pie mr-2"></i> Summary
                    </button>
                    <button onclick="switchTab('detailed')" id="tab-detailed" class="tab-inactive whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
                        <i class="fa-solid fa-list-check mr-2"></i> Detailed Review
                    </button>
                    <button onclick="switchTab('history')" id="tab-history" class="tab-inactive whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
                        <i class="fa-solid fa-clock-rotate-left mr-2"></i> Attempt History
                    </button>
                    
                    <button onclick="switchTab('video')" id="tab-video" class="tab-inactive whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
                        <i class="fa-solid fa-clapperboard mr-2"></i> Video Solution
                    </button>
                    
                </nav>
            </div>

            <div id="view-summary" class="space-y-6 animate-fade-in">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="glass-panel rounded-xl p-6 relative overflow-hidden">
                        <dt class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">Total Score</dt>
                        <dd class="mt-1 text-3xl font-bold text-brand-600 dark:text-brand-500" id="res-score">0/0</dd>
                        <div class="absolute top-0 right-0 p-4 opacity-10"><i class="fa-solid fa-trophy text-6xl text-brand-600"></i></div>
                    </div>
                    <div class="glass-panel rounded-xl p-6">
                        <dt class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">Accuracy</dt>
                        <dd class="mt-1 text-3xl font-bold text-slate-900 dark:text-white" id="res-accuracy">0%</dd>
                        <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mt-3">
                            <div id="res-accuracy-bar" class="bg-emerald-500 h-1.5 rounded-full" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="glass-panel rounded-xl p-6">
                        <dt class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">Total Time</dt>
                        <dd class="mt-1 text-3xl font-bold text-slate-900 dark:text-white" id="res-time">--:--</dd>
                        <p class="text-xs text-slate-400 mt-2">Avg. <span id="res-avg-time">0s</span> / question</p>
                    </div>
                    <div class="glass-panel rounded-xl p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
                        <dt class="text-sm font-medium text-slate-400 truncate">Percentile Rank</dt>
                        <dd class="mt-1 text-3xl font-bold text-white flex items-center">
                            <span id="res-rank">Top --%</span>
                            <i class="fa-solid fa-arrow-trend-up text-green-400 ml-2 text-lg"></i>
                        </dd>
                        <p class="text-xs text-slate-400 mt-2">Based on performance</p>
                    </div>
                </div>
                <div class="flex justify-center mt-10">
                    <button onclick="window.location.replace('/quiz/dashboard.html')" class="inline-flex items-center justify-center px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                        Go to Dashboard
                    </button>
                </div>
            </div>

            <div id="view-detailed" class="hidden space-y-6 animate-fade-in">
                <div class="flex flex-wrap gap-2 mb-6">
                    <button onclick="filterResults('all')" id="filter-all" class="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white shadow-sm transition">All</button>
                    <button onclick="filterResults('correct')" id="filter-correct" class="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Correct</button>
                    <button onclick="filterResults('incorrect')" id="filter-incorrect" class="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Incorrect</button>
                </div>
                <div id="detailed-list" class="space-y-4"></div>
            </div>

            <div id="view-history" class="hidden space-y-4 animate-fade-in">
                <h3 class="text-lg font-medium text-slate-800 dark:text-white mb-4">Past Attempts</h3>
                <div id="history-list" class="space-y-4">
                    </div>
            </div>
            
            <div id="view-video" class="hidden space-y-6 animate-fade-in">
    <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
            <h3 class="text-lg font-medium text-slate-800 dark:text-white mb-4">
                <i class="fa-solid fa-film text-primary mr-2"></i> Full Solution
            </h3>
            <div id="video-content-area">
                </div>
        </div>

        <div class="w-full md:w-80 space-y-4">
            <div class="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 class="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">Quick Notes</h4>
                <p class="text-xs text-slate-400 italic">Timestamp notes coming soon...</p>
                <div id="video-notes-area" class="min-h-[100px]"></div>
            </div>
        </div>
    </div>
</div>

        </div>
    </div>

    <div id="exit-modal" class="hidden fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in border border-slate-100 dark:border-slate-700">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Unsaved Progress</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">If you leave now without saving, your progress will be lost.</p>
            <div class="flex gap-3">
                <button id="modal-cancel" class="flex-1 px-4 py-2 border rounded-xl dark:border-slate-600 dark:text-slate-300">Stay</button>
                <button id="modal-save" class="flex-1 px-4 py-2 bg-primary text-white rounded-xl shadow-lg">Save & Exit</button>
            </div>
        </div>
    </div>

    <div id="resume-modal" class="hidden fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Resume Quiz?</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">We found a saved attempt.</p>
            <div class="flex flex-col gap-3">
                <button id="btn-resume-attempt" class="w-full px-4 py-3 bg-primary text-white rounded-xl font-bold">Resume</button>
                <button id="btn-restart-attempt" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl">Start Fresh</button>
            </div>
        </div>
    </div>

    <div id="setup-modal" class="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
            
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
            
            <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-2 relative z-10">Quiz Setup</h3>
            <p class="text-slate-500 dark:text-slate-400 mb-6 relative z-10">Customize your practice session for <span id="setup-quiz-title" class="font-bold text-primary"></span>.</p>
            
            <div class="space-y-6 relative z-10">
                
                <div>
                    <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Mode</label>
                    <div class="grid grid-cols-2 gap-4">
                        <label class="cursor-pointer">
                            <input type="radio" name="quiz_mode" value="test" class="peer sr-only" checked onchange="toggleModeDescription('test')">
                            <div class="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-primary peer-checked:bg-indigo-50 dark:peer-checked:bg-primary/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <div class="flex items-center mb-1">
                                    <i class="fa-solid fa-stopwatch text-xl text-slate-400 peer-checked:text-primary mr-3"></i>
                                    <span class="font-bold text-slate-700 dark:text-white">Test Mode</span>
                                </div>
                                <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">Submit at the end. Simulates real exam conditions.</p>
                            </div>
                        </label>
                        
                        <label class="cursor-pointer">
                            <input type="radio" name="quiz_mode" value="quiz" class="peer sr-only" onchange="toggleModeDescription('quiz')">
                            <div class="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-500/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <div class="flex items-center mb-1">
                                    <i class="fa-solid fa-graduation-cap text-xl text-slate-400 peer-checked:text-green-500 mr-3"></i>
                                    <span class="font-bold text-slate-700 dark:text-white">Quiz Mode</span>
                                </div>
                                <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">Immediate feedback. Check answers as you go.</p>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Question Set</label>
                    <select id="setup-question-set" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Time Limit</label>
                    <select id="setup-timer" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                    </select>
                </div>
                
                <div class="flex gap-3 pt-2">
                    <button onclick="window.location.replace('/index.html')" class="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition">Back</button>
                    <button id="btn-start-custom" class="flex-[2] px-4 py-3 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition transform active:scale-95">Start Practice</button>
                </div>
            </div>
            
            
<div class="mt-4">
    <button id="btn-view-last-result" class="w-full py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
        <i class="fa-solid fa-clock-rotate-left"></i> View Previous Result
    </button>
</div>

        </div>
    </div>    

    <div id="gemini-api-modal" class="fixed inset-0 z-[100] hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700 transform transition-all scale-100">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-robot text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">Unlock AI Explanations</h2>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                    To get detailed explanations for your answers, please enter your personal <strong>Google Gemini API Key</strong>.
                </p>
            </div>

            <div id="gemini-error-message" class="hidden p-3 mb-4 text-sm font-medium text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-400" role="alert">
                </div>

            <div class="space-y-4">
                <div>
                    <label for="gemini-api-key-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">API Key</label>
                    <input type="password" id="gemini-api-key-input" placeholder="Paste your API Key here (AIza...)"
                           class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white transition-all outline-none">
                    <p class="text-xs text-slate-500 mt-1">Your key is saved locally to your profile.</p>
                </div>

                <button id="modal-save-gemini-key" class="w-full py-3 bg-primary hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95">
                    Save & Get Explanation
                </button>
                
                <div class="grid grid-cols-2 gap-3 pt-2">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <i class="fa-solid fa-key mr-2"></i> Get Key
                    </a>
                     <a href="Gemini.html"  class="flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <i class="fa-solid fa-book mr-2"></i> Guide
                    </a>
                </div>

                <button id="modal-cancel-gemini-key" class="w-full py-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    </div>


    <div id="why-gemini-modal" class="fixed inset-0 z-[101] hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-200 dark:border-slate-700 transform transition-all scale-100">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
                <i class="fa-solid fa-lightbulb mr-3"></i> Why Do I Need the Gemini API?
            </h2>
            
            <p class="text-slate-600 dark:text-slate-400 mb-4">
                This quiz application uses **Google Gemini's AI** to provide **personalized, in-depth explanations** for every question you attempt.
            </p>

            <ul class="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-6 ml-4">
                <li>**Personalized Feedback:** Get an explanation tailored to whether your answer was correct or incorrect.</li>
                <li>**Deeper Learning:** Go beyond the correct option with detailed concepts and supplementary information.</li>
                <li>**Privacy:** By using your own key, the explanation generation is linked directly to your Google AI account, ensuring usage is attributed to you.</li>
            </ul>

            <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-3">How to Get Your Key:</h3>
            
            <ol class="space-y-3 mb-6">
                <li class="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                    1. Click the **'Get API Key'** button below.
                </li>
                <li class="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                    2. Sign in with your Google account and click **"Create API Key."**
                </li>
                <li class="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                    3. **Copy the key** and paste it into the optional field.
                </li>
            </ol>

            <div class="flex justify-between space-x-3">
                <a href="https://aistudio.google.com/app/apikey" target="_blank" class="flex-1 text-center py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors">
                    <i class="fa-solid fa-key mr-2"></i> Get API Key
                </a>
                <button id="close-why-gemini-modal" class="flex-1 py-3 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    Close
                </button>
            </div>
        </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <script src="auth.js"></script>
    <script src="quiz.js"></script>
    <script src="result.js"></script>
    <script src="vedio.js"></script>
    <script>
        // Advanced Zoom Modal with Scale functionality
        const setupImageModal = () => {
            if (document.getElementById('img-zoom-modal')) return;

            const modalHtml = `
            <div id="img-zoom-modal" class="fixed inset-0 z-[9999] hidden bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300">
                
                <div class="absolute top-4 right-4 flex gap-4 z-[210]">
                    <button onclick="zoomImage(0.2)" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
                    <button onclick="zoomImage(-0.2)" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
                    <button onclick="closeZoomModal()" class="p-3 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <div class="relative w-full h-full flex items-center justify-center overflow-hidden" onwheel="handleWheel(event)">
                    <img id="img-zoom-target" src="" class="max-w-none transition-transform duration-200 cursor-grab active:cursor-grabbing" style="transform: scale(1);">
                </div>
                
                <p class="absolute bottom-6 text-white/50 text-sm">Scroll to zoom • Drag to move</p>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Drag Logic
            const img = document.getElementById('img-zoom-target');
            let isDragging = false, startX, startY, translateX = 0, translateY = 0, scale = 1;

            img.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX - translateX; startY = e.clientY - translateY; });
            window.addEventListener('mouseup', () => isDragging = false);
            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                updateTransform();
            });

            window.zoomImage = (delta) => {
                scale += delta;
                if (scale < 0.5) scale = 0.5;
                if (scale > 5) scale = 5;
                updateTransform();
            };

            window.handleWheel = (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                zoomImage(delta);
            }

            function updateTransform() {
                img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            }
            
            window.closeZoomModal = () => {
                 document.getElementById('img-zoom-modal').classList.add('hidden');
                 // Reset
                 scale = 1; translateX = 0; translateY = 0; updateTransform();
            };
        };

        window.openImageZoom = (src) => {
            setupImageModal();
            const modal = document.getElementById('img-zoom-modal');
            const target = document.getElementById('img-zoom-target');
            target.src = src;
            modal.classList.remove('hidden');
        };
    </script>


</body>
</html>

================================================================================
// File: quiz/result.js
================================================================================
let currentResultData = null;
let currentQuestionForExplanation = null; 
let explanationCache = {};

const resultEls = {
    resultBox: document.getElementById('result-box'),
    container: document.getElementById('quiz-container'),
    title: document.getElementById('quiz-title'), 
    submit: document.getElementById('submit-btn'), 
    resTitle: document.getElementById('res-quiz-title'),
    resScore: document.getElementById('res-score'),
    resAccuracy: document.getElementById('res-accuracy'),
    resAccBar: document.getElementById('res-accuracy-bar'),
    resTime: document.getElementById('res-time'),
    resAvgTime: document.getElementById('res-avg-time'),
    resRank: document.getElementById('res-rank'),
    detailedList: document.getElementById('detailed-list'),
    historyList: document.getElementById('history-list'),
    apiModal: document.getElementById('gemini-api-modal'),
    apiKeyInput: document.getElementById('gemini-api-key-input'),
    saveKeyBtn: document.getElementById('modal-save-gemini-key'),
    cancelKeyBtn: document.getElementById('modal-cancel-gemini-key'),
    apiErrorMsg: document.getElementById('gemini-error-message'), 
    
};



const markdownToHtml = (markdown) => {
    let html = markdown;
    html = html.replace(/^###\s*(.*)$/gm, '<h4 class="text-lg font-semibold text-primary mt-4 mb-2">$1</h4>');
    html = html.replace(/^##\s*(.*)$/gm, '<h5 class="text-md font-bold mt-3 mb-1">$1</h5>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\s*\*\s*(.*)$/gm, '<p class="ml-4 flex items-start mt-1 text-sm"><span class="mr-2 text-primary">&bull;</span> $1</p>');
    html = html.replace(/^\s*(\d+)\.\s*(.*)$/gm, '<p class="ml-2 flex items-start mt-1 text-sm"><span class="mr-2 font-bold">$1.</span> $2</p>');
    html = html.replace(/```([\s\S]*?)```/g, function(match, code) {
        return '<pre class="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-x-auto text-xs my-2"><code>' + code.trim() + '</code></pre>';
    });
    html = html.replace(/\n(?!<h|&bull;|[0-9]\.|<pre)/g, '<br>');
    html = html.replace(/(\r\n|\r|\n){2}/g, '</p><p>');
    if (!html.startsWith('<h') && !html.startsWith('<p') && !html.startsWith('<pre')) {
        html = `<p>${html}</p>`;
    }
    return html;
};

const showGeminiApiModal = (errorMessage = null, questionDetails = null) => {
    resultEls.apiModal.classList.remove('hidden');
    resultEls.apiKeyInput.value = userGeminiApiKey || ''; 
    currentQuestionForExplanation = questionDetails || currentQuestionForExplanation;
    
    if (errorMessage) {
        resultEls.apiErrorMsg.textContent = errorMessage;
        resultEls.apiErrorMsg.classList.remove('hidden');
    } else {
        resultEls.apiErrorMsg.classList.add('hidden');
    }
    
    resultEls.saveKeyBtn.onclick = () => {
        const key = resultEls.apiKeyInput.value.trim();
        if (key) {
            saveUserApiKey(key);
        } else {
            alert("Please enter a valid API key.");
        }
    };
    
    resultEls.cancelKeyBtn.onclick = () => {
        resultEls.apiModal.classList.add('hidden');
        resultEls.apiErrorMsg.classList.add('hidden'); 
        currentQuestionForExplanation = null;
    };
};


const saveUserApiKey = async (key) => {
    if (!CURRENT_USER_ID) return console.error("❌ Error (Result.js): User ID not available to save API key.");
    try {
        await db.collection('users').doc(CURRENT_USER_ID).set({
            geminiApiKey: key,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        userGeminiApiKey = key; 
        alert("Gemini API Key saved successfully! You can now get explanations.");
        resultEls.apiModal.classList.add('hidden');
        // Clear error message on success
        resultEls.apiErrorMsg.classList.add('hidden');
        
        console.log("✅ Success (Result.js): New Gemini API Key saved to Firestore.");
        
        if (currentQuestionForExplanation) {
            console.log("Info (Result.js): Attempting to fetch explanation after successful key save.");
            const details = currentQuestionForExplanation;
            currentQuestionForExplanation = null; 
            fetchExplanation(details, false); 
        }
    } catch (e) {
        console.error("❌ Error (Result.js): Failed to save API key to Firestore.", e);
        alert("Failed to save API key. Please check Firebase permissions.");
    }
};

const showApiKeyModal = (questionDetails) => {
    showGeminiApiModal("Please enter your Gemini API Key to use the AI explanation feature.", questionDetails);
};



const toggleExplanation = (explanationId, qId) => {
    const contentDiv = document.getElementById(explanationId);
    const toggleIcon = document.getElementById(`toggle-icon-${qId}`);
    const toggleText = document.getElementById(`toggle-text-${qId}`);
    const regenerateBtn = document.getElementById(`regenerate-btn-${qId}`);
    
    const ans = currentResultData.answers.find(a => a.qId === qId);
    const cachedHtml = ans?.generatedExplanation || explanationCache[qId];

    if (contentDiv.classList.contains('hidden')) {
        contentDiv.classList.remove('hidden');
        toggleIcon.className = 'fa-solid fa-chevron-up mr-2';
        toggleText.textContent = 'Minimize Explanation';
        if (regenerateBtn) regenerateBtn.classList.remove('hidden');
        if (!cachedHtml) {
            if (ans) {
                const questionDetails = {
                    qId: ans.qId,
                    qText: ans.qText,
                    userAnswer: ans.userAnswer || '',
                    correctAnswer: ans.correctAnswer,
                    explanationId: explanationId
                };
                fetchExplanation(questionDetails, false); 
            }
        }
    } else {
        contentDiv.classList.add('hidden');
        
        if (cachedHtml || contentDiv.children.length > 0) {
            toggleIcon.className = 'fa-solid fa-robot mr-2';
            toggleText.textContent = 'Show AI Explanation';
        }
        if (regenerateBtn) regenerateBtn.classList.add('hidden');
    }
};

// --- GEMINI EXPLANATION LOGIC (with Caching and Regeneration) ---

const fetchExplanation = async (questionDetails, isRegenerate = false) => {
    const { qId, qText, userAnswer, correctAnswer, explanationId } = questionDetails;
    
    const explanationElement = document.getElementById(explanationId);
    
    if (!userGeminiApiKey) {
        explanationElement.classList.remove('hidden'); 
        showApiKeyModal(questionDetails);
        return; 
    }
    
    const ans = currentResultData.answers.find(a => a.qId === qId);
    const cachedHtml = ans?.generatedExplanation || explanationCache[qId];

    if (cachedHtml && !isRegenerate) {
        console.log("Info (Result.js): Explanation found in cache. Rendering cached content.");
        
        explanationElement.innerHTML = `
            <div class="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                <h4 class="font-bold text-primary mb-2">Detailed Explanation:</h4>
                <div class="text-sm text-slate-700 dark:text-slate-300">
                    ${cachedHtml}
                </div>
            </div>
        `;
        renderMath(explanationElement);
        explanationElement.classList.remove('hidden');
        document.getElementById(`toggle-icon-${qId}`).className = 'fa-solid fa-chevron-up mr-2';
        document.getElementById(`toggle-text-${qId}`).textContent = 'Minimize Explanation';
        document.getElementById(`regenerate-btn-${qId}`)?.classList.remove('hidden');
        return;
    }


    explanationElement.innerHTML = `<p class="text-center py-2 text-primary font-medium"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Generating explanation...</p>`;

    const originalQuestion = questions.find(q => q.id === qId) || {};
    const userAns = originalQuestion.options ? originalQuestion.options[userAnswer] : userAnswer || 'Skipped';
    const correctAns = originalQuestion.options ? originalQuestion.options[correctAnswer] : correctAnswer;
    
    const prompt = `
        You are a helpful and detailed quiz explanation generator.
        Context: The user is reviewing a quiz question.
        
        Question: "${qText}"
        Correct Answer: "${correctAns}"
        User's Answer: "${userAns}"
        
        Task: Provide a concise, educational, and easy-to-understand explanation for this question. 
        If the user was incorrect or skipped, first explain WHY the correct answer is right, and then briefly explain why the user's selected answer (if any) was incorrect. 
        If the user was correct, confirm their answer and provide deeper context or supplementary facts related to the topic.
        Format the response using simple Markdown (like **bold**, ### headings, * bullet points, and code blocks using three backticks).
    `;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userGeminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { error: { message: "Could not parse API error response." } };
            }
            
            let errorMessage = "The Gemini API call failed due to an unknown error. Please try again or update your API key.";
            const responseStatus = response.status;
            const apiErrorMsg = errorData.error?.message;

            if (responseStatus === 400 && apiErrorMsg && (apiErrorMsg.includes("API key not valid") || apiErrorMsg.includes("Invalid API Key"))) {
                errorMessage = "Your Gemini API Key is invalid or has expired. Please update it to continue using the AI explanation feature.";
            } else if (responseStatus === 429) {
                errorMessage = "You have reached the API rate limit for this key. Please try again later, or update your key if you believe this is an error.";
            } else if (responseStatus === 403) {
                 errorMessage = "Access denied (403). Your API key may not have the necessary permissions or the request is blocked. Please check your key status.";
            }
            
            showGeminiApiModal(errorMessage, questionDetails);
            throw new Error(`Gemini API Error (Status: ${responseStatus}): ${errorMessage}`);
        }

        const data = await response.json();
        const explanationText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate an explanation. Check your API key and usage limits.";
        
        console.log("✅ Success (Result.js): Fetched explanation from Gemini API for question:", qId);

        const formattedHtml = markdownToHtml(explanationText);
        
        if (ans) {
             ans.generatedExplanation = formattedHtml; 
        }
        explanationCache[qId] = formattedHtml; 

        // 5. Render the explanation text
        explanationElement.innerHTML = `
            <div class="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                <h4 class="font-bold text-primary mb-2">Detailed Explanation:</h4>
                <div class="text-sm text-slate-700 dark:text-slate-300">
                    ${formattedHtml}
                </div>
            </div>
        `;
        renderMath(explanationElement);
        
        const safeQText = qText.replace(/`/g, '\\`').replace(/'/g, '\\\'').replace(/"/g, '&quot;');
        const btnContainer = document.getElementById(`toggle-btn-${qId}`).parentNode;

        document.getElementById(`toggle-icon-${qId}`).className = 'fa-solid fa-chevron-up mr-2';
        document.getElementById(`toggle-text-${qId}`).textContent = 'Minimize Explanation';
        explanationElement.classList.remove('hidden');
        
        if (!document.getElementById(`regenerate-btn-${qId}`)) {
             const regenerateHtml = `<button id="regenerate-btn-${qId}" class="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                onclick='fetchExplanation({
                    qId: "${ans.qId}", 
                    qText: "${safeQText}", 
                    userAnswer: "${ans.userAnswer || ''}", 
                    correctAnswer: "${ans.correctAnswer}", 
                    explanationId: "${explanationId}"
                }, true)'>
                <i class="fa-solid fa-arrows-rotate mr-1"></i> Regenerate
            </button>`;
            btnContainer.insertAdjacentHTML('beforeend', regenerateHtml);
        }
        document.getElementById(`regenerate-btn-${qId}`).classList.remove('hidden');


    } catch (error) {
        console.error("❌ Error (Result.js): Gemini API Call Failed.", error);
        
        if (!error.message.includes('Gemini API Error')) {
            explanationElement.innerHTML = `
                <p class="text-red-500 mt-4"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Network or client error generating explanation. Try again.</p>
            `;
        } else {
             explanationElement.innerHTML = `
                <p class="text-red-500 mt-4"><i class="fa-solid fa-triangle-exclamation mr-2"></i> ${error.message.split('- ')[1]}</p>
            `;
        }

        document.getElementById(`toggle-icon-${qId}`).className = 'fa-solid fa-robot mr-2';
        document.getElementById(`toggle-text-${qId}`).textContent = 'Get AI Explanation (Gemini)';
        document.getElementById(`regenerate-btn-${qId}`)?.classList.add('hidden');
    }
};

// --- SUBMISSION & RANK CALCULATION ---

const calculateRank = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Top 5%";
    if (percentage >= 80) return "Top 10%";
    if (percentage >= 60) return "Top 25%";
    if (percentage >= 40) return "Top 50%";
    return "Top 80%";
};

const submitQuiz = async (isTimeout = false) => {
    clearInterval(timerInterval); 
    resultEls.submit.disabled = true;
    resultEls.submit.innerHTML = '<span class="loader w-4 h-4 border-2 mr-2 inline-block"></span> Processing...';

    let score = 0;
    const detailed = questions.map(q => {
        const u = userAnswers[q.id];
        const isCorrect = u === q.answer;
        if(isCorrect) score++;
        const timeSpent = 20;
        return { qId: q.id, qText: q.question, imageUrl: q.imageUrl || null, userAnswer: u||null, correctAnswer: q.answer, isCorrect, timeSpent };
    });

    const totalQuizDuration = questions.length > 0 && questions[0].durationMinutes ? (questions[0].durationMinutes * 60) : (questions.length * 60);
    const totalTimeSpent = totalQuizDuration - timeLeft; 
    const formattedTime = formatTime(totalTimeSpent > 0 ? totalTimeSpent : 0);
    
    const resultData = {
        quizId: currentQuizId,
        quizTitle: resultEls.title.textContent,
        score, total: questions.length,
        answers: detailed,
        status: isTimeout ? 'Timed Out' : 'Completed',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        timeTaken: formattedTime,
        totalTimeSeconds: totalTimeSpent,
        rank: calculateRank(score, questions.length)
    };

    try {
        // 1. Save Result
        await db.collection('user_results').doc(CURRENT_USER_ID).collection('attempts').add(resultData);
        console.log("✅ Success (Result.js): Quiz result saved successfully.");
        
        // 2. Clear Progress
        const progRef = db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(currentQuizId);
        const progDoc = await progRef.get();
        if(progDoc.exists) await progRef.delete(); 
        
        // 3. Render
        renderFinalResult(resultData);
        window.onpopstate = null; 

    } catch(e) {
        console.error("❌ Error (Result.js): Error submitting quiz result to Firebase.", e);
        alert("Error submitting. Please check connection and Firebase permissions.");
        resultEls.submit.disabled = false;
        resultEls.submit.innerHTML = 'Submit Quiz';
    }
};

// --- RESULT VIEW & TABS ---

function updateSummaryData(data) {
    resultEls.resTitle.textContent = data.quizTitle;

    const pct = Math.round((data.score / data.total) * 100);
    resultEls.resScore.textContent = `${data.score} / ${data.total}`;
    resultEls.resAccuracy.textContent = `${pct}%`;
    resultEls.resAccBar.style.width = `${pct}%`;
    resultEls.resTime.textContent = data.timeTaken;
    resultEls.resRank.textContent = data.rank || "Top 50%";
    
    const avg = data.total > 0 ? Math.round(data.totalTimeSeconds / data.total) : 0;
    resultEls.resAvgTime.textContent = `${avg}s`;
}

function renderFinalResult(data) {
    currentResultData = data;
    explanationCache = {};
    resultEls.container.classList.add('hidden');
    resultEls.resultBox.classList.remove('hidden');

    updateSummaryData(data);
    filterResults('all'); 
    fetchHistory(); 
}

function switchTab(tab) {
    ['summary', 'detailed', 'history', 'video'].forEach(t => { // Added 'video'
        const btn = document.getElementById(`tab-${t}`);
        const view = document.getElementById(`view-${t}`);
        if (btn && view) {
            if (t === tab) {
                btn.className = "tab-active whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center";
                view.classList.remove('hidden');
                
                // Trigger video load only when tab is clicked
                if (tab === 'video' && typeof loadVideoSolution === 'function') {
                    // Pass the currentQuizId which is global in auth.js/result.js context
                    loadVideoSolution(currentQuizId); 
                }
            } else {
                btn.className = "tab-inactive whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center";
                view.classList.add('hidden');
            }
        }
    });

    if (tab === 'detailed') renderMath(resultEls.detailedList);
}

// Set up tab listeners once
if (document.getElementById('tab-summary')) document.getElementById('tab-summary').onclick = () => switchTab('summary');
if (document.getElementById('tab-detailed')) document.getElementById('tab-detailed').onclick = () => switchTab('detailed');
if (document.getElementById('tab-history')) document.getElementById('tab-history').onclick = () => switchTab('history');
if (document.getElementById('tab-video')) document.getElementById('tab-video').onclick = () => switchTab('video');


function filterResults(type) {
    if(!currentResultData) return;
    
    // Update filter buttons
    ['all','correct','incorrect'].forEach(f => {
        const btn = document.getElementById(`filter-${f}`);
        if(btn) { 
            if(f === type) btn.className = "px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white shadow-sm transition";
            else btn.className = "px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50";
            btn.onclick = () => filterResults(f);
        }
    });

    resultEls.detailedList.innerHTML = '';
    
    const filtered = currentResultData.answers.filter(a => {
        if(type === 'correct') return a.isCorrect;
        if(type === 'incorrect') return !a.isCorrect;
        return true;
    });

    if(filtered.length === 0) {
        resultEls.detailedList.innerHTML = `<p class="text-center text-gray-500 py-8">No questions match this filter.</p>`;
        return;
    }
    
    filtered.forEach((ans, idx) => {
        // 1. Prepare Status Variables
        const status = ans.isCorrect ? 'Correct' : 'Incorrect';
        const colorClass = ans.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
        const borderClass = ans.isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500';
        const icon = ans.isCorrect ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>';
        
        // 2. Retrieve Original Question Data & Safe Text for JS
        const originalQuestion = questions.find(q => q.id === ans.qId) || {};
        const explanationId = `explanation-for-${ans.qId}`;
        const userAnswerText = ans.userAnswer ? (originalQuestion.options ? originalQuestion.options[ans.userAnswer] : ans.userAnswer) : 'Skipped';
        const correctAnswerText = originalQuestion.options ? originalQuestion.options[ans.correctAnswer] : ans.correctAnswer;
        
        // Escape special characters for the Regenerate button's onclick handler
        const safeQText = ans.qText.replace(/`/g, '\\`').replace(/'/g, '\\\'').replace(/"/g, '&quot;');

        // 3. Prepare Explanation State
        const cachedExplanationHtml = ans.generatedExplanation || explanationCache[ans.qId];
        const isGenerated = !!cachedExplanationHtml;
        const explanationVisibleClass = isGenerated ? '' : 'hidden'; 
        const toggleButtonIcon = isGenerated ? 'fa-solid fa-chevron-up' : 'fa-solid fa-robot';
        const toggleButtonText = isGenerated ? 'Minimize Explanation' : 'Get AI Explanation';

        const initialExplanationContent = cachedExplanationHtml ? `
            <div class="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                <h4 class="font-bold text-primary mb-2">Detailed Explanation:</h4>
                <div class="text-sm text-slate-700 dark:text-slate-300">
                    ${cachedExplanationHtml}
                </div>
            </div>
        ` : '';

        // 4. Generate Image HTML (New Logic)
        let imageHtml = '';
        if (ans.imageUrl) {
            imageHtml = `
                <div class="mb-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                    <div class="relative group w-full max-w-md">
                        <img src="${ans.imageUrl}" 
                             class="w-full h-auto max-h-60 object-contain rounded-md cursor-zoom-in bg-white dark:bg-slate-800"
                             onclick="window.openImageZoom('${ans.imageUrl}')"
                             alt="Question Reference">
                             
                        <a href="${ans.imageUrl}" 
                           target="_blank" 
                           download="question-${idx+1}.jpg"
                           class="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 p-2 rounded-full shadow-lg hover:text-primary transition opacity-0 group-hover:opacity-100"
                           title="Download Image">
                           <i class="fa-solid fa-download"></i>
                        </a>
                    </div>
                    <p class="text-xs text-slate-400 mt-2">
                        <i class="fa-solid fa-magnifying-glass"></i> Click to zoom • 
                        <i class="fa-solid fa-download"></i> Hover to download
                    </p>
                </div>
            `;
        }

        // 5. Build Final Card HTML
        const card = document.createElement('div');
        card.className = `glass-panel rounded-lg p-5 transition hover:shadow-md ${borderClass} mb-4`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-slate-400 uppercase">Q${idx+1}</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}">
                        ${icon} <span class="ml-1">${status}</span>
                    </span>
                </div>
                <span class="text-xs text-slate-500"><i class="fa-regular fa-clock mr-1"></i> ${ans.timeSpent}s</span>
            </div>
            
            ${imageHtml}
            
            <h3 class="text-md font-medium text-slate-800 dark:text-white mb-4">${ans.qText}</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="p-3 bg-slate-50 dark:bg-slate-700/50 rounded border border-slate-100 dark:border-slate-600">
                    <span class="block text-xs text-slate-400 mb-1">Your Answer: ${ans.userAnswer || '-'}</span>
                    <span class="font-medium ${ans.isCorrect ? 'text-green-600' : 'text-red-600'}">${userAnswerText}</span>
                </div>
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                    <span class="block text-xs text-green-700 dark:text-green-400 opacity-70 mb-1">Correct Answer: ${ans.correctAnswer}</span>
                    <span class="font-medium text-green-800 dark:text-green-300">${correctAnswerText}</span>
                </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center">
                 <div class="flex space-x-3">
                     <button id="toggle-btn-${ans.qId}" class="text-sm font-medium text-primary hover:text-indigo-600 transition-colors"
                        onclick="toggleExplanation('${explanationId}', '${ans.qId}')">
                        <i id="toggle-icon-${ans.qId}" class="${toggleButtonIcon} mr-2"></i> 
                        <span id="toggle-text-${ans.qId}">${toggleButtonText}</span>
                     </button>
                     
                     <button id="regenerate-btn-${ans.qId}" class="text-xs font-medium text-red-500 hover:text-red-700 transition-colors ${isGenerated ? '' : 'hidden'}"
                        onclick='fetchExplanation({
                            qId: "${ans.qId}", 
                            qText: "${safeQText}", 
                            userAnswer: "${ans.userAnswer || ''}", 
                            correctAnswer: "${ans.correctAnswer}", 
                            explanationId: "${explanationId}"
                        }, true)'>
                        <i class="fa-solid fa-arrows-rotate mr-1"></i> Regenerate
                    </button>
                </div>
            </div>

            <div id="${explanationId}" class="${explanationVisibleClass}">
                ${initialExplanationContent}
            </div>
        `;

        resultEls.detailedList.appendChild(card);
    });


    
    renderMath(resultEls.detailedList);
}

const loadAttemptDetails = async (attemptId) => {
    try {
        const doc = await db.collection('user_results').doc(CURRENT_USER_ID).collection('attempts').doc(attemptId).get();
        if(doc.exists) {
            currentResultData = doc.data();
            updateSummaryData(currentResultData);
            filterResults('all'); 
            switchTab('detailed'); 
            console.log(`Info (Result.js): Loaded details for attempt: ${attemptId}`);
        } else {
            alert('Attempt details not found!');
        }
    } catch(e) {
        console.error('❌ Error (Result.js): Error loading attempt details:', e);
        alert('Could not load attempt details due to a connection error.');
    }
}

const fetchHistory = async () => {
    try {
        const snapshot = await db.collection('user_results').doc(CURRENT_USER_ID).collection('attempts')
            .where('quizId', '==', currentQuizId)
            .get();

        resultEls.historyList.innerHTML = '';
        if(snapshot.empty) {
            resultEls.historyList.innerHTML = "<p>No past attempts found for this quiz.</p>";
            return;
        }

        let attempts = [];
        snapshot.forEach(doc => attempts.push({ id: doc.id, ...doc.data() }));
        attempts.sort((a, b) => {
            const tA = a.timestamp ? a.timestamp.seconds : 0;
            const tB = b.timestamp ? b.timestamp.seconds : 0;
            return tB - tA; 
        });

        attempts.forEach(data => {
            const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() + ' ' + new Date(data.timestamp.toDate()).toLocaleTimeString() : 'Just now';
            const pct = Math.round((data.score / data.total) * 100);
            
            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors";
            div.onclick = () => loadAttemptDetails(data.id); 
            div.innerHTML = `
                <div>
                    <p class="font-bold text-primary">${date} <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-2"></i></p>
                    <p class="text-xs text-slate-500">${data.timeTaken} duration</p>
                </div>
                <div class="text-right">
                    <span class="block text-lg font-bold ${pct >= 70 ? 'text-green-500' : 'text-orange-500'}">${pct}%</span>
                    <span class="text-xs text-slate-400">${data.score}/${data.total}</span>
                </div>
            `;
            resultEls.historyList.appendChild(div);
        });
        console.log(`Info (Result.js): Fetched ${attempts.length} history attempts.`);
    } catch(e) {
        console.error("❌ Error (Result.js): History fetch error:", e);
        resultEls.historyList.innerHTML = "<p class='text-red-500'>Failed to load history.</p>";
    }
};

================================================================================
// File: quiz/vedio.js
================================================================================
// video.js

const videoEls = {
    view: document.getElementById('view-video'),
    container: document.getElementById('video-content-area'),
    notesArea: document.getElementById('video-notes-area'),
};

// Global Player State
let player; 
let updateInterval;
let currentVideoId = '';
const COMPANY_LOGO_URL = '/pictures/neelaxmi.jpg'; // Path to your logo

/**
 * 1. Robust URL Parser
 * Handles Shorts, Live, Standard, and Time params (t=120s)
 */
const parseVideoData = (url) => {
    try {
        // Regex to catch ID and potential 't' (time) parameter
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(?:.*[?&]t=(\w+))?/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return {
                id: match[2],
                startTime: match[3] ? parseInt(match[3].replace('s', '')) : 0
            };
        }
        return null;
    } catch (e) {
        console.error("URL Parsing failed", e);
        return null;
    }
};

/**
 * 2. Main Loader Function
 */
const loadVideoSolution = async (quizId) => {
    console.group(`🎬 Video Solution: ${quizId}`);
    
    // Reset Container
    videoEls.container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-xl">
            <span class="loader w-12 h-12 border-4 border-t-red-600 border-slate-700 rounded-full animate-spin"></span>
            <p class="mt-4 text-slate-400">Loading Player...</p>
        </div>
    `;

    // Ensure YouTube API is loaded
    await ensureYouTubeApiLoaded();

    try {
        const doc = await db.collection('quizzes').doc(quizId).get();
        if (!doc.exists) throw new Error("Quiz not found");
        
        const data = doc.data();
        if (!data.videoSolutionUrl) throw new Error("No video URL provided");

        const videoData = parseVideoData(data.videoSolutionUrl);
        if (!videoData) throw new Error("Invalid YouTube URL");

        currentVideoId = videoData.id;
        renderCustomPlayer(videoData.id, videoData.startTime);

    } catch (e) {
        renderErrorState(e.message);
    }
    console.groupEnd();
};

/**
 * 3. Render the Custom Player UI
 */
const renderCustomPlayer = (videoId, startTime = 0) => {
    videoEls.container.innerHTML = `
        <div id="video-wrapper" class="video-wrapper relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl group paused">
            <div id="yt-player-placeholder" class="absolute inset-0 w-full h-full"></div>

            <img src="${COMPANY_LOGO_URL}" 
                 class="absolute top-4 right-4 w-24 opacity-50 hover:opacity-100 transition-opacity z-20 pointer-events-none" 
                 alt="Company Logo">

            <div class="control-bar absolute bottom-0 left-0 w-full px-4 py-3 z-30 flex flex-col gap-2">
                
                <input type="range" id="seek-bar" value="0" max="100" class="video-range w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer">

                <div class="flex items-center justify-between text-white">
                    <div class="flex items-center gap-4">
                        <button id="btn-play" class="hover:text-red-500 transition"><i class="fa-solid fa-play text-xl"></i></button>
                        
                        <span class="text-xs font-mono tracking-wider">
                            <span id="cur-time">00:00</span> / <span id="dur-time">00:00</span>
                        </span>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="relative group/speed">
                            <button class="text-xs font-bold bg-white/10 px-2 py-1 rounded hover:bg-white/20">1x</button>
                            <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 rounded-lg p-2 hidden group-hover/speed:flex flex-col gap-1 min-w-[60px]">
                                <button onclick="changeSpeed(0.5)" class="text-xs hover:text-red-400 py-1">0.5x</button>
                                <button onclick="changeSpeed(1)" class="text-xs hover:text-red-400 py-1">1.0x</button>
                                <button onclick="changeSpeed(1.5)" class="text-xs hover:text-red-400 py-1">1.5x</button>
                                <button onclick="changeSpeed(2)" class="text-xs hover:text-red-400 py-1">2.0x</button>
                            </div>
                        </div>

                        <button id="btn-snap" class="hover:text-red-500 transition" title="Take Smart Snap">
                            <i class="fa-solid fa-camera"></i>
                        </button>
                        <button id="btn-fs" class="hover:text-red-500 transition"><i class="fa-solid fa-expand"></i></button>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="snapshots-container" class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4"></div>
    `;

    // Initialize YouTube API Player
    player = new YT.Player('yt-player-placeholder', {
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'controls': 0,        // Hide native controls
            'rel': 0,            // Hide related videos
            'modestbranding': 1, // Minimize logo
            'fs': 0,             // Hide native fullscreen button
            'iv_load_policy': 3, // Hide annotations
            'start': startTime
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

/**
 * 4. Player Controller Logic
 */
const onPlayerReady = (event) => {
    const wrapper = document.getElementById('video-wrapper');
    const playBtn = document.getElementById('btn-play');
    const seekBar = document.getElementById('seek-bar');
    const fsBtn = document.getElementById('btn-fs');
    const snapBtn = document.getElementById('btn-snap');

    // Set Total Duration
    document.getElementById('dur-time').innerText = formatTime(player.getDuration());

    // --- Event Listeners ---

    // Play/Pause
    playBtn.addEventListener('click', () => {
        const state = player.getPlayerState();
        if (state === 1) player.pauseVideo();
        else player.playVideo();
    });

    // Seek
    seekBar.addEventListener('input', (e) => {
        const time = (player.getDuration() / 100) * e.target.value;
        player.seekTo(time, true);
    });

    // Fullscreen
    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            wrapper.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
    });

    // Screenshot Logic
    snapBtn.addEventListener('click', async () => {
        const time = player.getCurrentTime();
        await createSmartSnapshot(currentVideoId, time);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (!document.fullscreenElement && !wrapper.contains(document.activeElement)) return;
        
        if (e.code === 'Space') {
            e.preventDefault();
            playBtn.click();
        } else if (e.code === 'ArrowRight') {
            player.seekTo(player.getCurrentTime() + 5, true);
        } else if (e.code === 'ArrowLeft') {
            player.seekTo(player.getCurrentTime() - 5, true);
        }
    });

    // Start Update Loop
    updateInterval = setInterval(updateProgressBar, 500);
};

const onPlayerStateChange = (event) => {
    const wrapper = document.getElementById('video-wrapper');
    const playBtn = document.getElementById('btn-play');

    if (event.data === YT.PlayerState.PLAYING) {
        wrapper.classList.remove('paused');
        playBtn.innerHTML = '<i class="fa-solid fa-pause text-xl"></i>';
    } else {
        wrapper.classList.add('paused');
        playBtn.innerHTML = '<i class="fa-solid fa-play text-xl"></i>';
    }
};

const updateProgressBar = () => {
    if (!player || !player.getCurrentTime) return;
    
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    
    document.getElementById('cur-time').innerText = formatvideoTime(currentTime);
    
    if (duration > 0) {
        document.getElementById('seek-bar').value = (currentTime / duration) * 100;
    }
};

const changeSpeed = (rate) => {
    if(player) player.setPlaybackRate(rate);
};

/**
 * 5. Smart Snapshot Generator
 * Creates a Base64 image using the thumbnail + Timestamp overlay
 */
const createSmartSnapshot = async (vidId, seconds) => {
    // 1. Get High Res Thumbnail
    const thumbUrl = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
    
    // 2. Create a Canvas to composite
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Cross origin is tricky with YouTube, so we fallback to visual UI if fetch fails
    img.crossOrigin = "Anonymous";
    img.src = thumbUrl;

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw Image
        ctx.drawImage(img, 0, 0);

        // Draw Overlay (Dark Gradient at bottom)
        const grad = ctx.createLinearGradient(0, canvas.height - 80, 0, canvas.height);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, "rgba(0,0,0,0.8)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Timestamp Text
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText(`Timestamp: ${formatvideoTime(seconds)}`, canvas.width - 20, canvas.height - 20);

        // Draw Logo/Watermark text
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ef4444"; // Red
        ctx.textAlign = "left";
        ctx.fillText("VIDEO NOTES", 20, canvas.height - 20);

        // Convert to Base64
        const base64Image = canvas.toDataURL("image/jpeg", 0.8);
        
        // Add to UI
        addSnapshotToGallery(base64Image, seconds);
    };

    img.onerror = () => {
        console.warn("Could not load CORS image for canvas, using fallback.");
        // Fallback: Just save metadata
    };
};

const addSnapshotToGallery = (base64, seconds) => {
    const container = document.getElementById('snapshots-container');
    const card = document.createElement('div');
    card.className = "bg-white dark:bg-slate-800 rounded-lg shadow p-2 animate-fade-in cursor-pointer hover:ring-2 ring-red-500 transition";
    card.onclick = () => {
        player.seekTo(seconds, true);
        player.playVideo();
        window.scrollTo({ top: videoEls.container.offsetTop, behavior: 'smooth' });
    };

    card.innerHTML = `
        <div class="relative rounded overflow-hidden mb-2">
            <img src="${base64}" class="w-full object-cover aspect-video">
            <div class="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center transition">
                <i class="fa-solid fa-play text-white opacity-0 hover:opacity-100 drop-shadow-lg text-2xl"></i>
            </div>
        </div>
        <div class="flex justify-between items-center px-1">
            <span class="text-xs font-bold text-slate-500">Jump to ${formatvideoTime(seconds)}</span>
            <i class="fa-solid fa-arrow-turn-up text-xs text-blue-500"></i>
        </div>
    `;
    container.prepend(card);
};

// --- Utilities ---

const formatvideoTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const ensureYouTubeApiLoaded = () => {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
        } else {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = resolve;
        }
    });
};

const renderErrorState = (msg) => {
    videoEls.container.innerHTML = `<div class="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">${msg}</div>`;
};

================================================================================
// File: robots.txt
================================================================================
User-agent: *
Allow: /

Sitemap: https://classupdates.netlify.app/sitemap.xml

================================================================================
// File: sitemap.xml
================================================================================
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://classupdates.netlify.app/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/quiz/auth.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/quiz/dashboard.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/quiz/gemini.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/quiz/quizmain.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/quiz/quizzes.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/about-owner.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/ajay-sir.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/amit-gupta-sir.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/prateek-jain.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/ramesh-sharda.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/seep-mam.html</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://classupdates.netlify.app/teachers/test-series.html</loc>
    <priority>0.7</priority>
  </url>
</urlset>

================================================================================
// File: style.css
================================================================================
/* Enhanced, Theme-Aware Back Button CSS */
.back-button {
    /* Positioning: Fixed position for persistent visibility */
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 50; /* Ensures it stays on top of content */
    
    /* Styling based on CSS variables from the theme */
    padding: 8px 16px; /* Refined padding for a pill shape */
    font-size: 14px;
    font-weight: 600; /* Bolder text for clarity */
    cursor: pointer;
    
    /* Use theme-aware colors and borders */
    border: 1px solid var(--color-border);
    border-radius: 9999px; /* Full rounded corners (pill shape) */
    background-color: var(--color-bg-card); /* Matches the general card background */
    color: var(--color-text-primary); /* Primary text color */
    
    /* Animation and effect */
    transition: all 0.3s ease-in-out;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05); /* Subtle initial shadow */
    
    /* Better alignment for the arrow and text */
    display: flex;
    align-items: center;
    gap: 4px; 
}

.back-button:hover {
    /* Accent hover effect for a clear action signal */
    background-color: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-accent-text); /* White/accent text on hover */
    transform: translateY(-2px); /* Slight lift effect */
    /* Dynamic shadow on hover, similar to .card:hover */
    box-shadow: var(--color-shadow); 
}

/* Style for the disabled state, using theme variables for a muted look */
.back-button:disabled {
    cursor: not-allowed;
    background-color: var(--color-border); /* Muted background */
    border-color: var(--color-border);
    opacity: 0.6;
    color: var(--color-text-secondary); /* Secondary/muted text color */
    transform: none;
    box-shadow: none;
}

/* Ensure the button is properly positioned on smaller screens */
@media (max-width: 768px) {
    .back-button {
        top: 10px;
        left: 10px;
    }
}







:root {
    /* Auto-calculates sidebar: 280px on PC, 100% width on small phones */
    --sidebar-width: min(280px, 80vw);
    --primary-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    
    /* Auto-scaling font: Minimum 1.5rem, grows with screen, max 3rem */
    --fluid-title: clamp(1.8rem, 5vw, 3rem);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Poppins', sans-serif;
    background: #0f172a;
    color: #f8fafc;
    overflow-x: hidden; /* Prevents horizontal scrolling on mobile */
}

/* Sidebar: Using transforms for better mobile performance */
.sidebar {
    width: var(--sidebar-width);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.active {
    transform: translateX(0);
}

/* Main Wrapper: Automatic padding adjustment */
.main-wrapper {
    width: 100%;
    padding: clamp(1rem, 5vw, 3rem);
    padding-top: 80px;
    transition: margin 0.3s ease;
}

/* Automatic Title Resizing */
.title {
    font-size: var(--fluid-title);
    font-weight: 800;
    line-height: 1.2;
}

/* THE "AUTO" GRID: No media queries needed here! 
   It automatically fits as many 300px cards as it can. */
.notifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: 1.5rem;
}

/* Header: Auto-stacks on small screens */
.header-content {
    display: flex;
    flex-wrap: wrap; /* Allows items to wrap to next line if no space */
    align-items: center;
    gap: 20px;
    margin-bottom: 2rem;
}

.header-logo {
    width: clamp(100px, 15vw, 180px);
    height: clamp(100px, 15vw, 180px);
    border-radius: 50%;
    object-fit: cover;
}

/* Buttons and Cards */
.teacher-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

.menu-toggle {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100;
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background: var(--primary-gradient);
    border: none;
    color: white;
    cursor: pointer;
}


:root {
    --sidebar-width: min(280px, 85vw);
    --primary-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-dim: #94a3b8;
    --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Navigation Toggle Button */
.menu-toggle {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100;
    background: var(--primary-gradient);
    border: none;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

/* Sidebar Styling */
.sidebar {
    width: var(--sidebar-width);
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border-right: 1px solid var(--glass-border);
    height: 100vh;
    position: fixed;
    left: calc(-1.1 * var(--sidebar-width)); /* Hidden by default */
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 80px 1.2rem 2rem;
    transition: var(--transition);
    z-index: 1050;
    overflow-y: auto;
}

.sidebar.active {
    left: 0; /* Shown when active */
}

/* Sidebar Links */
.nav-link {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 18px;
    color: var(--text-dim);
    text-decoration: none;
    border-radius: 14px;
    margin-bottom: 8px;
    transition: 0.3s;
    font-size: 0.95rem;
}

.nav-link:hover, .nav-link.active {
    background: var(--glass-bg);
    color: #00d2ff;
    box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.1);
}

/* Main Content Shifting Logic */
.main-wrapper {
    transition: var(--transition);
}

@media (min-width: 1024px) {
    .main-wrapper.shifted {
        margin-left: var(--sidebar-width);
    }
}

@media (max-width: 768px) {
    .main-wrapper.shifted { 
        margin-left: 0; 
        filter: blur(5px); /* Adds a blur effect on mobile when sidebar is open */
    }
}

================================================================================
// File: sw.js
================================================================================
const CACHE_NAME = 'neelaxmi-cache-v3'; // Changed to v3 to force update
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/pictures/neelaxmi.jpg',
  '/manifest.json'
];

// Install: Cache critical files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate new SW immediately
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});


self.addEventListener('fetch', (event) => {
  // 1. Logic for Page Navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((response) => response || caches.match('/offline.html'));
      })
    );
    return; // Stop here for navigation
  }

  // 2. Logic for Assets (CSS, JS, Images) - CRITICAL FOR PC INSTALL
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

================================================================================
// File: teachers/Fi
================================================================================


================================================================================
// File: teachers/about-owner.html
================================================================================
 <html lang="en">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css">

    <title>SAKSHAM | THE OWNER</title>
    <link rel="stylesheet" href="/css/owner.css"> 
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link rel="icon" type="image/jpeg" href="/pictures/owner.jpg">
    <meta name="google-site-verification" content="rWdQ0z5hXY23RxW5JVZ0ids6fLyKLO7EWaZbx6yByVs" />
</head>


<body>

    <div id="cursor"></div>
    
    <div id="cursor-dot"></div>
    <div id="progress"></div>
    <div class="vfx-overlay"></div>
    <div id="map-bg"></div>

    <div id="vanta-bg"></div>
    
    

    <section id="home">
      
        <div class="hero-content">

            <h2 data-aos="fade-down"> INFO ABOUT OWNER....</h2>
            <h1 class="glitch" data-text="SAKSHAM">SAKSHAM</h1>
            <p style="color: #ccc; margin-top: 1rem; font-size: 1.2rem; text-shadow: 1px 1px 2px black;">
                <span id="typewriter"></span><span class="cursor-blink">|</span>
            </p>
            
            <div class="prime-line" data-aos="fade-right">
                "No one is busy until you are important to them."
            </div>

            <div class="badge-container" data-aos="fade-up">
                
                <div class="badge">
                    <img src="/pictures/hindu.jpeg" class="badge-img" alt="Hindu Icon">
                    HINDU 
                </div>

                <div class="badge">
                    <img src="/pictures/rss.jpeg" class="badge-img" alt="RSS Icon">
                    RSS MEMBER
                </div>

                <div class="badge">
                    <img src="/pictures/bjp.jpeg" class="badge-img" alt="BJP Icon">
                    BJP CORE
                </div>
            </div>
            </div>
    </section>

    <section id="about">
        <h2 class="glitch" style="font-size: 3rem;" data-text="PROFILE INFO">PROFILE INFO</h2>
        
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 2rem;">
<div class="terminal-window" data-aos="fade-right" style="flex: 1; min-width: 300px;">
    <div class="terminal-header">
        <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
        <span style="margin-left: auto; color: #555; font-size: 0.8rem;">root@saksham:~/identity</span>
    </div>
    <div class="cmd-line">> whoami</div>
    
    <div style="padding: 10px; margin-top: 10px;">
        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
            IDENTITY: <span class="highlight">SAKSHAM</span><br>
            CLASS: <span class="highlight">12th Pass-out</span><br>
            LOCATION: <span class="highlight">UTTAR PRADESH, INDIA</span><br>
            TARGET: <span class="highlight">NEET (Score: 251 - RELOADING FOR 2026...)</span><br>
            FUTURE CLASS: <span class="highlight">DOCTOR & PRIME MINISTER</span>
        </p>
        
        <p style="border: 1px solid var(--primary); padding: 1rem; color: var(--primary); font-weight: bold; background: rgba(255, 153, 51, 0.1); font-size: 0.9rem;">
            ⚠️ WARNING: NO MERCY. POLITICS IS IN THE BLOOD. 🤫
        </p>
    </div>
</div>

            <div style="flex: 1; min-width: 300px;">
                <h3 style="font-family: 'Orbitron'; color: var(--primary); margin-bottom: 1rem; text-shadow: 1px 1px 2px black;">
                    <i class="fas fa-dumbbell"></i> PHYSICAL ATTRIBUTES
                </h3>
                
                <div class="stat-card">
                    <div class="stat-value">165 KG</div>
                    <div class="stat-label">Deadlift (District Champion)</div>
                    <div style="width: 100%; height: 5px; background: #333; margin-top: 10px;">
                        <div style="width: 95%; height: 100%; background: var(--primary); box-shadow: 0 0 10px var(--primary);"></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <div class="stat-card" style="flex: 1;">
                        <div class="stat-value" style="font-size: 1.8rem;">75 KG</div>
                        <div class="stat-label">Clean & Jerk</div>
                    </div>
                    <div class="stat-card" style="flex: 1;">
                        <div class="stat-value" style="font-size: 1.8rem;">55 KG</div>
                        <div class="stat-label">Snatch</div>
                    </div>
                    
                </div>
                
                <h3 style="font-family: 'Orbitron'; color: var(--primary); margin-top: 2.5rem; margin-bottom: 1rem; text-shadow: 1px 1px 2px black;">
                <i class="fas fa-chess-knight"></i> CHESS STATUS
                </h3>
                
                <div class="stat-card">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px;">
        <div>
            <div class="stat-value" id="chess-rating">Loading...</div>
            <div class="stat-label">Rapid Points</div>
        </div>
        <div style="text-align: right;">
            <div class="stat-value" id="chess-rank" style="font-size: 1.1rem; color: #ccc;">---</div>
            <div class="stat-label">Global Rank</div>
        </div>
    </div>

    <div style="width: 100%; height: 1px; background: #333; margin-bottom: 15px;"></div>

    <div style="display: flex; justify-content: space-between; text-align: center;">
        <div style="flex: 1;">
            <div id="chess-wins" style="color: #00ff00; font-weight: bold; font-size: 1.3rem; text-shadow: 0 0 5px #00ff00;">0</div>
            <div class="stat-label" style="font-size: 0.7rem;">WON</div>
        </div>
        <div style="flex: 1; border-left: 1px solid #333; border-right: 1px solid #333;">
            <div id="chess-losses" style="color: #ff3333; font-weight: bold; font-size: 1.3rem; text-shadow: 0 0 5px #ff3333;">0</div>
            <div class="stat-label" style="font-size: 0.7rem;">LOST</div>
        </div>
        <div style="flex: 1;">
            <div id="chess-winrate" style="color: var(--primary); font-weight: bold; font-size: 1.3rem;">0%</div>
            <div class="stat-label" style="font-size: 0.7rem;">WIN RATE</div>
        </div>
    </div>

    <div style="width: 100%; height: 5px; background: #333; margin-top: 12px; border-radius: 3px; overflow: hidden;">
        <div id="chess-progress" style="width: 0%; height: 100%; background: var(--primary); box-shadow: 0 0 10px var(--primary); transition: width 1s ease-in-out;"></div>
    </div>
</div>

            </div>
        </div>
    </section>

    <section id="projects">
        <h2 class="glitch" style="font-size: 3rem;" data-text="DATABASE">DATABASE</h2>

        <div class="stats-grid">
            <div class="terminal-window" data-aos="flip-left">
                <div class="terminal-header">
                    <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
                    <span style="margin-left: auto; color: #555; font-size: 0.8rem;">root@saksham:~/websites</span>
                </div>
                <div class="cmd-line">> ls -la ./projects</div>
                
                <div class="project-list">
                    <div class="project-item"><span>▸ <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="highlight">AKM SIR MODULE DISCUSSION</a></span> <span class="highlight"> [HELPER ]</span></div>
                    <div class="project-item"><span>▸ <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="highlight">NEET COUNTDOWN</a></span> <span class="highlight"> [TIMER]</span></div>
                    <div class="project-item"><span>▸ <a href="https://saksenquiz.netlify.app/" target="_blank" class="highlight">SAKSEN QUIZ CORNER </a></span> <span class="highlight"> [MEGA PROJECT ]</span></div>
                    <div class="project-item"><span>▸ <a href="http://Classupdates.netlify.app/" target="_blank" class="highlight">UNACADEMY CLASS UPDATE</a></span> <span class="highlight"> [MEGA PROJECT ]</span></div>
                    <div class="project-item"><span>▸ <a href="https://dppanalysis.netlify.app/" target="_blank" class="highlight">DPP ANALYSIS TOOLS</a></span> <span class="highlight"> [DATA]</span></div>
                    <div class="project-item"><span>▸ <a href="" target="_blank" class="highlight">DAILY SCHEDULE TRACKER</a></span> <span class="highlight"> [APP]</span></div>
                    <div class="project-item"><span>▸ <a href="http://diwalisak.netlify.app/" target="_blank" class="highlight">DIWALI CELEBRATION</a></span> <span class="highlight"> [VFX]</span></div>
                    <div class="project-item" style="color: #666;">▸ [LOADING MORE...]</div>
                </div>
            </div>

            <div class="terminal-window" data-aos="flip-right">
                <div class="terminal-header">
                    <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
                    <span style="margin-left: auto; color: #555; font-size: 0.8rem;">root@saksham:~/bots</span>
                </div>
                <div class="cmd-line">> ./run_bots.sh</div>
                
                <div class="project-list">
                    <div class="project-item">
                        <span>▸ <a href="https://telegram.me/Saksen_main_bot" target="_blank" class="highlight">NEELAXMI BOT</a></span>
                        <span class="highlight"> [RUNNABLE]</span>
                        <br><span style="font-size: 0.8rem; color: #888;">-- access study material</span>
                    </div>
                    <div class="project-item">
                        <span>▸ <a href="https://telegram.me/Lecture_extractor2_bot" target="_blank" class="highlight">LECTURES BOT</a></span> <span class="highlight"> [RUNNABLE]</span>
                        <br><span style="font-size: 0.8rem; color: #888;">-- access teachers lectures</span>
                    </div>
                    <div class="project-item" style="color: #666;">▸ [COMING MORE SOON...]</div>
                </div>
              </div>
        </div>
    </section>
    <footer>
        <p>CREATED BY SAKSHAM © 2025 | </p>
        <div style="font-size: 1.5rem; margin-top: 1rem;">
            <i class="fab fa-instagram" style="margin: 0 10px;"></i>
            <i class="fab fa-telegram" style="margin: 0 10px;"></i>
            <i class="fab fa-twitter" style="margin: 0 10px;"></i>
        </div>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.fog.min.js"></script>

    <script>
        VANTA.FOG({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xff9933, // Saffron
            midtoneColor: 0x138808,   // Green
            lowlightColor: 0x000000,  // Dark base
            baseColor: 0x050505,      // Background
            blurFactor: 0.7,          // Controls smoke density
            speed: 1.8,               // Controls animation speed
            zoom: 1.0
        });

        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');
        
        async function fetchChessStats() {
    const username = 'sss_saksham21'; // <--- Change this
    try {
        const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
        const data = await response.json();
        
        if (data.chess_rapid) {
            const rapid = data.chess_rapid;
            const wins = rapid.record.win;
            const losses = rapid.record.loss;
            const draws = rapid.record.draw;
            const totalGames = wins + losses + draws;
            const winRate = ((wins / totalGames) * 100).toFixed(1);

            // Update UI
            document.getElementById('chess-rating').innerText = rapid.last.rating;
            document.getElementById('chess-wins').innerText = wins;
            document.getElementById('chess-losses').innerText = losses;
            document.getElementById('chess-winrate').innerText = winRate + '%';
            document.getElementById('chess-progress').style.width = winRate + '%';
            document.getElementById('chess-rank').innerText = 'Best: ' + rapid.best.rating;
        }
    } catch (error) {
        console.error("Error fetching Chess.com stats:", error);
        document.getElementById('chess-rating').innerText = "Error";
    }
}

fetchChessStats();

        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = "scale(0.8)";
        });
        document.addEventListener('mouseup', () => {
            cursor.style.transform = "scale(1)";
        });

        const text = "CODER | LIFTER | NEET UG STUDENT | SILENTLY WORKING";
        const typeWriterElement = document.getElementById('typewriter');
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typeWriterElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray("section").forEach(section => {
            gsap.from(section.children, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            });
        });

        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progress").style.width = scrolled + "%";
        };

    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8Q10YQK6DZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8Q10YQK6DZ');
    </script>
        <script src="/history.js"></script>

</body>
</html>

================================================================================
// File: teachers/ajay-sir.html
================================================================================
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AJAY SIR [AKM] Profile</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="/style.css">
      <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
      <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="/css.teachers.css">
      <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

      
   </head>
   
      <style>
         :root {
         --color-bg-page: #f9f9f9;
         --color-bg-card: #ffffff;
         --color-text-primary: #1f2937;
         --color-text-secondary: #6b7280;
         --color-accent: #2563eb; /* Blue Follow Button */
         --color-accent-text: #ffffff;
         --color-border: #e5e7eb;
         --color-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
         --sidebar-width: min(280px, 85vw);
         --primary-gradient: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
         --glass-bg: rgba(255, 255, 255, 0.05);
         --glass-border: rgba(255, 255, 255, 0.1);
         --text-dim: #94a3b8;
        --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

         /* Dark Mode */
         body[data-theme='dark'] {
         --color-bg-page: #111827;
         --color-bg-card: #1f2937;
         --color-text-primary: #f3f4f6;
         --color-text-secondary: #9ca3af;
         --color-accent: #4f46e5;
         --color-accent-text: #ffffff;
         --color-border: #374151;
         --color-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
         }
         /* Vibrant UI */
         body[data-theme='vibrant'] {
         --color-bg-page: #f0fdf4;
         --color-bg-card: #ffffff;
         --color-text-primary: #16a34a; /* Green Text */
         --color-text-secondary: #65a30d;
         --color-accent: #10b981; 
         --color-accent-text: #ffffff;
         --color-border: #d1fae5;
         --color-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2), 0 2px 4px -2px rgba(16, 185, 129, 0.1);
         }
         /* Minimalist Theme */
         body[data-theme='minimalist'] {
         --color-bg-page: #ffffff;
         --color-bg-card: #ffffff;
         --color-text-primary: #000000;
         --color-text-secondary: #374151;
         --color-accent: #000000;
         --color-accent-text: #ffffff;
         --color-border: #d1d5db;
         --color-shadow: none;
         }
         /* Unacademy-Inspired Theme */
         body[data-theme='unacademy-inspired'] {
         --color-bg-page: #ffffff;
         --color-bg-card: #ffffff;
         --color-text-primary: #212121;
         --color-text-secondary: #9aa1a7;
         --color-accent: #374151; /* Dark Gray Follow Button */
         --color-accent-text: #ffffff;
         --color-border: #e9e9e9;
         --color-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
         }
         /* Apply CSS variables */
         body {
         font-family: 'Inter', sans-serif;
         transition: background-color 0.3s, color 0.3s;
         background-color: var(--color-bg-page);
         }
         .card {
         background-color: var(--color-bg-card);
         color: var(--color-text-primary);
         box-shadow: var(--color-shadow);
         border: 1px solid var(--color-border);
         transition: all 0.3s ease-in-out;
         }
         .card:hover {
         transform: translateY(-4px); 
         box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
         }
         .text-primary { color: var(--color-text-primary); }
         .text-secondary { color: var(--color-text-secondary); }
         .bg-accent { background-color: var(--color-accent); }
         .text-accent { color: var(--color-accent); }
         .text-accent-text { color: var(--color-accent-text); }
         .border-accent { border-color: var(--color-accent); }
         .border-border { border-color: var(--color-border); }
         /* Custom Tab Styles */
         .tab {
         color: var(--color-text-secondary);
         transition: color 0.2s;
         }
         .tab:hover {
         color: var(--color-text-primary);
         }
         .tab-active {
         color: var(--color-text-primary);
         font-weight: 600;
         border-bottom: 2px solid var(--color-accent);
         }
         /* Filter Button Styles */
         .filter-btn {
         padding: 6px 14px;
         border-radius: 9999px; /* full rounded */
         font-size: 0.875rem; /* text-sm */
         font-weight: 500;
         transition: all 0.2s;
         cursor: pointer;
         border: 1px solid var(--color-border);
         background-color: var(--color-bg-card);
         color: var(--color-text-secondary);
         }
         .filter-btn:hover {
         background-color: var(--color-bg-page);
         color: var(--color-text-primary);
         }
         .filter-btn.active {
         background-color: var(--color-accent);
         color: var(--color-accent-text);
         border-color: var(--color-accent);
         box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
         }
         /* Theme Button Styles */
         .theme-btn {
         display: flex;
         align-items: center;
         padding: 8px 16px;
         border-radius: 6px;
         font-size: 14px;
         font-weight: 500;
         transition: all 0.2s ease;
         cursor: pointer;
         border: 1px solid var(--color-border);
         background-color: var(--color-bg-card);
         color: var(--color-text-primary);
         }
         .theme-btn:hover {
         background-color: var(--color-bg-page);
         }
         .theme-btn.active {
         background-color: var(--color-accent);
         color: var(--color-accent-text);
         border-color: var(--color-accent);
         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
         }
         .theme-btn.active .theme-icon {
         fill: var(--color-accent-text);
         }
         /* Styling for the list/text content view */
         .content-list-item {
         background-color: var(--color-bg-card);
         border: 1px solid var(--color-border);
         transition: background-color 0.2s, border-color 0.2s;
         }
         .content-list-item:hover {
         border-color: var(--color-accent);
         }
         /* --- Theme-Aware Animated Border Enhancements (VFX) --- */
         @keyframes glow {
         0% { box-shadow: 0 0 0 0px currentColor; opacity: 1; } 
         70% { box-shadow: 0 0 0 10px currentColor; opacity: 0; }
         100% { box-shadow: 0 0 0 0px currentColor; opacity: 0; }
         }
         .glowing-border {
         border: 3px solid white; 
         color: var(--color-accent); 
         animation: glow 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
         }
         .logo-vfx {
         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 8px rgba(255, 255, 255, 0.5);
         }
         .card .absolute.bottom-4.left-4 {
         z-index: 10; 
         }
         /* Feature Block Styling */
         .content-feature-block:hover .arrow-icon {
         transform: translateX(4px); 
         }
         .content-feature-block .arrow-icon {
         transition: transform 0.2s ease-out;
         }
         .content-feature-block {
         text-decoration: none;
         display: block; 
         transition: all 0.3s ease-in-out;
         }
         /* NEW STYLES FOR MODULE GRID */
         .module-card {
         position: relative;
         overflow: hidden;
         }
         .module-card::before {
         content: '';
         position: absolute;
         top: 0; left: 0; right: 0; bottom: 0;
         background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%);
         pointer-events: none;
         }
         
        .cyber-grid {
         display: grid;
         grid-template-columns: repeat(12, 1fr);
         gap: 1.5rem;
         }

.cyber-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    position: relative;
}

body[data-theme='dark'] .cyber-card {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.cyber-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.2);
    border-color: var(--color-accent);
}

.cyber-card::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: 0.5s;
    pointer-events: none;
}

.cyber-card:hover::before {
    left: 100%;
}

.text-gradient {
    background: linear-gradient(135deg, #2563eb, #9333ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

.neon-badge {
    box-shadow: 0 0 10px var(--color-accent);
    animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
    0% { box-shadow: 0 0 5px var(--color-accent); }
    50% { box-shadow: 0 0 15px var(--color-accent), 0 0 5px var(--color-accent); }
    100% { box-shadow: 0 0 5px var(--color-accent); }
}

.col-span-12 { grid-column: span 12; }
.col-span-8 { grid-column: span 12; }
.col-span-4 { grid-column: span 12; }

@media (min-width: 768px) {
    .col-span-8 { grid-column: span 8; }
    .col-span-4 { grid-column: span 4; }
    .col-span-6 { grid-column: span 6; }
}

/* PDF Viewer Styles */
#pdf-viewer-container {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 9999;
    flex-direction: column;
}
#pdf-frame {
    width: 100%;
    height: 100%;
    border: none;
}
.close-pdf {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 10000;
}


.j-star-bg {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    color: white;
}


</style>
   
   
   <button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
    </button>

<nav class="sidebar" id="sidebar">
    <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
            <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>

    
    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>

   <body data-theme="default-ui">
      <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4">
         

           
         <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
         </div>
         
      </div>
      
      <div class="max-w-6xl mx-auto p-4 md:p-8">
         <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            <div class="flex items-center space-x-4">
               <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                  <img src="/pictures/akmsir.jpg" onerror="this.src='https://placehold.co/128x128/000/fff?text=AKM'" alt="AJAY SIR [AKM]" class="w-full h-full object-cover">
               </div>
               <h1 class="text-3xl font-extrabold text-primary">AJAY SIR [AKM]</h1>
            </div>
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
               <div class="flex space-x-6 text-center">
                  <div class="text-primary">
                     <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                     <div class="text-xs text-secondary">WATCH MINS</div>
                  </div>
                  <div class="text-primary">
                     <div class="text-xl font-bold flex items-center justify-center">
                        <span id="dedicationsDisplay">...</span>
                        <span class="ml-1 text-yellow-500">
                           <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                           </svg>
                        </span>
                     </div>
                     <div class="text-xs text-secondary">DEDICATIONS</div>
                  </div>
                  <div class="text-primary">
                     <div class="text-xl font-bold" id="followersDisplay">...</div>
                     <div class="text-xs text-secondary">FOLLOWERS</div>
                  </div>
                  </div>
               <a href="https://unacademy.com/@ajaymishraakm382-9673" target="_blank" 
                  class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
               Follow
               </a>
            </div>
         </header>
         <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
               <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Free classes">FREE CLASSES </a>
               <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Courses">COURSES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold " data-tab="module_pdf">MODULE PDF</a>

               <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="modules">MODULE DISCUSSION</a>
               <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Quizzes">QUIZZES</a> <a href="#" class="tab nav-tab py-3 text-sm font-semibold " data-tab="PYQ Series">PYQ SERIES</a>
               <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden" data-tab="Module">Module</a>
               <a href="#" class="tab nav-tab py-3 text-sm font-semibold " data-tab="About">ABOUT</a>
            </div>
         </nav>
         <div id="filter-area" class="mt-6 flex space-x-4">
            <button id="filter-latest" class="filter-btn hidden" data-sort-order="desc">Latest</button>
            <button id="filter-oldest" class="filter-btn hidden" data-sort-order="asc">Oldest
            </button>
        </div>
       
         <div id="dynamic-content-area" class="mt-8">       </div>
      </div>
      
      <div id="pdf-viewer-container">
        <span class="close-pdf" onclick="closePdf()">&times;</span>
        <iframe id="pdf-frame" src=""></iframe>
      </div>

<script >
    
    
    /* -------------------------------------------------------------------------- */
/* CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

const firebaseConfig = {
    apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
    authDomain: "gallery-83144.firebaseapp.com",
    projectId: "gallery-83144",
    storageBucket: "gallery-83144.firebasestorage.app",
    messagingSenderId: "1005577519231",
    appId: "1:1005577519231:web:638899904126ae78cdff4a"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const EDUCATOR_DOC_PATH = "educators/ajay_mishra";

const MAIN_THUMBNAIL_URL = "/pictures/akm.png";
const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg";

const body = document.body;
const themeSwitcher = document.getElementById('theme-switcher');
const contentArea = document.getElementById('dynamic-content-area');
const filterArea = document.getElementById('filter-area');

let currentActiveTab = 'free_classes';
let currentSortOrder = 'desc';

/* -------------------------------------------------------------------------- */
/* STATIC JSON DATA                             */
/* -------------------------------------------------------------------------- */

const modulesData = {
    "metadata": {
        "instructor": "AJAY SIR [AKM] SIR",
        "target_audience": "NEET UG & JEE MAIN Aspirants",
        "created_by": "Team SAKSEN",
        "credits": ["SAKSHAM"]
    },
    "courses": [
        {
            "title": "Mole Concept",
            "modules": [
                { "range": "From Q1 to Q15", "link": "https://unacademy.app.link/8TKTVArmhzb" },
                { "range": "From Q16 to Q41", "link": "https://unacademy.com/class/module-discussion-i/MF8WKVAX" },
                { "range": "From Q42 to Q61", "link": "https://unacademy.com/class/module-discussion-ii/HXBCEN9Z" },
                { "range": "From Q62 to Q71", "link": "https://unacademy.com/class/module-discussion/L3Z4HZ5B" },
                { "range": "From Q72 to Q90", "link": "https://unacademy.com/class/doubt-clearing-session/NHZHH8K4" },
                { "range": "From Q91 to Q103", "link": "https://unacademy.com/class/module-discussion-mole-concept-i/R0EWGXHR" },
                { "range": "From Q104 to Q118", "link": "https://unacademy.com/class/module-discussion-mole-concept-ii/4N9RRY5O" },
                { "range": "From Q119 to Last", "link": "https://unacademy.com/class/doubt-clearing-session/N18LZG5K" }
            ]
        },
        {
            "title": "Atomic Structure",
            "modules": [
                { "range": "From Q1 to Q11", "link": "https://unacademy.com/class/doubt-clearing-session/9O6OUBHK" },
                { "range": "From Q12 to Q30", "link": "https://unacademy.com/class/module-discussion-mole-concept/B34X537A" },
                { "range": "From Q31 to Q85", "link": "https://unacademy.com/course/module-discussion-jstar-series-2023/ASBJBNVP" },
                { "range": "From Q86 to Q180", "link": "https://unacademy.com/course/module-discussion-jstar-series-atomic-structure/K748UA4B" },
                { "range": "Part 1", "link": "https://unacademy.com/course/module-discussion-jstar-series-atomic-structure/K748UA4B" },
                { "range": "Part 2", "link": "https://unacademy.com/course/module-discussion-jstar-series-2023/ASBJBNVP" },
                { "range": "Part 3", "link": "https://unacademy.app.link/Ivu0D0k0grb" }
            ]
        },
        {
            "title": "Chemical Equilibrium",
            "modules": [
                { "range": "From Q1 to Q29", "link": "https://unacademy.com/class/module-discussion-iii/B8FOZN2Z" },
                { "range": "From Q30 to Last", "link": "https://unacademy.com/course/module-discussion-jstar-series/ITRNUJI3" }
            ]
        },
        {
            "title": "Thermodynamics",
            "modules": [
                { "range": "From Q1 to Q25", "link": "https://unacademy.com/class/module-discussion-part-iiii/N4Q060PD" },
                { "range": "From Q26 to Q158", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-thermodynamics/0H1L15TI" },
                { "range": "From Q159 to Last", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-thermodynamics/0H1L15TI" },
                { "range": "Part 1", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-solution-and-thermodynamics/PF9AQD9R" },
                { "range": "Part 2", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-thermodynamics-and-electrochemistry/YL579OPT" },
                { "range": "Part 3", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-thermodynamics/0H1L15TI" }
            ]
        },
        {
            "title": "Ionic Equilibrium",
            "modules": [
                { "range": "Open", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-ionic-equilibrium/6M45BE7C" }
            ]
        },
        {
            "title": "Redox Reactions",
            "modules": [
                { "range": "Not Yet Discussed", "link": "https://telegram.me/saksen_journey_offical" }
            ]
        },
        {
            "title": "Solutions",
            "modules": [
                { "range": "From Q1 to Q76", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-2022/TTZTV36O" },
                { "range": "From Q77 to Last", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-solution/R8ZBJVKP" },
                { "range": "PYQs", "link": "https://unacademy.com/class/module-discussion-part-i/7RNIFBZ3" },
                { "range": "Ques Last Lecture", "link": "https://unacademy.com/class/module-discussion-part-i/7RNIFBZ3" }
            ]
        },
        {
            "title": "Electrochemistry",
            "modules": [
                { "range": "Q1 to Q4 (01:13:13)", "link": "https://unacademy.com/class/module-discussion-part-iv/6L0FDZES" },
                { "range": "Q5 to Q23", "link": "https://unacademy.com/class/module-discussion-part-v/2AME24U3" },
                { "range": "Q24 to Q43", "link": "https://unacademy.com/class/module-discussion-part-vi/29AR28YQ" },
                { "range": "Q44 to Q59", "link": "https://unacademy.com/class/ionic-equilibrium-part-iv/RJPMGN5U" },
                { "range": "Q60 to Q70", "link": "https://unacademy.com/class/ionic-equilibrium-part-i/LEM21UEJ" },
                { "range": "Q71 to Q84", "link": "https://unacademy.com/class/ionic-equilibrium-part-ii/0FGRJ31L" },
                { "range": "Q85 to Q102", "link": "https://unacademy.com/class/doubt-clearing-session/FG4MD60A" },
                { "range": "Q103 to Q120 (Last Lecture 31st May)", "link": "https://unacademy.com/course/course-on-module-discussion-jstar-series-ionic-equilibrium/ZT34ZWGT" }
            ]
        },
        {
            "title": "Chemical Kinetics",
            "modules": [
                { "range": "Q1 to Q19", "link": "https://unacademy.com/class/module-discussion-chemical-kinetics-i/POQWVIQP" },
                { "range": "Q20 to Q45", "link": "https://unacademy.com/class/doubt-clearing-session/UKR5O2T9" },
                { "range": "Q46 to Q68", "link": "https://unacademy.com/class/module-discussion-chemical-kinetics-ii/BOMWCSDX" },
                { "range": "Q69 to Last", "link": "https://unacademy.com/class/module-discussion-solution/W6FOWOZD" },
                { "range": "OUR MAIN CHANNEL", "link": "https://t.me/saksen_journey_offical" }
            ]
        }
    ],
    "pyq_series": [
        {
            "title": "Mole Concept - PYQ",
            "modules": [
                { "range": "PYQ Discussion 1", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-kinetics/BYGE8X4U" },
                { "range": "PYQ Discussion 2", "link": "https://unacademy.com/class/pyq-jstar-series-mole-concept/Y9QCER4B" },
                { "range": "PYQ Course Link", "link": "https://unacademy.com/course/pyq-jstar-series-mole-concept/FPRU1RH3" }
            ]
        },
        {
            "title": "Atomic Structure - PYQ",
            "modules": [
                { "range": "PYQ Discussion", "link": "https://unacademy.com/class/pyq-jstar-series-atomic-structure/11267ZWJ" }
            ]
        },
        {
            "title": "Chemical Equilibrium - PYQ",
            "modules": [
                { "range": "PYQ Discussion 1", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-equilibrium/OTBTTJYW" },
                { "range": "PYQ Discussion 2", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-equilibrium/PH00C0DO" },
                { "range": "PYQ Discussion 3", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-equilibrium-776/C2F1B49" },
                { "range": "PYQ Series I", "link": "https://unacademy.com/class/pyqs-jstar-series-chemical-equilibrium-i/B6BTWUK5" },
                { "range": "PYQ Series II", "link": "https://unacademy.com/class/pyqs-jstar-series-chemical-equilibrium-ii/LIQKXA37" }
            ]
        },
        {
            "title": "Thermodynamics - PYQ",
            "modules": [
                { "range": "PYQ Discussion 1", "link": "https://unacademy.app.link/DAhscD15Mtb" },
                { "range": "Module/PYQ Part I", "link": "https://unacademy.com/class/module-discussion-part-i/7RNIFBZ3" },
                { "range": "Module/PYQ Part II", "link": "https://unacademy.com/class/module-discussion-part-ii/ESQ2Z46Z" }
            ]
        },
        {
            "title": "Ionic Equilibrium - PYQ",
            "modules": [
                { "range": "PYQ Discussion I", "link": "https://unacademy.com/class/pyq-jstar-series-ionic-equilibrium-200/6VOCNHDQ" },
                { "range": "PYQ Discussion II", "link": "https://unacademy.com/class/pyq-jstar-series-ionic-equilibrium-ii/WUU84NMS" },
                { "range": "PYQ Course Link", "link": "https://unacademy.com/course/pyq-jstar-series-solution/U0L2ZRT5" }
            ]
        },
        {
            "title": "Redox Reactions - PYQ",
            "modules": [
                { "range": "PYQ Discussion", "link": "https://unacademy.com/class/pyq-jstar-series-redox-reaction-453/1F8EKTSE" }
            ]
        },
        {
            "title": "Solutions - PYQ",
            "modules": [
                { "range": "PYQ Discussion 1", "link": "https://unacademy.com/class/pyq-jstar-series-solutions/EANC670M" },
                { "range": "PYQ Discussion 2", "link": "https://unacademy.com/class/pyq-jstar-series-solutions-847/2EA5JXAE" },
                { "range": "PYQ Discussion 3", "link": "https://unacademy.com/class/pyq-jstar-series-solutions/SFRKFMRO" },
                { "range": "PYQ Series 4", "link": "https://unacademy.com/class/pyqs-jstar-series-solutions/ALW4DGEN" },
                { "range": "PYQ Discussion 5", "link": "https://unacademy.com/class/pyq-jstar-series-solution/W3LG7VUE" },
                { "range": "PYQ Solid State (Related)", "link": "https://unacademy.com/class/pyq-jstar-series-solid-state/HUYH0G3R" },
                { "range": "PYQ Discussion 6", "link": "https://unacademy.com/class/pyq-jstar-series-solutions/YTOUM8D7" }
            ]
        },
        {
            "title": "Electrochemistry - PYQ",
            "modules": [
                { "range": "PYQ Course I", "link": "https://unacademy.com/course/pyq-jstar-series-electrochemistry/SNRJFGA8" },
                { "range": "PYQ Course II", "link": "https://unacademy.com/course/pyq-jstar-series-electrochemistry-ii/IKKXIIPI" }
            ]
        },
        {
            "title": "Chemical Kinetics - PYQ",
            "modules": [
                { "range": "PYQ Discussion 1", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-kinetics/BYGE8X4U" },
                { "range": "PYQ Series 2", "link": "https://unacademy.com/class/pyqs-jstar-series-chemical-kinetics/CHUCOY49" },
                { "range": "PYQ Discussion 3", "link": "https://unacademy.com/class/pyq-jstar-series-chemical-kinetics/F3L0KEHW" },
                { "range": "PYQ Series 4", "link": "https://unacademy.com/class/pyqs-jstar-series-chemical-kinetics/ZGB5YVJN" }
            ]
        }
    ],
    "social_links": [
        { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
        { "title": "AJAY SIR sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
    ]
};

/* -------------------------------------------------------------------------- */
/* UTILITY FUNCTIONS                           */
/* -------------------------------------------------------------------------- */

function formatStat(num) {
    if (num === null || num === undefined) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
};

function formatViewCount(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
}

function fetchAndRenderStats() {
    document.getElementById('watchMinsDisplay').textContent = '...';
    document.getElementById('dedicationsDisplay').textContent = '...';
    document.getElementById('followersDisplay').textContent = '...';

    db.doc(EDUCATOR_DOC_PATH).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                document.getElementById('followersDisplay').textContent = formatStat(data.followers);
            } else {
                console.log("No such document for stats!");
            }
        })
        .catch((error) => {
            console.error("Error fetching document: ", error);
        });
}

/* -------------------------------------------------------------------------- */
/* RENDER FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

let currentTabContent = {}; // Cache

async function fetchAndRenderContent(collectionName, sortOrder = 'desc') {
    contentArea.innerHTML = `<div class="p-8 text-center text-secondary">Loading ${collectionName}...</div>`;
    currentSortOrder = sortOrder;

    try {
        const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
            .where('status', '==', 'approved')
            .orderBy('createdAt', sortOrder)
            .get();

        let contentArray = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
            contentArray.push(data);
        });

        currentTabContent[collectionName] = contentArray;

        if (collectionName === 'free_classes') {
            renderFreeClassCards(contentArray);
        } else if (collectionName === 'courses') {
            renderCourseCards(contentArray);
        }
    } catch (error) {
        console.error("Error fetching content:", error);
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
    }
    updateFilterButtonStyling(sortOrder);
}

function renderFreeClassCards(contentArray) {
    if (contentArray.length === 0) {
        contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found.</div>`;
        return;
    }

    const cardsHtml = contentArray.map(item => {
        const thumb = MAIN_THUMBNAIL_URL;
        const logo = COMPANY_LOGO_URL;
        const dateDisplay = item.timeText || 'Date N/A';

        return `
            <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div class="relative w-full h-44 overflow-hidden">
                    <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                        <img src="${logo}" class="w-full h-full object-cover">
                    </div>
                    ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <div class="flex items-center mb-2">
                        <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                            ${item.subject || 'Physics'}
                        </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                        ${item.title}
                    </h3>
                    <div class="flex items-center gap-3 mb-4 text-sm">
                        <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <span class="font-medium">Starts: ${dateDisplay}</span>
                        </div>
                    </div>
                    <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                        <p class="text-sm text-gray-600 leading-relaxed">
                            ${item.description || 'No description provided.'}
                        </p>
                    </div>
                    <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                        <span class="text-sm font-semibold text-blue-600 flex items-center">
                            Watch Now 
                            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>`;
}

function renderCourseCards(courseArray) {
    if (courseArray.length === 0) {
        contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found.</div>`;
        return;
    }

    const cardsHtml = courseArray.map(course => {
        const thumb = MAIN_THUMBNAIL_URL;
        const dateDisplay = course.timeText || 'Date N/A';

        return `
            <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div class="relative w-full h-44 overflow-hidden">
                    <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                         Full Course
                    </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                            Start: ${dateDisplay}
                        </span>
                        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                            ${course.duration || 'N/A Duration'}
                        </span>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                        <p class="text-sm text-gray-600 leading-relaxed">
                            <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
                        </p>
                    </div>
                    <div class="mt-auto">
                        <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                            View Course
                        </button>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>`;
}

function renderModulesGridFromJSON() {
    const courses = modulesData.courses;

    if (courses.length === 0) {
        contentArea.innerHTML = `<div class="p-8 text-center text-gray-500">😔 No module data found in JSON.</div>`;
        return;
    }

    const headerHtml = `
        <div class="mb-10 border-l-4 border-indigo-500 pl-6">
            <h2 class="text-3xl font-extrabold text-gray-800 tracking-tight">📚 Topic-wise Module Discussion Links</h2>
            <p class="text-md text-gray-500 mt-1">Detailed discussions by question range, organized by subject.</p>
        </div>
    `;

    const cardsHtml = courses.map(course => `
        <div class="module-card relative card bg-white rounded-2xl p-6 shadow-xl overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-100 group">
            <div class="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-50 to-white"></div>
            <span class="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl tracking-wider status">
                ${course.status || 'Active'} 
            </span>
            <div class="relative z-10">
                <div class="mb-4 p-2 inline-block rounded-full bg-indigo-100 text-indigo-600 shadow-lg">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.46 9.248 5 7.5 5S4.168 5.46 3 6.253v13C4.168 18.46 5.752 18 7.5 18s3.332.46 4.5 1.253m0-13C13.168 5.46 14.752 5 16.5 5s3.332.46 4.5 1.253v13C19.832 18.46 18.248 18 16.5 18s-3.332.46-4.5 1.253"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-5 leading-snug border-b pb-3 border-gray-100">${course.title}</h3>
            </div>
            <ul class="space-y-4 relative z-10">
                ${course.modules.map(module => `
                    <li class="flex justify-between items-center text-sm border-b border-gray-100 last:border-b-0 pb-3">
                        <span class="font-medium text-gray-700">${module.range}</span>
                        <a href="${module.link}" target="_blank"
                            class="text-xs bg-indigo-500 text-white py-1 px-3 rounded-full hover:bg-indigo-600 transition-colors shadow-md flex items-center group-hover:shadow-lg">
                            Watch Now
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    contentArea.innerHTML = `<div class="animate-fade-in p-4 sm:p-0">${headerHtml}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cardsHtml}</div></div>`;
}

async function loadQuizCards() {
    toggleFilterButtons(false);
    contentArea.innerHTML = `<div class="p-8 text-center text-secondary">Loading Quizzes from Firebase...</div>`;
    const companyLogo = COMPANY_LOGO_URL;

    try {
        const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection('quizzes').get();
        let quizzesArray = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            quizzesArray.push({
                id: doc.id,
                targetQuizId: data.targetQuizId,
                ...data
            });
        });

        if (quizzesArray.length === 0) {
            contentArea.innerHTML = `<div class="p-8 text-center text-gray-500">😔 No quizzes found on Firebase.</div>`;
            return;
        }

        const cardsHtml = quizzesArray.map(quiz => {
            const activeQuizID = quiz.targetQuizId ? quiz.targetQuizId : quiz.id;
            const title = quiz.title || 'Untitled Quiz';
            const subject = quiz.subject || 'General';
            const questions = quiz.questions || 'N/A';
            const duration = quiz.duration || 'N/A';
            const thumbnailHtml = companyLogo ? `<img src="${companyLogo}" alt="Company Logo" class="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0">` : '';

            return `
                <div class="card p-6 rounded-xl transform hover:scale-[1.02] transition duration-300 h-full flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-xs font-bold text-accent bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-border uppercase tracking-wide inline-block">
                            ${subject}
                        </span>
                        ${thumbnailHtml}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-primary mb-5 leading-snug">
                            ${title}
                        </h3>
                    </div>
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center text-sm text-secondary">
                             <span class="font-semibold text-primary mr-1">${questions}</span> Questions
                        </div>
                        <div class="flex items-center text-sm text-secondary">
                             <span class="font-semibold text-primary mr-1">${duration}</span> Mins
                        </div>
                    </div>
                    <a href="/quiz/quizzes.html?uid=${activeQuizID}" 
                       class="w-full text-center py-3 border border-transparent text-sm font-semibold rounded-lg text-accent-text bg-accent hover:opacity-90 transition-colors flex items-center justify-center shadow-md">
                        Attempt Quiz <span class="ml-2">🚀</span>
                    </a>
                </div>
            `;
        }).join('');

        contentArea.innerHTML = `
            <div class="mb-10 border-l-4 border-accent pl-6">
                <h2 class="text-3xl font-extrabold text-primary tracking-tight">🎯 Available Quizzes & Assessments</h2>
                <p class="text-md text-secondary mt-1">Clicking a quiz will open it in a new tab.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>
        `;

    } catch (error) {
        console.error("Error fetching quizzes:", error);
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading quizzes from Firebase: ${error.message}</div>`;
    }
}

function renderPYQGridFromJSON() {
    toggleFilterButtons(false);
    const courses = modulesData.pyq_series || [];

    if (courses.length === 0) {
        contentArea.innerHTML = `<div class="p-8 text-center text-gray-500">😔 No PYQ data found in JSON.</div>`;
        return;
    }

    const headerHtml = `
        <div class="mb-10 border-l-4 border-red-500 pl-6">
            <h2 class="text-3xl font-extrabold text-gray-800 tracking-tight">🏆 Previous Year Questions (PYQ) Series Links</h2>
        </div>
    `;

    const cardsHtml = courses.map(course => `
        <div class="module-card relative card bg-white rounded-2xl p-6 shadow-xl overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-100 group">
            <div class="absolute inset-0 opacity-10 bg-gradient-to-br from-red-50 to-white"></div>
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl tracking-wider status">PYQ</span>
            <div class="relative z-10">
                <div class="mb-4 p-2 inline-block rounded-full bg-red-100 shadow-lg overflow-hidden">
                    <img src="/pictures/neelaxmi.jpg" alt="Company Logo" class="w-20 h-20 object-cover rounded-full">
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-5 leading-snug border-b pb-3 border-gray-100">${course.title}</h3>
            </div>
            <ul class="space-y-4 relative z-10">
                ${course.modules.map(module => `
                    <li class="flex justify-between items-center text-sm border-b border-gray-100 last:border-b-0 pb-3">
                        <span class="font-medium text-gray-700">${module.range}</span>
                        <a href="${module.link}" target="_blank"
                            class="text-xs bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-colors shadow-md flex items-center group-hover:shadow-lg">
                            Watch Now
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    contentArea.innerHTML = `<div class="animate-fade-in p-4 sm:p-0">${headerHtml}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cardsHtml}</div></div>`;
}

function renderAboutSection() {
    toggleFilterButtons(false);
    const akmData = {
        name: "Ajay Kumar Mishra",
        shortName: "AKM Sir",
        title: "No.1 Physical Chemistry Educator",
        experience: "10+ Years",
        birthday: "12th December",
        institutes: ["Unacademy (Current)", "Ex-Allen (Kota)", "Ex-Sarvottam (Kota)"],
        nicknames: ["Chachu", "Jahar Chachu"],
        vibes: ["Deep Lines", "Singer", "Shayari Master", "Meme Reviewer"],
        tagline: "Gussa kam hai, par Concept Jahar hai!",
        links: {
            instagram: "https://www.instagram.com/ajay.mishra.56481379/?hl=en",
            unacademy: "https://unacademy.com/@ajaymishraakm382-9673"
        }
    };

    const content = `
    <div class="animate-fade-in max-w-6xl mx-auto pb-10">
        <div class="cyber-grid mb-8">
            <div class="cyber-card col-span-12 md:col-span-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg class="w-64 h-64 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
                </div>
                <div class="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-600 neon-badge flex-shrink-0">
                    <img src="/pictures/akmsir.jpg" onerror="this.src='https://placehold.co/200x200?text=AKM'" class="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800">
                </div>
                <div class="text-center md:text-left z-10">
                    <h2 class="text-4xl md:text-5xl font-black text-gradient mb-2">${akmData.name}</h2>
                    <p class="text-xl text-secondary font-medium mb-4 tracking-wide">[ ${akmData.shortName} ]</p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">NEET UG Specialist</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">Physical Chemistry</span>
                    </div>
                </div>
            </div>
            <div class="cyber-card col-span-12 md:col-span-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg shadow-blue-500/30">
                <h3 class="text-6xl font-black mb-1">${akmData.experience}</h3>
                <p class="text-blue-100 text-sm font-semibold tracking-widest uppercase">Teaching Excellence</p>
                <div class="mt-4 text-xs text-blue-200">${akmData.institutes.join(" • ")}</div>
            </div>
        </div>
        <div class="cyber-grid mb-8">
            <div class="cyber-card col-span-12 md:col-span-4">
                <div class="flex items-center gap-3 mb-4"><span class="text-2xl">😎</span><h3 class="text-xl font-bold text-primary">The "Chachu" Vibe</h3></div>
                <p class="text-secondary text-sm leading-relaxed mb-4">Known lovingly as <strong>"${akmData.nicknames.join('" & "')}"</strong>.</p>
                <div class="flex flex-wrap gap-2">${akmData.vibes.map(vibe => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-secondary border border-border">${vibe}</span>`).join('')}</div>
            </div>
            <div class="cyber-card col-span-12 md:col-span-4 j-star-bg border-none relative overflow-hidden group">
                <h3 class="text-2xl font-black text-yellow-400 mb-2 italic">J* Series</h3>
                <p class="text-gray-300 text-sm mb-4">"Jahar" questions designed to build advanced conceptual clarity.</p>
            </div>
             <div class="cyber-card col-span-12 md:col-span-4 flex flex-col justify-between">
                <div><h3 class="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Birthday</h3><div class="flex items-center gap-3"><span class="text-3xl">🎂</span><span class="text-2xl font-bold text-primary">${akmData.birthday}</span></div></div>
                <div class="mt-6 pt-4 border-t border-border"><h3 class="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Famous For</h3><p class="italic text-primary">"${akmData.tagline}"</p></div>
            </div>
        </div>
        <div class="cyber-card p-0 overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div class="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div><h3 class="text-2xl font-bold mb-1">Connect with AKM Sir</h3></div>
                <div class="flex gap-4">
                    <a href="${akmData.links.instagram}" target="_blank" class="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 font-bold">Instagram</a>
                    <a href="${akmData.links.unacademy}" target="_blank" class="px-6 py-3 rounded-full bg-blue-600 font-bold">Unacademy</a>
                </div>
            </div>
        </div>
    </div>`;
    contentArea.innerHTML = content;
}

function renderLegacyContent(tabName) {
    toggleFilterButtons(false);
    const contentMap = {
        'Module': {
            title: "Main Module Repository",
            text: "This repository hosts the comprehensive, downloadable study MODULE DISCUSSION (PDFs, notes, and handouts).",
            link: { href: modulesData.social_links.find(l => l.title === 'AJAY SIR sir other material')?.url || '#', text: "Access Module Repository" }
        }
    };
    const data = contentMap[tabName];
    if (!data) return '';
    return `
        <div class="max-w-4xl mx-auto">
            <a href="${data.link.href}" target="_blank" class="cyber-card flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 hover:shadow-xl transition-all cursor-pointer group">
                <div class="flex-grow">
                    <h3 class="text-2xl font-bold text-primary mb-2">${data.title}</h3>
                    <p class="text-secondary mb-4">${data.text}</p>
                    <span class="text-accent font-semibold flex items-center group-hover:underline">${data.link.text}</span>
                </div>
            </a>
        </div>
    `;
}

/* -------------------------------------------------------------------------- */
/* NEW PDF VIEWER LOGIC                                */
/* -------------------------------------------------------------------------- */

function injectPdfViewer() {
    if (!document.getElementById('pdf-viewer-container')) {
        const viewerHTML = `
            <div id="pdf-viewer-container" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:9999; flex-direction:column; align-items:center; justify-content:center;">
                <button onclick="closePdf()" style="position:absolute; top:20px; right:30px; color:white; font-size:40px; background:none; border:none; cursor:pointer;">&times;</button>
                <iframe id="pdf-frame" src="" style="width:90%; height:90%; border:none; border-radius:8px; background:white;"></iframe>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', viewerHTML);
    }
}

function openPdf(link) {
    let previewLink = link;
    // Auto-convert standard drive links to preview mode
    if (link.includes('drive.google.com') && (link.includes('/view') || link.includes('/edit'))) {
        previewLink = link.replace(/\/view.*/, '/preview').replace(/\/edit.*/, '/preview');
    }
    
    const container = document.getElementById('pdf-viewer-container');
    const frame = document.getElementById('pdf-frame');
    if(container && frame) {
        frame.src = previewLink;
        container.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
}

function closePdf() {
    const container = document.getElementById('pdf-viewer-container');
    const frame = document.getElementById('pdf-frame');
    if(container && frame) {
        frame.src = ''; 
        container.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/* -------------------------------------------------------------------------- */
/* DYNAMIC PDF FETCHING                        */
/* -------------------------------------------------------------------------- */

async function fetchAndRenderModulePdfs() {
    toggleFilterButtons(false);
    contentArea.innerHTML = `<div class="p-8 text-center text-secondary">Loading Modules...</div>`;
    
    try {
        const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection('module_pdfs')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .get();

        let pdfArray = [];
        snapshot.forEach(doc => {
            pdfArray.push(doc.data());
        });

        if (pdfArray.length === 0) {
            contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No PDF modules found in database.</div>`;
            return;
        }

        const cardsHtml = pdfArray.map(item => {
            return `
                <div onclick="openPdf('${item.link}')" class="card cursor-pointer block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col relative">
                    <div class="relative w-full h-44 overflow-hidden">
                        <img src="${MAIN_THUMBNAIL_URL}" alt="Class Thumbnail" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md z-10">
                            <img src="${COMPANY_LOGO_URL}" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div class="bg-white/90 rounded-full p-3 shadow-lg">
                                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                             </div>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                         <div class="flex items-center mb-2">
                             <span class="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wide">
                                 ${item.subject || 'PDF Module'}
                             </span>
                         </div>
                         <h3 class="text-lg font-bold text-primary leading-snug mb-1 group-hover:text-accent transition-colors">
                             ${item.title}
                         </h3>
                         <p class="text-xs text-secondary mt-auto pt-2 flex items-center">
                            <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Click to Open PDF
                         </p>
                    </div>
                </div>
            `;
        }).join('');

        contentArea.innerHTML = `
            <div class="mb-6 border-l-4 border-red-500 pl-4">
                 <h2 class="text-2xl font-bold text-primary">📄 Module PDFs</h2>
                 <p class="text-sm text-secondary">Fetched dynamically from Firebase. Click to read.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>
        `;
        
        injectPdfViewer();

    } catch (error) {
        console.error("Error fetching PDFs:", error);
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading PDFs: ${error.message}</div>`;
    }
}

/* -------------------------------------------------------------------------- */
/* CORE LOGIC & INIT                             */
/* -------------------------------------------------------------------------- */

function toggleFilterButtons(show) {
    filterArea.style.display = show ? 'flex' : 'none';
}

function updateFilterButtonStyling(activeOrder) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.sortOrder === activeOrder) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function handleFilterClick(event) {
    const button = event.currentTarget;
    const newSortOrder = button.dataset.sortOrder;
    if (newSortOrder === currentSortOrder) return;
    loadTabContent(currentActiveTab, newSortOrder);
}

// Map tab names to render functions
const tabContentRenderers = {
    'Free classes': (sortOrder = 'desc') => { toggleFilterButtons(true); fetchAndRenderContent('free_classes', sortOrder); },
    'Courses': (sortOrder = 'desc') => { toggleFilterButtons(true); fetchAndRenderContent('courses', sortOrder); },
    'About': () => renderAboutSection(),
    'modules': () => { toggleFilterButtons(false); renderModulesGridFromJSON(); },
    'PYQ Series': () => renderPYQGridFromJSON(),
    'Quizzes': () => loadQuizCards(),
    'module_pdf': () => fetchAndRenderModulePdfs(),  
    'Module': () => contentArea.innerHTML = renderLegacyContent('Module'),
};

function loadTabContent(tabName, sortOrder = currentSortOrder) {
    currentActiveTab = tabName;
    currentSortOrder = sortOrder;

    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    });

    if (tabName === 'Free classes' || tabName === 'Courses') {
        tabContentRenderers[tabName](sortOrder);
    } else if (tabContentRenderers[tabName]) {
        toggleFilterButtons(false);
        tabContentRenderers[tabName]();
    } else {
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
    }
}

const THEME_KEY = 'pj_profile_theme';
const themes = [
    { id: 'default-ui', name: 'Default', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
    { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
    { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' },
];

function switchTheme(themeId) {
    body.setAttribute('data-theme', themeId);
    localStorage.setItem(THEME_KEY, themeId);
    updateThemeButtons(themeId);
}

function renderThemeButtons(currentTheme) {
    themeSwitcher.innerHTML = themes.map(theme => `
        <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
            ${theme.icon} ${theme.name}
        </button>
    `).join('');
}

function updateThemeButtons(activeTheme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.themeId === activeTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
    renderThemeButtons(savedTheme);
    body.setAttribute('data-theme', savedTheme);
    
    // Inject viewer initially
    injectPdfViewer();

    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = e.currentTarget.getAttribute('data-tab');
            loadTabContent(tabName, 'desc');
        });
    });

    themeSwitcher.addEventListener('click', (e) => {
        const themeButton = e.target.closest('.theme-btn');
        if (themeButton && themeButton.dataset.themeId) {
            switchTheme(themeButton.dataset.themeId);
        }
    });

    document.getElementById('filter-latest').addEventListener('click', handleFilterClick);
    document.getElementById('filter-oldest').addEventListener('click', handleFilterClick);

    fetchAndRenderStats();
    loadTabContent('Free classes', 'desc');
});

    
    
</script>     

<script src="/history.js"></script>
   </body>
</html>

================================================================================
// File: teachers/amit-gupta-sir.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> AMIT GUPTA [ DR ] ~ NEELAXMI</title>
    <link rel="stylesheet" href="/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" type="text/css" href="/css/teacher.css">
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">


</head>

<button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<nav class="sidebar" id="sidebar">
    <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
    <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>

    
    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>


<body data-theme="default-ui">

    <img id="bg-watermark" src="/pictures/neelaxmi.jpg" alt="Watermark" onerror="this.style.display='none'">

    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4 relative z-10">
        <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
            </div>
    </div>
    <button id="backButton" class="back-button" onclick="goBack()">
        ← Go Back
    </button>
    <div class="max-w-6xl mx-auto p-4 md:p-8 relative z-10">

        <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            
            <div class="flex items-center space-x-4">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                    <img src="/pictures/AGsir.jpeg" onerror="this.src='https://placehold.co/128x128/000/fff?text=PJ'" alt="AMIT GUPTA" class="w-full h-full object-cover">
                </div>
                <div>
                    <h1 class="text-3xl font-extrabold text-primary">AMIT GUPTA SIR</h1>
                    <p class="text-sm font-semibold text-accent mt-1 uppercase tracking-wide">
                        NEET UG EDUCATOR
                    </p>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex space-x-6 text-center">
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                        <div class="text-xs text-secondary">WATCH MINS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold flex items-center justify-center">
                            <span id="dedicationsDisplay">...</span>
                            <span class="ml-1 text-yellow-500">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </span>
                        </div>
                        <div class="text-xs text-secondary">DEDICATIONS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="followersDisplay">...</div>
                        <div class="text-xs text-secondary">FOLLOWERS</div>
                    </div>
                </div>
                
                <a href="https://example.com/prateekjain-profile-link" target="_blank" 
                   class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
                    Follow
                </a>
            </div>
        </header>

        <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Courses">COURSES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Free classes">FREE CLASSES YT</a>
                
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module Discussion">Module Discussion</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden" data-tab="PYQ Series">PYQ Series</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module">Module</a>
            </div>
        </nav>

        <div id="filter-area" class="mt-6 flex flex-wrap gap-2 min-h-[40px]">
            </div>

        <div id="dynamic-content-area" class="mt-8">
            </div>

    </div>

    <script>
        
        // ----------------------------------------------------------------------
        // 1. CONFIGURATION
        // ----------------------------------------------------------------------

        const firebaseConfig = {
          apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
          authDomain: "gallery-83144.firebaseapp.com",
          projectId: "gallery-83144",
          storageBucket: "gallery-83144.firebasestorage.app",
          messagingSenderId: "1005577519231",
          appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const EDUCATOR_DOC_PATH = "educators/AMIT_GUPTA";

        const MAIN_THUMBNAIL_URL = "/PICTURES/agsir.jpeg"; 
        const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg"; 
        
        const body = document.body;
        const themeSwitcher = document.getElementById('theme-switcher');
        const contentArea = document.getElementById('dynamic-content-area');
        const filterArea = document.getElementById('filter-area');
        let activeTabCollection = []; 
        let activeTabName = '';

        // ----------------------------------------------------------------------
        // 1.5 MODULE DATA (JSON)
        // ----------------------------------------------------------------------
        const modulesData = {
          "metadata": {
            "instructor": "PRATEEK JAIN SIR",
            "target_audience": "NEET UG & JEE MAIN Aspirants",
            "created_by": "Team SAKSEN"
          },
          "courses": [
            { "title": "Units & Dimensions", "download_link": "https://drive.google.com/drive/folders/11aw51b8sIVJ_ptYJzsBx-Enf2jrQ3JBR?usp=sharing" },
            { "title": "Vectors", "download_link": "https://drive.google.com/drive/folders/1Qa5pizqei0CUKCrbuBtRPJlCr6nROxAg?usp=sharing" },
            { "title": "Kinematics - Set 1", "download_link": "https://drive.google.com/drive/folders/1uRaTcaSIi6H5hyTeI8BdVsoNIcbTrfV2?usp=sharing" },
            { "title": "Kinematics - Set 2", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "NLM & Friction", "download_link": "https://drive.google.com/drive/folders/1322zwgqz3jGITgUL27dY95n9GOh2xNy8?usp=sharing" },
            { "title": "WEP & Vertical Circular Motion", "download_link": "https://drive.google.com/drive/folders/1SlHZjBHDG44qGqsadp1BaS6_XCQMX-G1?usp=sharing" },
            { "title": "Gravitation[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/1g-uCXiX9tFyb7pnvzK0vUsmrQPOPKgoG?usp=sharing" },
            { "title": "Elasticity, Thermal Expansion & Calorimetry", "download_link": "https://drive.google.com/drive/folders/1aewV86Sc8IGMDmxyWnPezYWi2-o48ggq?usp=sharing" },
            { "title": "Fluid Mechanics", "download_link": "https://drive.google.com/drive/folders/1nUhUH3q3sI895mvXZ1p6P1nF5NgN1_IP?usp=sharing" },
            { "title": "KTG & Thermodynamics", "download_link": "https://drive.google.com/drive/folders/1ULAZ7E8Pvt-7aSvoP3t9VyQIiG4puvz0?usp=sharing" },
            { "title": "Current Electricity", "download_link": "https://drive.google.com/drive/folders/10_dILc2ZK6cLDN3A2qQx3AwAg2QcyDZd?usp=sharing" },
            { "title": "EM Waves", "download_link": "https://drive.google.com/drive/folders/1JFU86upNUJnJEJaXwflO14tb2UOGqEWKv?usp=sharing" },
            { "title": "EMI (Electromagnetic Induction)", "download_link": "https://drive.google.com/drive/folders/16WkpU9tkXPphfe2UGHmrBFL8zyEkCuRy?usp=sharing" },
            { "title": "Moving Charges and Magnetism", "download_link": "https://drive.google.com/drive/folders/1Bc5dl-iIDTs1m3mv-YAzpEL5GqGBLTz9?usp=sharing" },
            { "title": "Magnetism & Matter", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "Capacitors", "download_link": "https://drive.google.com/drive/folders/1DrBix9lCpwV2zKDE2xRP1nPwc6EzPB7o?usp=sharing" },
            { "title": "Wave Optics", "download_link": "https://drive.google.com/drive/folders/1F-C9NdmOA1cbgaReWrzC382F_Ro0f-LL?usp=sharing" },
            { "title": "Electrostatics", "download_link": "https://drive.google.com/drive/folders/1BOI4P65TCU3E5jcJlJD8nzOqbgzvk_R0?usp=sharing" },
            { "title": "AC (Alternating Current)", "download_link": "https://drive.google.com/drive/folders/1ntpeYFs2rvIqi6f28-K6nzSYVjEJuOdY?usp=sharing" },
            { "title": "Rotational Motion[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "String Waves", "download_link": "https://drive.google.com/drive/folders/192e2zwbi5p9dkmM903BJEmY4IJiJ6sMY?usp=sharing" },
            { "title": "Sound Waves", "download_link": "https://drive.google.com/drive/folders/1PDL9ThrKyk0LON_qTbsdhiYoyJ19pipA?usp=sharing" },
            { "title": "Geometric Optics & Dispersion", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "Modern Physics & Nuclear Physics", "download_link": "https://drive.google.com/drive/folders/1YivqjNHYcyaYku4OIq6BEGn8efkFWUeA?usp=sharing" }
          ],
          "social_links": [
            { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
            { "title": "Prateek sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
          ]
        };
        
        // ----------------------------------------------------------------------
        // 2. UTILITY & SKELETON LOADER
        // ----------------------------------------------------------------------
        
        function formatStat(num) {
            if (num === null || num === undefined) return '0';
            if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        };

        function formatViewCount(num) {
            if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        }

        function getSkeletonLoader() {
            return Array(6).fill(0).map(() => `
                <div class="card rounded-xl overflow-hidden h-72">
                    <div class="h-44 bg-gray-200 skeleton w-full"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-200 skeleton rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 skeleton rounded w-1/2"></div>
                    </div>
                </div>
            `).join('');
        }

        function fetchAndRenderStats() {
            db.doc(EDUCATOR_DOC_PATH).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                        document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                        document.getElementById('followersDisplay').textContent = formatStat(data.followers);
                    }
                });
        }
        
        // ----------------------------------------------------------------------
        // 3. DYNAMIC CONTENT & SMART FILTERING LOGIC
        // ----------------------------------------------------------------------

        async function fetchAndRenderContent(collectionName) {
            activeTabName = collectionName;
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${getSkeletonLoader()}</div>`;
            filterArea.innerHTML = ''; 

            try {
                const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
                                        .where('status', '==', 'approved')
                                        .orderBy('createdAt', 'desc') 
                                        .get();

                let contentArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
                    contentArray.push(data);
                });

                activeTabCollection = contentArray;
                
                // GENERATE FILTERS
                generateDynamicFilters(contentArray);

                renderFilteredContent(contentArray);

            } catch (error) {
                console.error("Error fetching content:", error);
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
            }
        }

        // --- UPDATED SMART FILTER FUNCTION ---
        // Checks 'subject', 'class', and 'status' fields from Firebase
        function generateDynamicFilters(data) {
            if(!data || data.length === 0) return;

            // Collect all unique tags from multiple fields
            const tags = new Set();
            
            data.forEach(item => {
                if (item.subject) tags.add(item.subject);
                if (item.class) tags.add(item.class);     // Checks for 'class' field (e.g. 11th)
                if (item.status) tags.add(item.status);   // Checks for 'status' field (e.g. Ongoing)
            });
            
            const uniqueTags = [...tags];

            let html = `<button class="filter-btn active" onclick="applyFilter('all', this)">All</button>`;
            
            uniqueTags.forEach(tag => {
                html += `<button class="filter-btn" onclick="applyFilter('${tag}', this)">${tag}</button>`;
            });

            filterArea.innerHTML = html;
        }

        // --- UPDATED APPLY FILTER FUNCTION ---
        window.applyFilter = function(criteria, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            if (criteria === 'all') {
                renderFilteredContent(activeTabCollection);
            } else {
                // Smart Filter: Checks if the criteria matches ANY of the fields
                const filtered = activeTabCollection.filter(item => 
                    (item.subject === criteria) || 
                    (item.class === criteria) || 
                    (item.status === criteria) ||
                    (item.language === criteria)
                );
                renderFilteredContent(filtered);
            }
        }

        function renderFilteredContent(data) {
            if (activeTabName === 'free_classes') {
                renderFreeClassCards(data);
            } else if (activeTabName === 'courses') {
                renderCourseCards(data);
            }
        }
        
        function renderFreeClassCards(contentArray) {
            if (contentArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = contentArray.map(item => {
                const thumb = MAIN_THUMBNAIL_URL;
                const logo = COMPANY_LOGO_URL;
                const dateDisplay = item.timeText || 'Date N/A';
                
                return `
                    <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                <img src="${logo}" class="w-full h-full object-cover">
                            </div>
                            ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    ${item.subject || 'Physics'}
                                </span>
                                ${item.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${item.class}</span>` : ''}
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                ${item.title}
                            </h3>
                            <div class="flex items-center gap-3 mb-4 text-sm">
                                <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span class="font-medium">Starts: ${dateDisplay}</span>
                                </div>
                            </div>
                            <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    ${item.description || 'No description provided.'}
                                </p>
                            </div>
                            <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                                <span class="text-sm font-semibold text-blue-600 flex items-center">
                                    Watch Now 
                                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function renderCourseCards(courseArray) {
            if (courseArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = courseArray.map(course => {
                const thumb = MAIN_THUMBNAIL_URL;
                const dateDisplay = course.timeText || 'Date N/A';
                
                return `
                    <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.832 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                                Full Course
                            </div>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                ${course.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${course.class}</span>` : ''}
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Start: ${dateDisplay}
                                </span>
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${course.duration || 'N/A Duration'}
                                </span>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
                                </p>
                            </div>
                            <div class="mt-auto">
                                <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                                    View Course
                                </button>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function rendermodulesFromJSON() {
            filterArea.innerHTML = ''; 
            const modules = modulesData.courses;
            
            if (modules.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No modules found.</div>`;
                return;
            }

            const headerHtml = `
                <div class="mb-6 border-l-4 border-accent pl-4">
                    <h2 class="text-2xl font-bold text-primary">Module Topics</h2>
                    <p class="text-sm text-secondary">Comprehensive study materials and notes.</p>
                </div>
            `;

            const cardsHtml = modules.map(module => `
                <div class="card relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                    <div class="absolute top-4 right-4 text-gray-100 pointer-events-none group-hover:text-gray-50 transition-colors">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="mb-3 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-6 leading-tight">${module.title}</h3>
                    </div>
                    <div class="relative z-10 mt-auto">
                        <a href="${module.download_link}" target="_blank" class="flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                            Access Drive
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');

            contentArea.innerHTML = `
                <div class="animate-fade-in">
                    ${headerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        }        

        // ----------------------------------------------------------------------
        // 4. TAB NAVIGATION & RENDERERS
        // ----------------------------------------------------------------------

        function renderOtherContent(tabName) {
            filterArea.innerHTML = ''; 
            const contentMap = {
                'PYQ Series': { 
                    title: "PYQ Series", 
                    text: "The Previous Year Questions (PYQ) Series is crucial for understanding exam patterns and gaining a competitive edge. This link provides access to all solved papers and videos.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "View PYQ Series Material" } 
                },
                'Module': { 
                    title: "Main Module Repository", 
                    text: "This repository hosts the comprehensive, downloadable study modules (PDFs, notes, and handouts) for all topics covered in the curriculum.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "Access Module Repository" } 
                },
                'About': { 
                    title: "About the Educator", 
                    text: `PRATEEK JAIN is a highly-respected educator in the NEET UG & JEE MAIN space. Known for his clarity and comprehensive approach, he has guided countless students to success. Join the official telegram channel for daily updates and interactive sessions.`,
                    link: { href: modulesData.social_links.find(l => l.title === 'JOIN US')?.url || '#', text: "Join Official Telegram Channel" } 
                }
            };

            const data = contentMap[tabName];
            if (!data) return '';
            
            return `
                <div class="max-w-4xl mx-auto">
                    <a href="${data.link.href}" target="_blank" class="content-feature-block card p-8 rounded-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] block">
                        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div class="p-4 rounded-full bg-accent bg-opacity-10 text-accent flex-shrink-0">
                                <img src="${COMPANY_LOGO_URL}" alt="Logo" class="w-8 h-8 object-contain">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold text-primary mb-2">${data.title}</h3>
                                <p class="text-secondary mb-4">${data.text}</p>
                                <span class="text-accent font-semibold flex items-center group-hover:underline">
                                    ${data.link.text} 
                                    <svg class="w-4 h-4 ml-2 transition-transform arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }

        const tabContentRenderers = {
            'Free classes': () => fetchAndRenderContent('free_classes'),
            'Courses': () => fetchAndRenderContent('courses'),
            'About': () => contentArea.innerHTML = renderOtherContent('About'),
            'modules': () => rendermodulesFromJSON(),
            'PYQ Series': () => contentArea.innerHTML = renderOtherContent('PYQ Series'),
            'Module': () => contentArea.innerHTML = renderOtherContent('Module'),
        };

        function loadTabContent(tabName) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('tab-active');
                } else {
                    tab.classList.remove('tab-active');
                }
            });

            if (tabContentRenderers[tabName]) {
                tabContentRenderers[tabName]();
            } else {
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
            }
        }
        
        // --- THEME SWITCHER LOGIC ---
        const THEME_KEY = 'pj_profile_theme';
        const themes = [
            { id: 'default-ui', name: 'Default', icon: '☀️' },
            { id: 'dark', name: 'Dark', icon: '🌙' },
            { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
            { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
            { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' }
        ];

        function switchTheme(themeId) {
            body.setAttribute('data-theme', themeId);
            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButtons(themeId);
        }

        function renderThemeButtons(currentTheme) {
            themeSwitcher.innerHTML = themes.map(theme => `
                <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
                    ${theme.icon} ${theme.name}
                </button>
            `).join('');
        }

        function updateThemeButtons(activeTheme) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.themeId === activeTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }


        // ----------------------------------------------------------------------
        // 5. INITIALIZATION
        // ----------------------------------------------------------------------
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
        
        renderThemeButtons(savedTheme);
        body.setAttribute('data-theme', savedTheme);
        
        document.addEventListener('DOMContentLoaded', () => {
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.currentTarget.getAttribute('data-tab');
                    loadTabContent(tabName);
                });
            });
            
            themeSwitcher.addEventListener('click', (e) => {
                const themeButton = e.target.closest('.theme-btn');
                if (themeButton && themeButton.dataset.themeId) {
                    switchTheme(themeButton.dataset.themeId);
                }
            });
            
            fetchAndRenderStats();
            
            // Set Default Tab to COURSES
            loadTabContent('Courses');
        });
    </script><script src="/history.js"></script>
</body>
</html>



================================================================================
// File: teachers/prateek-jain.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prateek Jain Profile</title>
    <link rel="stylesheet" href="/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <meta name="google-site-verification" content="iatylsdA3ilcUEyKshZLLZmpDIh6TMUdj7qjgoLTWxw" />
    <link rel="stylesheet" type="text/css" href="/css/teacher.css">

    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <style>
        /* PDF Viewer Styles Copied from Ajay Sir Profile */
        #pdf-viewer-container {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 9999;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        #pdf-frame {
            width: 90%;
            height: 90%;
            border: none;
            border-radius: 8px;
            background: white;
        }
        .close-pdf {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10000;
            background: none;
            border: none;
        }
        
        /* High VFX Animations */
@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

@keyframes gradient-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.about-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.about-card:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-color: var(--accent);
}

.glow-text {
    text-shadow: 0 0 15px rgba(var(--accent-rgb), 0.3);
}

.stat-pill {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient-bg 15s ease infinite;
    color: white;
}

.accomplishment-item {
    border-left: 3px solid transparent;
    transition: all 0.3s ease;
}

.accomplishment-item:hover {
    border-left-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
    padding-left: 1rem;
}
    </style>
</head>

<body data-theme="default-ui">
    
    <button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<nav class="sidebar" id="sidebar">
    <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
    <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>
    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>


    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4">
        <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
            </div>
    </div>
    
    <div class="max-w-6xl mx-auto p-4 md:p-8">
        
        <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            
            <div class="flex items-center space-x-4">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                    <img src="/pictures/pj.jpg" onerror="this.src='https://placehold.co/128x128/000/fff?text=PJ'" alt="PRATEEK JAIN" class="w-full h-full object-cover">
                </div>
                <h1 class="text-3xl font-extrabold text-primary">PRATEEK JAIN</h1>
            </div>
            
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex space-x-6 text-center">
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                        <div class="text-xs text-secondary">WATCH MINS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold flex items-center justify-center">
                            <span id="dedicationsDisplay">...</span>
                            <span class="ml-1 text-yellow-500">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </span>
                        </div>
                        <div class="text-xs text-secondary">DEDICATIONS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="followersDisplay">...</div>
                        <div class="text-xs text-secondary">FOLLOWERS</div>
                    </div>
                </div>
                
                <a href="https://example.com/prateekjain-profile-link" target="_blank" 
                   class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
                    Follow
                </a>
            </div>
        </header>

        <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
                
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Free classes">FREE CLASSES YT</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Courses">COURSES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold " data-tab="module_pdf">MODULE PDF</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold " data-tab="modules">MODULES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="quizzes">QUIZZES</a>

                <a href="#" class="tab nav-tab py-3 text-sm font-semibold  " data-tab="About">About</a>
            </div>
        </nav>

        <div id="filter-area" class="mt-6 flex space-x-4">
            <button id="tab-latest" class="px-4 py-1.5 rounded-full text-sm font-medium border border-accent bg-accent text-accent-text transition">
                Latest
            </button>
        </div>

        <div id="dynamic-content-area" class="mt-8">
            </div>

    </div>

    <div id="pdf-viewer-container">
        <button class="close-pdf" onclick="closePdf()">&times;</button>
        <iframe id="pdf-frame" src=""></iframe>
    </div>

<script>
        
        // ----------------------------------------------------------------------
        // 1. FIREBASE SETUP
        // ----------------------------------------------------------------------

        const firebaseConfig = {
          apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
          authDomain: "gallery-83144.firebaseapp.com",
          projectId: "gallery-83144",
          storageBucket: "gallery-83144.firebasestorage.app",
          messagingSenderId: "1005577519231",
          appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const EDUCATOR_DOC_PATH = "educators/prateek_jain";

        const MAIN_THUMBNAIL_URL = "/pictures/pjsir.jpg"; 
        const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg"; 
        
        const body = document.body;
        const themeSwitcher = document.getElementById('theme-switcher');
        const contentArea = document.getElementById('dynamic-content-area');
        const filterArea = document.getElementById('filter-area');

        // State to hold current data for filtering
        let activeTabCollection = []; 
        let activeTabName = '';

        // ----------------------------------------------------------------------
        // 1.5 MODULE DATA (JSON)
        // ----------------------------------------------------------------------
        const modulesData = {
          "metadata": {
            "instructor": "PRATEEK JAIN SIR",
            "target_audience": "NEET UG & JEE MAIN Aspirants",
            "created_by": "Team SAKSEN"
          },
          "courses": [
            { "title": "Units & Dimensions", "download_link": "https://drive.google.com/drive/folders/11aw51b8sIVJ_ptYJzsBx-Enf2jrQ3JBR?usp=sharing" },
            { "title": "Vectors", "download_link": "https://drive.google.com/drive/folders/1Qa5pizqei0CUKCrbuBtRPJlCr6nROxAg?usp=sharing" },
            { "title": "Kinematics - Set 1", "download_link": "https://drive.google.com/drive/folders/1uRaTcaSIi6H5hyTeI8BdVsoNIcbTrfV2?usp=sharing" },
            { "title": "Kinematics - Set 2", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "NLM & Friction", "download_link": "https://drive.google.com/drive/folders/1322zwgqz3jGITgUL27dY95n9GOh2xNy8?usp=sharing" },
            { "title": "WEP & Vertical Circular Motion", "download_link": "https://drive.google.com/drive/folders/1SlHZjBHDG44qGqsadp1BaS6_XCQMX-G1?usp=sharing" },
            { "title": "Gravitation[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/1g-uCXiX9tFyb7pnvzK0vUsmrQPOPKgoG?usp=sharing" },
            { "title": "Elasticity, Thermal Expansion & Calorimetry", "download_link": "https://drive.google.com/drive/folders/1aewV86Sc8IGMDmxyWnPezYWi2-o48ggq?usp=sharing" },
            { "title": "Fluid Mechanics", "download_link": "https://drive.google.com/drive/folders/1nUhUH3q3sI895mvXZ1p6P1nF5NgN1_IP?usp=sharing" },
            { "title": "KTG & Thermodynamics", "download_link": "https://drive.google.com/drive/folders/1ULAZ7E8Pvt-7aSvoP3t9VyQIiG4puvz0?usp=sharing" },
            { "title": "Current Electricity", "download_link": "https://drive.google.com/drive/folders/10_dILc2ZK6cLDN3A2qQx3AwAg2QcyDZd?usp=sharing" },
            { "title": "EM Waves", "download_link": "https://drive.google.com/drive/folders/1JFU86upNUJnJEJaXwflO14tb2UOGqEWKv?usp=sharing" },
            { "title": "EMI (Electromagnetic Induction)", "download_link": "https://drive.google.com/drive/folders/16WkpU9tkXPphfe2UGHmrBFL8zyEkCuRy?usp=sharing" },
            { "title": "Moving Charges and Magnetism", "download_link": "https://drive.google.com/drive/folders/1Bc5dl-iIDTs1m3mv-YAzpEL5GqGBLTz9?usp=sharing" },
            { "title": "Magnetism & Matter", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "Capacitors", "download_link": "https://drive.google.com/drive/folders/1DrBix9lCpwV2zKDE2xRP1nPwc6EzPB7o?usp=sharing" },
            { "title": "Wave Optics", "download_link": "https://drive.google.com/drive/folders/1F-C9NdmOA1cbgaReWrzC382F_Ro0f-LL?usp=sharing" },
            { "title": "Electrostatics", "download_link": "https://drive.google.com/drive/folders/1BOI4P65TCU3E5jcJlJD8nzOqbgzvk_R0?usp=sharing" },
            { "title": "AC (Alternating Current)", "download_link": "https://drive.google.com/drive/folders/1ntpeYFs2rvIqi6f28-K6nzSYVjEJuOdY?usp=sharing" },
            { "title": "Rotational Motion[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "String Waves", "download_link": "https://drive.google.com/drive/folders/192e2zwbi5p9dkmM903BJEmY4IJiJ6sMY?usp=sharing" },
            { "title": "Sound Waves", "download_link": "https://drive.google.com/drive/folders/1PDL9ThrKyk0LON_qTbsdhiYoyJ19pipA?usp=sharing" },
            { "title": "Geometric Optics & Dispersion", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "Modern Physics & Nuclear Physics", "download_link": "https://drive.google.com/drive/folders/1YivqjNHYcyaYku4OIq6BEGn8efkFWUeA?usp=sharing" }
          ],
          "social_links": [
            { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
            { "title": "Prateek sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
          ]
        };

        // NEW: Module PDF Data Array
        const modulePdfLinks = [
            { 
                title: "Electrostatics - Full PDF", 
                link: "https://drive.google.com/file/d/YOUR_DRIVE_ID_HERE/view?usp=sharing", 
                subject: "Electrostatics" 
            },
            { 
                title: "Optics - Practice Sheet", 
                link: "https://drive.google.com/file/d/ANOTHER_DRIVE_ID/view?usp=sharing", 
                subject: "Optics" 
            },
            // Add more PDFs here
        ];
        
        // ----------------------------------------------------------------------
        // 2. UTILITY & SKELETON LOADER
        // ----------------------------------------------------------------------
        
        function formatStat(num) {
            if (num === null || num === undefined) return '0';
            if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        };

        function formatViewCount(num) {
            if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        }

        function getSkeletonLoader() {
            return Array(6).fill(0).map(() => `
                <div class="card rounded-xl overflow-hidden h-72">
                    <div class="h-44 bg-gray-200 skeleton w-full"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-200 skeleton rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 skeleton rounded w-1/2"></div>
                    </div>
                </div>
            `).join('');
        }

        function fetchAndRenderStats() {
            db.doc(EDUCATOR_DOC_PATH).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                        document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                        document.getElementById('followersDisplay').textContent = formatStat(data.followers);
                    }
                });
        }
        
        // ----------------------------------------------------------------------
        // 3. DYNAMIC CONTENT & SMART FILTERING LOGIC
        // ----------------------------------------------------------------------

        async function fetchAndRenderContent(collectionName) {
            activeTabName = collectionName;
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${getSkeletonLoader()}</div>`;
            filterArea.innerHTML = ''; 

            try {
                const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
                                        .where('status', '==', 'approved')
                                        .orderBy('createdAt', 'desc') 
                                        .get();

                let contentArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
                    contentArray.push(data);
                });

                activeTabCollection = contentArray;
                
                // GENERATE FILTERS
                generateDynamicFilters(contentArray);

                renderFilteredContent(contentArray);

            } catch (error) {
                console.error("Error fetching content:", error);
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
            }
        }


        function generateDynamicFilters(data) {
            if(!data || data.length === 0) return;

            // Collect all unique tags from multiple fields
            const tags = new Set();
            
            data.forEach(item => {
                if (item.subject) tags.add(item.subject);
                if (item.class) tags.add(item.class);     // Checks for 'class' field (e.g. 11th)
                if (item.status) tags.add(item.status);   // Checks for 'status' field (e.g. Ongoing)
            });
            
            const uniqueTags = [...tags];

            let html = `<button class="filter-btn active" onclick="applyFilter('all', this)">All</button>`;
            
            uniqueTags.forEach(tag => {
                html += `<button class="filter-btn" onclick="applyFilter('${tag}', this)">${tag}</button>`;
            });

            filterArea.innerHTML = html;
        }

        window.applyFilter = function(criteria, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            if (criteria === 'all') {
                renderFilteredContent(activeTabCollection);
            } else {
                // Smart Filter: Checks if the criteria matches ANY of the fields
                const filtered = activeTabCollection.filter(item => 
                    (item.subject === criteria) || 
                    (item.class === criteria) || 
                    (item.status === criteria) ||
                    (item.language === criteria)
                );
                renderFilteredContent(filtered);
            }
        }

        function renderFilteredContent(data) {
            if (activeTabName === 'free_classes') {
                renderFreeClassCards(data);
            } else if (activeTabName === 'courses') {
                renderCourseCards(data);
            }
        }
        
        function renderFreeClassCards(contentArray) {
            if (contentArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = contentArray.map(item => {
                const thumb = MAIN_THUMBNAIL_URL;
                const logo = COMPANY_LOGO_URL;
                const dateDisplay = item.timeText || 'Date N/A';
                
                return `
                    <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                <img src="${logo}" class="w-full h-full object-cover">
                            </div>
                            ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    ${item.subject || 'Physics'}
                                </span>
                                ${item.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${item.class}</span>` : ''}
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                ${item.title}
                            </h3>
                            <div class="flex items-center gap-3 mb-4 text-sm">
                                <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span class="font-medium">Starts: ${dateDisplay}</span>
                                </div>
                            </div>
                            <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    ${item.description || 'No description provided.'}
                                </p>
                            </div>
                            <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                                <span class="text-sm font-semibold text-blue-600 flex items-center">
                                    Watch Now 
                                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }
        
        
        function renderFilteredContent(data) {
    if (activeTabName === 'free_classes') {
        renderFreeClassCards(data);
    } else if (activeTabName === 'courses') {
        renderCourseCards(data);
    } else if (activeTabName === 'quizzes') {
        renderQuizCards(data);
    } else if (activeTabName === 'aplo') {
        renderAploCards(data);
    }
}

async function renderQuizCards(data) {

    contentArea.innerHTML = `<div class="p-8 text-center text-secondary">Loading Quizzes from DATABASE...</div>`;
    const companyLogo = COMPANY_LOGO_URL;
    
    try {
        const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection('quizzes').get();
        let quizzesArray = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            quizzesArray.push({
                id: doc.id,
                targetQuizId: data.targetQuizId,
                ...data
            });
        });
        
        if (quizzesArray.length === 0) {
            contentArea.innerHTML = `<div class="p-8 text-center text-gray-500">😔 No quizzes found on Firebase.</div>`;
            return;
        }
        
        const cardsHtml = quizzesArray.map(quiz => {
            const activeQuizID = quiz.targetQuizId ? quiz.targetQuizId : quiz.id;
            const title = quiz.title || 'Untitled Quiz';
            const subject = quiz.subject || 'General';
            const questions = quiz.questions || 'N/A';
            const duration = quiz.duration || 'N/A';
            const thumbnailImg = quiz.thumbnail || '/pictures/pjsir.jpg';
            
            return `
                <div class="card overflow-hidden rounded-xl border border-border transform hover:scale-[1.02] transition duration-300 h-full flex flex-col bg-white">
                    <div class="relative h-40 w-full overflow-hidden">
                        <img src="${thumbnailImg}" alt="${title}" class="w-full h-full object-cover">
                        ${companyLogo ? `
                            <div class="absolute top-3 left-3 bg-white/90 p-1 rounded-lg shadow-md">
                                <img src="${companyLogo}" alt="Logo" class="w-8 h-8 rounded-md object-contain">
                            </div>
                        ` : ''}
                        <div class="absolute top-3 right-3">
                            <span class="text-[10px] font-bold text-accent bg-white/95 px-2 py-1 rounded-md border border-border uppercase tracking-widest shadow-sm">
                                ${subject}
                            </span>
                        </div>
                    </div>
                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold text-primary mb-3 leading-snug line-clamp-2 min-h-[3.5rem]">
                            ${title}
                        </h3>
                        <div class="flex items-center gap-4 mb-6 mt-auto">
                            <div class="flex items-center text-xs text-secondary">
                                <i class="fas fa-list-ul mr-2 text-accent"></i>
                                <span class="font-semibold text-primary mr-1">${questions}</span> Qs
                            </div>
                            <div class="flex items-center text-xs text-secondary">
                                <i class="far fa-clock mr-2 text-accent"></i>
                                <span class="font-semibold text-primary mr-1">${duration}</span> Mins
                            </div>
                        </div>
                        <a href="/quiz/quizzes.html?uid=${activeQuizID}" 
                           class="w-full text-center py-2.5 border border-transparent text-sm font-semibold rounded-lg text-accent-text bg-accent hover:opacity-90 transition-colors flex items-center justify-center shadow-md">
                            Attempt Quiz <span class="ml-2">🚀</span>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
        
        contentArea.innerHTML = `
            <div class="mb-10 border-l-4 border-accent pl-6">
                <h2 class="text-3xl font-extrabold text-primary tracking-tight">🎯 Available Quizzes</h2>
                <p class="text-md text-secondary mt-1">Select an assessment to begin your session.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">${cardsHtml}</div>
        `;
        
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading quizzes: ${error.message}</div>`;
    }
}
function renderCourseCards(courseArray) {
    if (courseArray.length === 0) {
        contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found.</div>`;
        return;
    }
    
    const cardsHtml = courseArray.map(course => {
        const thumb = MAIN_THUMBNAIL_URL;
        const dateDisplay = course.timeText || 'Date N/A';
        
        return `
            <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                
                <div class="relative w-full h-44 overflow-hidden">
                    <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.832 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                        Full Course
                    </div>
                </div>

                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            Start: ${dateDisplay}
                        </span>
                        
                        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ${course.duration || 'N/A Duration'}
                        </span>
                    </div>

<div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
    <p class="text-sm text-gray-600 leading-relaxed">
        <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
    </p>
</div>

                    <div class="mt-auto">
                        <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                            View Course
                        </button>
                    </div>
                </div>
            </a>
        `;
    }).join('');
    
    contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>`;
}

 
        function rendermodulesFromJSON() {
            filterArea.innerHTML = ''; 
            const modules = modulesData.courses;
            
            if (modules.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No modules found.</div>`;
                return;
            }

            const headerHtml = `
                <div class="mb-6 border-l-4 border-accent pl-4">
                    <h2 class="text-2xl font-bold text-primary">Module Topics</h2>
                    <p class="text-sm text-secondary">Comprehensive study materials and notes.</p>
                </div>
            `;

            const cardsHtml = modules.map(module => `
                <div class="card relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                    <div class="absolute top-4 right-4 text-gray-100 pointer-events-none group-hover:text-gray-50 transition-colors">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="mb-3 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-6 leading-tight">${module.title}</h3>
                    </div>
                    <div class="relative z-10 mt-auto">
                        <a href="${module.download_link}" target="_blank" class="flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                            Access Drive
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');

            contentArea.innerHTML = `
                <div class="animate-fade-in">
                    ${headerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        }

        // ----------------------------------------------------------------------
        // NEW: PDF VIEWER FUNCTIONS & RENDERER
        // ----------------------------------------------------------------------

        function injectPdfViewer() {
            // Check if element exists, if not, create it (though we added it in HTML already, this is a fallback)
            if (!document.getElementById('pdf-viewer-container')) {
                const viewerHTML = `
                    <div id="pdf-viewer-container">
                        <button class="close-pdf" onclick="closePdf()">&times;</button>
                        <iframe id="pdf-frame" src=""></iframe>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', viewerHTML);
            }
        }

        function openPdf(link) {
            let previewLink = link;
            if (link.includes('drive.google.com') && (link.includes('/view') || link.includes('/edit'))) {
                previewLink = link.replace(/\/view.*/, '/preview').replace(/\/edit.*/, '/preview');
            }
            
            const container = document.getElementById('pdf-viewer-container');
            const frame = document.getElementById('pdf-frame');
            if(container && frame) {
                frame.src = previewLink;
                container.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        }

        function closePdf() {
            const container = document.getElementById('pdf-viewer-container');
            const frame = document.getElementById('pdf-frame');
            if(container && frame) {
                frame.src = ''; 
                container.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

/* -------------------------------------------------------------------------- */
/* DYNAMIC PDF FETCHING                        */
/* -------------------------------------------------------------------------- */

async function fetchAndRenderModulePdfs() {
            filterArea.innerHTML = ''; // Hide filtering buttons for this view

    contentArea.innerHTML = `<div class="p-8 text-center text-secondary">Loading Modules...</div>`;
    
    try {
        // Fetching from Firebase sub-collection 'module_pdfs'
        const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection('module_pdfs')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .get();

        let pdfArray = [];
        snapshot.forEach(doc => {
            pdfArray.push(doc.data());
        });

        if (pdfArray.length === 0) {
            contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No PDF modules found in database.</div>`;
            return;
        }

        const cardsHtml = pdfArray.map(item => {
            return `
                <div onclick="openPdf('${item.link}')" class="card cursor-pointer block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col relative">
                    <div class="relative w-full h-44 overflow-hidden">
                        <img src="${MAIN_THUMBNAIL_URL}" alt="Class Thumbnail" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md z-10">
                            <img src="${COMPANY_LOGO_URL}" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div class="bg-white/90 rounded-full p-3 shadow-lg">
                                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                             </div>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                         <div class="flex items-center mb-2">
                             <span class="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wide">
                                 ${item.subject || 'PDF Module'}
                             </span>
                         </div>
                         <h3 class="text-lg font-bold text-primary leading-snug mb-1 group-hover:text-accent transition-colors">
                             ${item.title}
                         </h3>
                         <p class="text-xs text-secondary mt-auto pt-2 flex items-center">
                            <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Click to Open PDF
                         </p>
                    </div>
                </div>
            `;
        }).join('');

        contentArea.innerHTML = `
            <div class="mb-6 border-l-4 border-red-500 pl-4">
                 <h2 class="text-2xl font-bold text-primary">📄 Module PDFs</h2>
                 <p class="text-sm text-secondary">Fetched dynamically from Firebase. Click to read.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>
        `;
        
        injectPdfViewer();

    } catch (error) {
        console.error("Error fetching PDFs:", error);
        contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading PDFs: ${error.message}</div>`;
    }
}

        // ----------------------------------------------------------------------
        // 4. TAB NAVIGATION & RENDERERS
        // ----------------------------------------------------------------------

function renderOtherContent(tabName) {
    filterArea.innerHTML = '';
    
    if (tabName === 'About') {
        // Added the RETURN keyword here
        return `
            <div class="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
                <div class="about-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div class="relative group">
                            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img src="/pictures/pjsir.jpg" class="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" alt="Prateek Jain Sir">
                        </div>

                        <div class="flex-grow text-center md:text-left">
                            <span class="stat-pill px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">Rank 1 Physics Faculty</span>
                            <h2 class="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">Prateek Jain <span class="text-accent text-2xl">Sir</span></h2>
                            <p class="text-xl italic text-secondary mb-6 font-medium">"0% Tricks. 100% Concepts."</p>
                            
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="bg-white/50 p-3 rounded-xl border border-white/50 backdrop-blur-sm">
                                    <span class="block text-2xl font-black text-primary">10+</span>
                                    <span class="text-[10px] uppercase text-secondary font-bold tracking-widest">Years Exp.</span>
                                </div>
                                <div class="bg-white/50 p-3 rounded-xl border border-white/50 backdrop-blur-sm">
                                    <span class="block text-2xl font-black text-primary">AIR 6</span>
                                    <span class="text-[10px] uppercase text-secondary font-bold tracking-widest">Top Rank</span>
                                </div>
                                <div class="bg-white/50 p-3 rounded-xl border border-white/50 backdrop-blur-sm">
                                    <span class="block text-2xl font-black text-primary">IIT-K</span>
                                    <span class="text-[10px] uppercase text-secondary font-bold tracking-widest">Research</span>
                                </div>
                                <div class="bg-white/50 p-3 rounded-xl border border-white/50 backdrop-blur-sm">
                                    <span class="block text-2xl font-black text-primary">#1</span>
                                    <span class="text-[10px] uppercase text-secondary font-bold tracking-widest">Unacademy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="about-card rounded-2xl p-6 space-y-6">
                        <h3 class="text-xl font-black text-primary flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm">
                                <i class="fas fa-microscope"></i>
                            </div>
                            Academic Research
                        </h3>
                        <p class="text-secondary leading-relaxed border-l-2 border-accent pl-4">
                            Conducted significant **Research Work with HC Verma Sir** at IIT Kanpur, focusing on advanced pedagogical methods in Physics.
                        </p>
                        <div class="space-y-4">
                            <div class="accomplishment-item p-3 rounded-lg">
                                <span class="block font-bold text-primary">Founder @Physicsaholics</span>
                                <span class="text-xs text-secondary">Leading the revolution in conceptual Physics learning.</span>
                            </div>
                            <div class="accomplishment-item p-3 rounded-lg">
                                <span class="block font-bold text-primary">Ex-Senior Faculty Kota</span>
                                <span class="text-xs text-secondary">Taught at CP Kota & FIITJEE (Delhi/Indore).</span>
                            </div>
                        </div>
                    </div>

                    <div class="about-card rounded-2xl p-6">
                        <h3 class="text-xl font-black text-primary mb-6 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                            Global Recognition
                        </h3>
                        <ul class="space-y-4">
                            <li class="flex items-center gap-3 text-sm text-secondary">
                                <i class="fas fa-check-circle text-green-500"></i> Featured in **THE HINDU** & National News.
                            </li>
                            <li class="flex items-center gap-3 text-sm text-secondary">
                                <i class="fas fa-check-circle text-green-500"></i> Interviewed by **International Media**.
                            </li>
                            <li class="flex items-center gap-3 text-sm text-secondary">
                                <i class="fas fa-check-circle text-green-500"></i> Organized KVPY Workshops for Teachers.
                            </li>
                        </ul>
                        
                        <div class="mt-8 grid grid-cols-2 gap-3">
                            <a href="https://t.me/NEET_PHYSICS" class="flex items-center justify-center gap-2 py-3 bg-[#0088cc] text-white rounded-xl font-bold text-xs hover:opacity-90 transition shadow-lg">
                                <i class="fab fa-telegram-plane"></i> NEET
                            </a>
                            <a href="https://t.me/iitjee_physics" class="flex items-center justify-center gap-2 py-3 bg-[#0088cc] text-white rounded-xl font-bold text-xs hover:opacity-90 transition shadow-lg">
                                <i class="fab fa-telegram-plane"></i> JEE
                            </a>
                        </div>
                    </div>
                </div>

                <div class="about-card rounded-2xl p-6 bg-gradient-to-r from-gray-900 to-blue-900 text-white border-none">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <span class="text-xs font-black text-blue-400 uppercase tracking-widest">Expertise</span>
                            <p class="text-lg font-bold">NEET | IIT JEE Main & Advanced | Olympiads</p>
                        </div>
                        <a href="https://wa.me/message/LGGYLVL34IW4F1" target="_blank" class="px-6 py-3 bg-white text-blue-900 rounded-xl font-black text-sm hover:scale-105 transition active:scale-95">
                            Batch Enquiry <i class="fab fa-whatsapp ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    
    
    // Add default return for other tabs if needed
    return `<div class="p-8 text-center text-secondary">Content for ${tabName} coming soon.</div>`;
}
const tabContentRenderers = {
    'Free classes': () => fetchAndRenderContent('free_classes'),
    'Courses': () => fetchAndRenderContent('courses'),
    'quizzes': () => fetchAndRenderContent('quizzes'), // New
    'modules': () => rendermodulesFromJSON(),
    'module_pdf': () => fetchAndRenderModulePdfs(),
    'About': () => contentArea.innerHTML = renderOtherContent('About'),

    
};

        function loadTabContent(tabName) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('tab-active');
                } else {
                    tab.classList.remove('tab-active');
                }
            });

            if (tabContentRenderers[tabName]) {
                tabContentRenderers[tabName]();
            } else {
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
            }
        }
        
        // --- THEME SWITCHER LOGIC ---
        const THEME_KEY = 'pj_profile_theme';
        const themes = [
            { id: 'default-ui', name: 'Default', icon: '☀️' },
            { id: 'dark', name: 'Dark', icon: '🌙' },
            { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
            { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
            { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' }
        ];

        function switchTheme(themeId) {
            body.setAttribute('data-theme', themeId);
            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButtons(themeId);
        }

        function renderThemeButtons(currentTheme) {
            themeSwitcher.innerHTML = themes.map(theme => `
                <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
                    ${theme.icon} ${theme.name}
                </button>
            `).join('');
        }

        function updateThemeButtons(activeTheme) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.themeId === activeTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }


        // ----------------------------------------------------------------------
        // 5. INITIALIZATION
        // ----------------------------------------------------------------------
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
        
        renderThemeButtons(savedTheme);
        body.setAttribute('data-theme', savedTheme);
        
        document.addEventListener('DOMContentLoaded', () => {
            // Inject PDF Viewer into body if not already present
            injectPdfViewer();
            
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.currentTarget.getAttribute('data-tab');
                    loadTabContent(tabName);
                });
            });
            
            themeSwitcher.addEventListener('click', (e) => {
                const themeButton = e.target.closest('.theme-btn');
                if (themeButton && themeButton.dataset.themeId) {
                    switchTheme(themeButton.dataset.themeId);
                }
            });
            
            fetchAndRenderStats();
            
            // Set Default Tab to COURSES
            loadTabContent('Courses');
        });
    </script>
    
    <script src="/history.js"></script>
</body>
</html>

================================================================================
// File: teachers/ramesh-sharda.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAMESH SHARDA SIR [ DADU ] ~ NEELAXMI</title>
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/teacher.css">
    <link rel="stylesheet" href="/style.css">
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<nav class="sidebar" id="sidebar">
    <a href="#" class="nav-link active"><i class="fas fa-home"></i> Home</a>
    <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>

    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>

<body data-theme="default-ui">

    <img id="bg-watermark" src="/pictures/neelaxmi.jpg" alt="Watermark" onerror="this.style.display='none'">

    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4 relative z-10">
        <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
            </div>
    </div>
    
    <div class="max-w-6xl mx-auto p-4 md:p-8 relative z-10">

        <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            
            <div class="flex items-center space-x-4">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                    <img src="/pictures/rssir2.jpeg" onerror="this.src='https://placehold.co/128x128/000/fff?text=PJ'" alt="RAMESH SHARDA SIR [ DADU ]" class="w-full h-full object-cover">
                </div>
                <div>
                    <h1 class="text-3xl font-extrabold text-primary">RAMESH SHARDA SIR [ DADU ]</h1>
                    <p class="text-sm font-semibold text-accent mt-1 uppercase tracking-wide">
                        NEET UG & JEE MAIN EDUCATOR
                    </p>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex space-x-6 text-center">
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                        <div class="text-xs text-secondary">WATCH MINS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold flex items-center justify-center">
                            <span id="dedicationsDisplay">...</span>
                            <span class="ml-1 text-yellow-500">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </span>
                        </div>
                        <div class="text-xs text-secondary">DEDICATIONS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="followersDisplay">...</div>
                        <div class="text-xs text-secondary">FOLLOWERS</div>
                    </div>
                </div>
                
                <a href="https://example.com/prateekjain-profile-link" target="_blank" 
                   class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
                    Follow
                </a>
            </div>
        </header>

        <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Courses">COURSES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Free classes">FREE CLASSES YT</a>
                
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module Discussion">Module Discussion</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden" data-tab="PYQ Series">PYQ Series</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module">Module</a>
            </div>
        </nav>

        <div id="filter-area" class="mt-6 flex flex-wrap gap-2 min-h-[40px]">
            </div>

        <div id="dynamic-content-area" class="mt-8">
            </div>

    </div>

    <script>
        
        // ----------------------------------------------------------------------
        // 1. CONFIGURATION
        // ----------------------------------------------------------------------

        const firebaseConfig = {
          apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
          authDomain: "gallery-83144.firebaseapp.com",
          projectId: "gallery-83144",
          storageBucket: "gallery-83144.firebasestorage.app",
          messagingSenderId: "1005577519231",
          appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const EDUCATOR_DOC_PATH = "educators/ramesh_sharda";

        const MAIN_THUMBNAIL_URL = "/PICTURES/rssir2.jpeg"; 
        const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg"; 
        
        const body = document.body;
        const themeSwitcher = document.getElementById('theme-switcher');
        const contentArea = document.getElementById('dynamic-content-area');
        const filterArea = document.getElementById('filter-area');

        // State to hold current data for filtering
        let activeTabCollection = []; 
        let activeTabName = '';

        // ----------------------------------------------------------------------
        // 1.5 MODULE DATA (JSON)
        // ----------------------------------------------------------------------
        const modulesData = {
          "metadata": {
            "instructor": "PRATEEK JAIN SIR",
            "target_audience": "NEET UG & JEE MAIN Aspirants",
            "created_by": "Team SAKSEN"
          },
          "courses": [
            { "title": "Units & Dimensions", "download_link": "https://drive.google.com/drive/folders/11aw51b8sIVJ_ptYJzsBx-Enf2jrQ3JBR?usp=sharing" },
            { "title": "Vectors", "download_link": "https://drive.google.com/drive/folders/1Qa5pizqei0CUKCrbuBtRPJlCr6nROxAg?usp=sharing" },
            { "title": "Kinematics - Set 1", "download_link": "https://drive.google.com/drive/folders/1uRaTcaSIi6H5hyTeI8BdVsoNIcbTrfV2?usp=sharing" },
            { "title": "Kinematics - Set 2", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "NLM & Friction", "download_link": "https://drive.google.com/drive/folders/1322zwgqz3jGITgUL27dY95n9GOh2xNy8?usp=sharing" },
            { "title": "WEP & Vertical Circular Motion", "download_link": "https://drive.google.com/drive/folders/1SlHZjBHDG44qGqsadp1BaS6_XCQMX-G1?usp=sharing" },
            { "title": "Gravitation[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/1g-uCXiX9tFyb7pnvzK0vUsmrQPOPKgoG?usp=sharing" },
            { "title": "Elasticity, Thermal Expansion & Calorimetry", "download_link": "https://drive.google.com/drive/folders/1aewV86Sc8IGMDmxyWnPezYWi2-o48ggq?usp=sharing" },
            { "title": "Fluid Mechanics", "download_link": "https://drive.google.com/drive/folders/1nUhUH3q3sI895mvXZ1p6P1nF5NgN1_IP?usp=sharing" },
            { "title": "KTG & Thermodynamics", "download_link": "https://drive.google.com/drive/folders/1ULAZ7E8Pvt-7aSvoP3t9VyQIiG4puvz0?usp=sharing" },
            { "title": "Current Electricity", "download_link": "https://drive.google.com/drive/folders/10_dILc2ZK6cLDN3A2qQx3AwAg2QcyDZd?usp=sharing" },
            { "title": "EM Waves", "download_link": "https://drive.google.com/drive/folders/1JFU86upNUJnJEJaXwflO14tb2UOGqEWKv?usp=sharing" },
            { "title": "EMI (Electromagnetic Induction)", "download_link": "https://drive.google.com/drive/folders/16WkpU9tkXPphfe2UGHmrBFL8zyEkCuRy?usp=sharing" },
            { "title": "Moving Charges and Magnetism", "download_link": "https://drive.google.com/drive/folders/1Bc5dl-iIDTs1m3mv-YAzpEL5GqGBLTz9?usp=sharing" },
            { "title": "Magnetism & Matter", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "Capacitors", "download_link": "https://drive.google.com/drive/folders/1DrBix9lCpwV2zKDE2xRP1nPwc6EzPB7o?usp=sharing" },
            { "title": "Wave Optics", "download_link": "https://drive.google.com/drive/folders/1F-C9NdmOA1cbgaReWrzC382F_Ro0f-LL?usp=sharing" },
            { "title": "Electrostatics", "download_link": "https://drive.google.com/drive/folders/1BOI4P65TCU3E5jcJlJD8nzOqbgzvk_R0?usp=sharing" },
            { "title": "AC (Alternating Current)", "download_link": "https://drive.google.com/drive/folders/1ntpeYFs2rvIqi6f28-K6nzSYVjEJuOdY?usp=sharing" },
            { "title": "Rotational Motion[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "String Waves", "download_link": "https://drive.google.com/drive/folders/192e2zwbi5p9dkmM903BJEmY4IJiJ6sMY?usp=sharing" },
            { "title": "Sound Waves", "download_link": "https://drive.google.com/drive/folders/1PDL9ThrKyk0LON_qTbsdhiYoyJ19pipA?usp=sharing" },
            { "title": "Geometric Optics & Dispersion", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "Modern Physics & Nuclear Physics", "download_link": "https://drive.google.com/drive/folders/1YivqjNHYcyaYku4OIq6BEGn8efkFWUeA?usp=sharing" }
          ],
          "social_links": [
            { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
            { "title": "Prateek sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
          ]
        };
        
        // ----------------------------------------------------------------------
        // 2. UTILITY & SKELETON LOADER
        // ----------------------------------------------------------------------
        
        function formatStat(num) {
            if (num === null || num === undefined) return '0';
            if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        };

        function formatViewCount(num) {
            if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        }

        function getSkeletonLoader() {
            return Array(6).fill(0).map(() => `
                <div class="card rounded-xl overflow-hidden h-72">
                    <div class="h-44 bg-gray-200 skeleton w-full"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-200 skeleton rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 skeleton rounded w-1/2"></div>
                    </div>
                </div>
            `).join('');
        }

        function fetchAndRenderStats() {
            db.doc(EDUCATOR_DOC_PATH).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                        document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                        document.getElementById('followersDisplay').textContent = formatStat(data.followers);
                    }
                });
        }
        
        // ----------------------------------------------------------------------
        // 3. DYNAMIC CONTENT & SMART FILTERING LOGIC
        // ----------------------------------------------------------------------

        async function fetchAndRenderContent(collectionName) {
            activeTabName = collectionName;
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${getSkeletonLoader()}</div>`;
            filterArea.innerHTML = ''; 

            try {
                const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
                                        .where('status', '==', 'approved')
                                        .orderBy('createdAt', 'desc') 
                                        .get();

                let contentArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
                    contentArray.push(data);
                });

                activeTabCollection = contentArray;
                
                // GENERATE FILTERS
                generateDynamicFilters(contentArray);

                renderFilteredContent(contentArray);

            } catch (error) {
                console.error("Error fetching content:", error);
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
            }
        }

        // --- UPDATED SMART FILTER FUNCTION ---
        // Checks 'subject', 'class', and 'status' fields from Firebase
        function generateDynamicFilters(data) {
            if(!data || data.length === 0) return;

            // Collect all unique tags from multiple fields
            const tags = new Set();
            
            data.forEach(item => {
                if (item.subject) tags.add(item.subject);
                if (item.class) tags.add(item.class);     // Checks for 'class' field (e.g. 11th)
                if (item.status) tags.add(item.status);   // Checks for 'status' field (e.g. Ongoing)
            });
            
            const uniqueTags = [...tags];

            let html = `<button class="filter-btn active" onclick="applyFilter('all', this)">All</button>`;
            
            uniqueTags.forEach(tag => {
                html += `<button class="filter-btn" onclick="applyFilter('${tag}', this)">${tag}</button>`;
            });

            filterArea.innerHTML = html;
        }

        // --- UPDATED APPLY FILTER FUNCTION ---
        window.applyFilter = function(criteria, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            if (criteria === 'all') {
                renderFilteredContent(activeTabCollection);
            } else {
                // Smart Filter: Checks if the criteria matches ANY of the fields
                const filtered = activeTabCollection.filter(item => 
                    (item.subject === criteria) || 
                    (item.class === criteria) || 
                    (item.status === criteria) ||
                    (item.language === criteria)
                );
                renderFilteredContent(filtered);
            }
        }

        function renderFilteredContent(data) {
            if (activeTabName === 'free_classes') {
                renderFreeClassCards(data);
            } else if (activeTabName === 'courses') {
                renderCourseCards(data);
            }
        }
        
        function renderFreeClassCards(contentArray) {
            if (contentArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = contentArray.map(item => {
                const thumb = MAIN_THUMBNAIL_URL;
                const logo = COMPANY_LOGO_URL;
                const dateDisplay = item.timeText || 'Date N/A';
                
                return `
                    <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                <img src="${logo}" class="w-full h-full object-cover">
                            </div>
                            ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    ${item.subject || 'Physics'}
                                </span>
                                ${item.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${item.class}</span>` : ''}
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                ${item.title}
                            </h3>
                            <div class="flex items-center gap-3 mb-4 text-sm">
                                <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span class="font-medium">Starts: ${dateDisplay}</span>
                                </div>
                            </div>
                            <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    ${item.description || 'No description provided.'}
                                </p>
                            </div>
                            <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                                <span class="text-sm font-semibold text-blue-600 flex items-center">
                                    Watch Now 
                                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function renderCourseCards(courseArray) {
            if (courseArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = courseArray.map(course => {
                const thumb = MAIN_THUMBNAIL_URL;
                const dateDisplay = course.timeText || 'Date N/A';
                
                return `
                    <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.832 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                                Full Course
                            </div>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                ${course.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${course.class}</span>` : ''}
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Start: ${dateDisplay}
                                </span>
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${course.duration || 'N/A Duration'}
                                </span>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
                                </p>
                            </div>
                            <div class="mt-auto">
                                <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                                    View Course
                                </button>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function rendermodulesFromJSON() {
            filterArea.innerHTML = ''; 
            const modules = modulesData.courses;
            
            if (modules.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No modules found.</div>`;
                return;
            }

            const headerHtml = `
                <div class="mb-6 border-l-4 border-accent pl-4">
                    <h2 class="text-2xl font-bold text-primary">Module Topics</h2>
                    <p class="text-sm text-secondary">Comprehensive study materials and notes.</p>
                </div>
            `;

            const cardsHtml = modules.map(module => `
                <div class="card relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                    <div class="absolute top-4 right-4 text-gray-100 pointer-events-none group-hover:text-gray-50 transition-colors">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="mb-3 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-6 leading-tight">${module.title}</h3>
                    </div>
                    <div class="relative z-10 mt-auto">
                        <a href="${module.download_link}" target="_blank" class="flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                            Access Drive
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');

            contentArea.innerHTML = `
                <div class="animate-fade-in">
                    ${headerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        }        

        // ----------------------------------------------------------------------
        // 4. TAB NAVIGATION & RENDERERS
        // ----------------------------------------------------------------------

        function renderOtherContent(tabName) {
            filterArea.innerHTML = ''; 
            const contentMap = {
                'PYQ Series': { 
                    title: "PYQ Series", 
                    text: "The Previous Year Questions (PYQ) Series is crucial for understanding exam patterns and gaining a competitive edge. This link provides access to all solved papers and videos.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "View PYQ Series Material" } 
                },
                'Module': { 
                    title: "Main Module Repository", 
                    text: "This repository hosts the comprehensive, downloadable study modules (PDFs, notes, and handouts) for all topics covered in the curriculum.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "Access Module Repository" } 
                },
                'About': { 
                    title: "About the Educator", 
                    text: `PRATEEK JAIN is a highly-respected educator in the NEET UG & JEE MAIN space. Known for his clarity and comprehensive approach, he has guided countless students to success. Join the official telegram channel for daily updates and interactive sessions.`,
                    link: { href: modulesData.social_links.find(l => l.title === 'JOIN US')?.url || '#', text: "Join Official Telegram Channel" } 
                }
            };

            const data = contentMap[tabName];
            if (!data) return '';
            
            return `
                <div class="max-w-4xl mx-auto">
                    <a href="${data.link.href}" target="_blank" class="content-feature-block card p-8 rounded-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] block">
                        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div class="p-4 rounded-full bg-accent bg-opacity-10 text-accent flex-shrink-0">
                                <img src="${COMPANY_LOGO_URL}" alt="Logo" class="w-8 h-8 object-contain">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold text-primary mb-2">${data.title}</h3>
                                <p class="text-secondary mb-4">${data.text}</p>
                                <span class="text-accent font-semibold flex items-center group-hover:underline">
                                    ${data.link.text} 
                                    <svg class="w-4 h-4 ml-2 transition-transform arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }

        const tabContentRenderers = {
            'Free classes': () => fetchAndRenderContent('free_classes'),
            'Courses': () => fetchAndRenderContent('courses'),
            'About': () => contentArea.innerHTML = renderOtherContent('About'),
            'modules': () => rendermodulesFromJSON(),
            'PYQ Series': () => contentArea.innerHTML = renderOtherContent('PYQ Series'),
            'Module': () => contentArea.innerHTML = renderOtherContent('Module'),
        };

        function loadTabContent(tabName) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('tab-active');
                } else {
                    tab.classList.remove('tab-active');
                }
            });

            if (tabContentRenderers[tabName]) {
                tabContentRenderers[tabName]();
            } else {
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
            }
        }
        
        // --- THEME SWITCHER LOGIC ---
        const THEME_KEY = 'pj_profile_theme';
        const themes = [
            { id: 'default-ui', name: 'Default', icon: '☀️' },
            { id: 'dark', name: 'Dark', icon: '🌙' },
            { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
            { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
            { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' }
        ];

        function switchTheme(themeId) {
            body.setAttribute('data-theme', themeId);
            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButtons(themeId);
        }

        function renderThemeButtons(currentTheme) {
            themeSwitcher.innerHTML = themes.map(theme => `
                <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
                    ${theme.icon} ${theme.name}
                </button>
            `).join('');
        }

        function updateThemeButtons(activeTheme) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.themeId === activeTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }


        // ----------------------------------------------------------------------
        // 5. INITIALIZATION
        // ----------------------------------------------------------------------
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
        
        renderThemeButtons(savedTheme);
        body.setAttribute('data-theme', savedTheme);
        
        document.addEventListener('DOMContentLoaded', () => {
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.currentTarget.getAttribute('data-tab');
                    loadTabContent(tabName);
                });
            });
            
            themeSwitcher.addEventListener('click', (e) => {
                const themeButton = e.target.closest('.theme-btn');
                if (themeButton && themeButton.dataset.themeId) {
                    switchTheme(themeButton.dataset.themeId);
                }
            });
            
            fetchAndRenderStats();
            
            // Set Default Tab to COURSES
            loadTabContent('Courses');
        });
    </script>
    
        <script src="/history.js"></script>

    
</body>
</html>



================================================================================
// File: teachers/seep-mam.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEEP PAHUJA MAM ~ NEELAXMI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    <link rel="stylesheet" type="text/css" href="/css/teacher.css">
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<nav class="sidebar" id="sidebar">
    <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
    <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>

    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>

<body data-theme="default-ui">
    

    <img id="bg-watermark" src="/pictures/neelaxmi.jpg" alt="Watermark" onerror="this.style.display='none'">

    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4 relative z-10">
        <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
            </div>
    </div>
    
    <div class="max-w-6xl mx-auto p-4 md:p-8 relative z-10">

        <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            
            <div class="flex items-center space-x-4">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                    <img src="/pictures/seepmam3.jpg" onerror="this.src='https://placehold.co/128x128/000/fff?text=PJ'" alt="SEEP PAHUJA" class="w-full h-full object-cover">
                </div>
                <div>
                    <h1 class="text-3xl font-extrabold text-primary">SEEP PAHUJA</h1>
                    <p class="text-sm font-semibold text-accent mt-1 uppercase tracking-wide">
                        NEET UG & JEE MAIN EDUCATOR
                    </p>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex space-x-6 text-center">
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                        <div class="text-xs text-secondary">WATCH MINS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold flex items-center justify-center">
                            <span id="dedicationsDisplay">...</span>
                            <span class="ml-1 text-yellow-500">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </span>
                        </div>
                        <div class="text-xs text-secondary">DEDICATIONS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="followersDisplay">...</div>
                        <div class="text-xs text-secondary">FOLLOWERS</div>
                    </div>
                </div>
                
                <a href="https://example.com/prateekjain-profile-link" target="_blank" 
                   class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
                    Follow
                </a>
            </div>
        </header>

        <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Courses">COURSES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold" data-tab="Free classes">FREE CLASSES YT</a>
                
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module Discussion">Module Discussion</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden" data-tab="PYQ Series">PYQ Series</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module">Module</a>
            </div>
        </nav>

        <div id="filter-area" class="mt-6 flex flex-wrap gap-2 min-h-[40px]">
            </div>

        <div id="dynamic-content-area" class="mt-8">
            </div>

    </div>

    <script>
        
        // ----------------------------------------------------------------------
        // 1. CONFIGURATION
        // ----------------------------------------------------------------------

        const firebaseConfig = {
          apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
          authDomain: "gallery-83144.firebaseapp.com",
          projectId: "gallery-83144",
          storageBucket: "gallery-83144.firebasestorage.app",
          messagingSenderId: "1005577519231",
          appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const EDUCATOR_DOC_PATH = "educators/seep_mam";

        const MAIN_THUMBNAIL_URL = "/PICTURES/seepMAM2.jpg"; 
        const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg"; 
        
        const body = document.body;
        const themeSwitcher = document.getElementById('theme-switcher');
        const contentArea = document.getElementById('dynamic-content-area');
        const filterArea = document.getElementById('filter-area');

        // State to hold current data for filtering
        let activeTabCollection = []; 
        let activeTabName = '';

        // ----------------------------------------------------------------------
        // 1.5 MODULE DATA (JSON)
        // ----------------------------------------------------------------------
        const modulesData = {
          "metadata": {
            "instructor": "PRATEEK JAIN SIR",
            "target_audience": "NEET UG & JEE MAIN Aspirants",
            "created_by": "Team SAKSEN"
          },
          "courses": [
            { "title": "Units & Dimensions", "download_link": "https://drive.google.com/drive/folders/11aw51b8sIVJ_ptYJzsBx-Enf2jrQ3JBR?usp=sharing" },
            { "title": "Vectors", "download_link": "https://drive.google.com/drive/folders/1Qa5pizqei0CUKCrbuBtRPJlCr6nROxAg?usp=sharing" },
            { "title": "Kinematics - Set 1", "download_link": "https://drive.google.com/drive/folders/1uRaTcaSIi6H5hyTeI8BdVsoNIcbTrfV2?usp=sharing" },
            { "title": "Kinematics - Set 2", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "NLM & Friction", "download_link": "https://drive.google.com/drive/folders/1322zwgqz3jGITgUL27dY95n9GOh2xNy8?usp=sharing" },
            { "title": "WEP & Vertical Circular Motion", "download_link": "https://drive.google.com/drive/folders/1SlHZjBHDG44qGqsadp1BaS6_XCQMX-G1?usp=sharing" },
            { "title": "Gravitation[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/1g-uCXiX9tFyb7pnvzK0vUsmrQPOPKgoG?usp=sharing" },
            { "title": "Elasticity, Thermal Expansion & Calorimetry", "download_link": "https://drive.google.com/drive/folders/1aewV86Sc8IGMDmxyWnPezYWi2-o48ggq?usp=sharing" },
            { "title": "Fluid Mechanics", "download_link": "https://drive.google.com/drive/folders/1nUhUH3q3sI895mvXZ1p6P1nF5NgN1_IP?usp=sharing" },
            { "title": "KTG & Thermodynamics", "download_link": "https://drive.google.com/drive/folders/1ULAZ7E8Pvt-7aSvoP3t9VyQIiG4puvz0?usp=sharing" },
            { "title": "Current Electricity", "download_link": "https://drive.google.com/drive/folders/10_dILc2ZK6cLDN3A2qQx3AwAg2QcyDZd?usp=sharing" },
            { "title": "EM Waves", "download_link": "https://drive.google.com/drive/folders/1JFU86upNUJnJEJaXwflO14tb2UOGqEWKv?usp=sharing" },
            { "title": "EMI (Electromagnetic Induction)", "download_link": "https://drive.google.com/drive/folders/16WkpU9tkXPphfe2UGHmrBFL8zyEkCuRy?usp=sharing" },
            { "title": "Moving Charges and Magnetism", "download_link": "https://drive.google.com/drive/folders/1Bc5dl-iIDTs1m3mv-YAzpEL5GqGBLTz9?usp=sharing" },
            { "title": "Magnetism & Matter", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "Capacitors", "download_link": "https://drive.google.com/drive/folders/1DrBix9lCpwV2zKDE2xRP1nPwc6EzPB7o?usp=sharing" },
            { "title": "Wave Optics", "download_link": "https://drive.google.com/drive/folders/1F-C9NdmOA1cbgaReWrzC382F_Ro0f-LL?usp=sharing" },
            { "title": "Electrostatics", "download_link": "https://drive.google.com/drive/folders/1BOI4P65TCU3E5jcJlJD8nzOqbgzvk_R0?usp=sharing" },
            { "title": "AC (Alternating Current)", "download_link": "https://drive.google.com/drive/folders/1ntpeYFs2rvIqi6f28-K6nzSYVjEJuOdY?usp=sharing" },
            { "title": "Rotational Motion[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "String Waves", "download_link": "https://drive.google.com/drive/folders/192e2zwbi5p9dkmM903BJEmY4IJiJ6sMY?usp=sharing" },
            { "title": "Sound Waves", "download_link": "https://drive.google.com/drive/folders/1PDL9ThrKyk0LON_qTbsdhiYoyJ19pipA?usp=sharing" },
            { "title": "Geometric Optics & Dispersion", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "Modern Physics & Nuclear Physics", "download_link": "https://drive.google.com/drive/folders/1YivqjNHYcyaYku4OIq6BEGn8efkFWUeA?usp=sharing" }
          ],
          "social_links": [
            { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
            { "title": "Prateek sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
          ]
        };
        
        // ----------------------------------------------------------------------
        // 2. UTILITY & SKELETON LOADER
        // ----------------------------------------------------------------------
        
        function formatStat(num) {
            if (num === null || num === undefined) return '0';
            if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        };

        function formatViewCount(num) {
            if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        }

        function getSkeletonLoader() {
            return Array(6).fill(0).map(() => `
                <div class="card rounded-xl overflow-hidden h-72">
                    <div class="h-44 bg-gray-200 skeleton w-full"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-200 skeleton rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 skeleton rounded w-1/2"></div>
                    </div>
                </div>
            `).join('');
        }

        function fetchAndRenderStats() {
            db.doc(EDUCATOR_DOC_PATH).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                        document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                        document.getElementById('followersDisplay').textContent = formatStat(data.followers);
                    }
                });
        }
        
        // ----------------------------------------------------------------------
        // 3. DYNAMIC CONTENT & SMART FILTERING LOGIC
        // ----------------------------------------------------------------------

        async function fetchAndRenderContent(collectionName) {
            activeTabName = collectionName;
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${getSkeletonLoader()}</div>`;
            filterArea.innerHTML = ''; 

            try {
                const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
                                        .where('status', '==', 'approved')
                                        .orderBy('createdAt', 'desc') 
                                        .get();

                let contentArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
                    contentArray.push(data);
                });

                activeTabCollection = contentArray;
                
                // GENERATE FILTERS
                generateDynamicFilters(contentArray);

                renderFilteredContent(contentArray);

            } catch (error) {
                console.error("Error fetching content:", error);
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
            }
        }

        // --- UPDATED SMART FILTER FUNCTION ---
        // Checks 'subject', 'class', and 'status' fields from Firebase
        function generateDynamicFilters(data) {
            if(!data || data.length === 0) return;

            // Collect all unique tags from multiple fields
            const tags = new Set();
            
            data.forEach(item => {
                if (item.subject) tags.add(item.subject);
                if (item.class) tags.add(item.class);     // Checks for 'class' field (e.g. 11th)
                if (item.status) tags.add(item.status);   // Checks for 'status' field (e.g. Ongoing)
            });
            
            const uniqueTags = [...tags];

            let html = `<button class="filter-btn active" onclick="applyFilter('all', this)">All</button>`;
            
            uniqueTags.forEach(tag => {
                html += `<button class="filter-btn" onclick="applyFilter('${tag}', this)">${tag}</button>`;
            });

            filterArea.innerHTML = html;
        }

        // --- UPDATED APPLY FILTER FUNCTION ---
        window.applyFilter = function(criteria, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            if (criteria === 'all') {
                renderFilteredContent(activeTabCollection);
            } else {
                // Smart Filter: Checks if the criteria matches ANY of the fields
                const filtered = activeTabCollection.filter(item => 
                    (item.subject === criteria) || 
                    (item.class === criteria) || 
                    (item.status === criteria) ||
                    (item.language === criteria)
                );
                renderFilteredContent(filtered);
            }
        }

        function renderFilteredContent(data) {
            if (activeTabName === 'free_classes') {
                renderFreeClassCards(data);
            } else if (activeTabName === 'courses') {
                renderCourseCards(data);
            }
        }
        
        function renderFreeClassCards(contentArray) {
            if (contentArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = contentArray.map(item => {
                const thumb = MAIN_THUMBNAIL_URL;
                const logo = COMPANY_LOGO_URL;
                const dateDisplay = item.timeText || 'Date N/A';
                
                return `
                    <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                <img src="${logo}" class="w-full h-full object-cover">
                            </div>
                            ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    ${item.subject || 'Physics'}
                                </span>
                                ${item.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${item.class}</span>` : ''}
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                ${item.title}
                            </h3>
                            <div class="flex items-center gap-3 mb-4 text-sm">
                                <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span class="font-medium">Starts: ${dateDisplay}</span>
                                </div>
                            </div>
                            <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    ${item.description || 'No description provided.'}
                                </p>
                            </div>
                            <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                                <span class="text-sm font-semibold text-blue-600 flex items-center">
                                    Watch Now 
                                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function renderCourseCards(courseArray) {
            if (courseArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = courseArray.map(course => {
                const thumb = MAIN_THUMBNAIL_URL;
                const dateDisplay = course.timeText || 'Date N/A';
                
                return `
                    <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.832 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                                Full Course
                            </div>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                ${course.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${course.class}</span>` : ''}
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Start: ${dateDisplay}
                                </span>
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${course.duration || 'N/A Duration'}
                                </span>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
                                </p>
                            </div>
                            <div class="mt-auto">
                                <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                                    View Course
                                </button>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function rendermodulesFromJSON() {
            filterArea.innerHTML = ''; 
            const modules = modulesData.courses;
            
            if (modules.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No modules found.</div>`;
                return;
            }

            const headerHtml = `
                <div class="mb-6 border-l-4 border-accent pl-4">
                    <h2 class="text-2xl font-bold text-primary">Module Topics</h2>
                    <p class="text-sm text-secondary">Comprehensive study materials and notes.</p>
                </div>
            `;

            const cardsHtml = modules.map(module => `
                <div class="card relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                    <div class="absolute top-4 right-4 text-gray-100 pointer-events-none group-hover:text-gray-50 transition-colors">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="mb-3 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-6 leading-tight">${module.title}</h3>
                    </div>
                    <div class="relative z-10 mt-auto">
                        <a href="${module.download_link}" target="_blank" class="flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                            Access Drive
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');

            contentArea.innerHTML = `
                <div class="animate-fade-in">
                    ${headerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        }        

        // ----------------------------------------------------------------------
        // 4. TAB NAVIGATION & RENDERERS
        // ----------------------------------------------------------------------

        function renderOtherContent(tabName) {
            filterArea.innerHTML = ''; 
            const contentMap = {
                'PYQ Series': { 
                    title: "PYQ Series", 
                    text: "The Previous Year Questions (PYQ) Series is crucial for understanding exam patterns and gaining a competitive edge. This link provides access to all solved papers and videos.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "View PYQ Series Material" } 
                },
                'Module': { 
                    title: "Main Module Repository", 
                    text: "This repository hosts the comprehensive, downloadable study modules (PDFs, notes, and handouts) for all topics covered in the curriculum.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "Access Module Repository" } 
                },
                'About': { 
                    title: "About the Educator", 
                    text: `PRATEEK JAIN is a highly-respected educator in the NEET UG & JEE MAIN space. Known for his clarity and comprehensive approach, he has guided countless students to success. Join the official telegram channel for daily updates and interactive sessions.`,
                    link: { href: modulesData.social_links.find(l => l.title === 'JOIN US')?.url || '#', text: "Join Official Telegram Channel" } 
                }
            };

            const data = contentMap[tabName];
            if (!data) return '';
            
            return `
                <div class="max-w-4xl mx-auto">
                    <a href="${data.link.href}" target="_blank" class="content-feature-block card p-8 rounded-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] block">
                        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div class="p-4 rounded-full bg-accent bg-opacity-10 text-accent flex-shrink-0">
                                <img src="${COMPANY_LOGO_URL}" alt="Logo" class="w-8 h-8 object-contain">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold text-primary mb-2">${data.title}</h3>
                                <p class="text-secondary mb-4">${data.text}</p>
                                <span class="text-accent font-semibold flex items-center group-hover:underline">
                                    ${data.link.text} 
                                    <svg class="w-4 h-4 ml-2 transition-transform arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }

        const tabContentRenderers = {
            'Free classes': () => fetchAndRenderContent('free_classes'),
            'Courses': () => fetchAndRenderContent('courses'),
            'About': () => contentArea.innerHTML = renderOtherContent('About'),
            'modules': () => rendermodulesFromJSON(),
            'PYQ Series': () => contentArea.innerHTML = renderOtherContent('PYQ Series'),
            'Module': () => contentArea.innerHTML = renderOtherContent('Module'),
        };

        function loadTabContent(tabName) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('tab-active');
                } else {
                    tab.classList.remove('tab-active');
                }
            });

            if (tabContentRenderers[tabName]) {
                tabContentRenderers[tabName]();
            } else {
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
            }
        }
        
        // --- THEME SWITCHER LOGIC ---
        const THEME_KEY = 'pj_profile_theme';
        const themes = [
            { id: 'default-ui', name: 'Default', icon: '☀️' },
            { id: 'dark', name: 'Dark', icon: '🌙' },
            { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
            { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
            { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' }
        ];

        function switchTheme(themeId) {
            body.setAttribute('data-theme', themeId);
            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButtons(themeId);
        }

        function renderThemeButtons(currentTheme) {
            themeSwitcher.innerHTML = themes.map(theme => `
                <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
                    ${theme.icon} ${theme.name}
                </button>
            `).join('');
        }

        function updateThemeButtons(activeTheme) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.themeId === activeTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }


        // ----------------------------------------------------------------------
        // 5. INITIALIZATION
        // ----------------------------------------------------------------------
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
        
        renderThemeButtons(savedTheme);
        body.setAttribute('data-theme', savedTheme);
        
        document.addEventListener('DOMContentLoaded', () => {
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.currentTarget.getAttribute('data-tab');
                    loadTabContent(tabName);
                });
            });
            
            themeSwitcher.addEventListener('click', (e) => {
                const themeButton = e.target.closest('.theme-btn');
                if (themeButton && themeButton.dataset.themeId) {
                    switchTheme(themeButton.dataset.themeId);
                }
            });
            
            fetchAndRenderStats();
            
            // Set Default Tab to COURSES
            loadTabContent('Courses');
        });
    </script>
    <script src="/history.js"></script>
</body>
</html>



================================================================================
// File: teachers/test-series.html
================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEST SERIES ~ NEELAXMI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/jpeg" href="/pictures/neelaxmi.jpg">
    <link rel="stylesheet" type="text/css" href="/css/teacher.css">
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/style.css">

</head>
<button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<nav class="sidebar" id="sidebar">
    <a href="/index.html" class="nav-link active"><i class="fas fa-home"></i> Home</a>
    <a href="/quiz/DASHBOARD.HTML" class="nav-link"><i class="fas fa-brain"></i> DASHBOARD</a>

    <a href="https://akmsirdiscussion.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-comments"></i> AKM SIR DISCUSSION</a>
    <a href="https://neetcountdown2026.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-clock"></i> NEET COUNTDOWN</a>
    <a href="https://saksenquiz.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-lightbulb"></i> SAKSEN QUIZ CORNER</a>
    <a href="https://dppanalysis.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-chart-bar"></i> DPP ANALYSIS</a>
    <a href="#" target="_blank" class="nav-link"><i class="fas fa-calendar-check"></i> SCHEDULE TRACKER</a>
    <a href="http://diwalisak.netlify.app/" target="_blank" class="nav-link"><i class="fas fa-firework"></i> DIWALI VFX</a>
    
    <a href="https://telegram.me/saksen_main_bot" target="_blank" class="nav-link"><i class="fab fa-telegram"></i> MAIN BOT</a>

    <div style="margin-top: auto; padding: 20px; font-size: 0.75rem; color: #64748b;">
        © <span id="year"></span> TEAM SAKSEN
    </div>
</nav>


<body data-theme="default-ui">

    <img id="bg-watermark" src="/pictures/neelaxmi.jpg" alt="Watermark" onerror="this.style.display='none'">

    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-4 relative z-10">
        <div id="theme-switcher" class="flex flex-wrap gap-2 p-2 card rounded-xl shadow-lg border-none">
            </div>
    </div>
    
    <div class="max-w-6xl mx-auto p-4 md:p-8 relative z-10">

        <header class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-6 border-b border-border">
            
            <div class="flex items-center space-x-4">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                    <img src="/pictures/neelaxmi.jpg" onerror="this.src='https://placehold.co/128x128/000/fff?text=PJ'" alt="TEST SERIES" class="w-full h-full object-cover">
                </div>
                <div>
                    <h1 class="text-3xl font-extrabold text-primary">TEST SERIES </h1>
                    <p class="text-sm font-semibold text-accent mt-1 uppercase tracking-wide">
                     JUST AN CHECKER
                    </p>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex space-x-6 text-center">
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="watchMinsDisplay">...</div>
                        <div class="text-xs text-secondary">WATCH MINS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold flex items-center justify-center">
                            <span id="dedicationsDisplay">...</span>
                            <span class="ml-1 text-yellow-500">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </span>
                        </div>
                        <div class="text-xs text-secondary">DEDICATIONS</div>
                    </div>
                    <div class="text-primary">
                        <div class="text-xl font-bold" id="followersDisplay">...</div>
                        <div class="text-xs text-secondary">FOLLOWERS</div>
                    </div>
                </div>
                
                <a href="https://example.com/prateekjain-profile-link" target="_blank" 
                   class="px-6 py-2 rounded-lg font-semibold bg-accent text-accent-text hover:opacity-90 transition w-full md:w-w-auto text-center inline-block">
                    Follow
                </a>
            </div>
        </header>

        <nav class="mt-8">
            <div class="flex space-x-6 overflow-x-auto whitespace-nowrap border-b border-border">
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold tab-active" data-tab="Courses">TEST SERIES</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Free classes">FREE CLASSES YT</a>
                
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module Discussion">Module Discussion</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden" data-tab="PYQ Series">PYQ Series</a>
                <a href="#" class="tab nav-tab py-3 text-sm font-semibold hidden " data-tab="Module">Module</a>
            </div>
        </nav>

        <div id="filter-area" class="mt-6 flex flex-wrap gap-2 min-h-[40px]">
            </div>

        <div id="dynamic-content-area" class="mt-8">
            </div>

    </div>

    <script>
        
        // ----------------------------------------------------------------------
        // 1. CONFIGURATION
        // ----------------------------------------------------------------------

        const firebaseConfig = {
          apiKey: "AIzaSyDAZ_xwRd_uJcf-Gzv58HA9f_HZ7BCCJ8g",
          authDomain: "gallery-83144.firebaseapp.com",
          projectId: "gallery-83144",
          storageBucket: "gallery-83144.firebasestorage.app",
          messagingSenderId: "1005577519231",
          appId: "1:1005577519231:web:638899904126ae78cdff4a"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const EDUCATOR_DOC_PATH = "educators/TEST_SERIES";

        const MAIN_THUMBNAIL_URL = "/PICTURES/neelaxmi.jpg"; 
        const COMPANY_LOGO_URL = "/pictures/neelaxmi.jpg"; 
        
        const body = document.body;
        const themeSwitcher = document.getElementById('theme-switcher');
        const contentArea = document.getElementById('dynamic-content-area');
        const filterArea = document.getElementById('filter-area');

        // State to hold current data for filtering
        let activeTabCollection = []; 
        let activeTabName = '';

        // ----------------------------------------------------------------------
        // 1.5 MODULE DATA (JSON)
        // ----------------------------------------------------------------------
        const modulesData = {
          "metadata": {
            "instructor": "PRATEEK JAIN SIR",
            "target_audience": "NEET UG & JEE MAIN Aspirants",
            "created_by": "Team SAKSEN"
          },
          "courses": [
            { "title": "Units & Dimensions", "download_link": "https://drive.google.com/drive/folders/11aw51b8sIVJ_ptYJzsBx-Enf2jrQ3JBR?usp=sharing" },
            { "title": "Vectors", "download_link": "https://drive.google.com/drive/folders/1Qa5pizqei0CUKCrbuBtRPJlCr6nROxAg?usp=sharing" },
            { "title": "Kinematics - Set 1", "download_link": "https://drive.google.com/drive/folders/1uRaTcaSIi6H5hyTeI8BdVsoNIcbTrfV2?usp=sharing" },
            { "title": "Kinematics - Set 2", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "NLM & Friction", "download_link": "https://drive.google.com/drive/folders/1322zwgqz3jGITgUL27dY95n9GOh2xNy8?usp=sharing" },
            { "title": "WEP & Vertical Circular Motion", "download_link": "https://drive.google.com/drive/folders/1SlHZjBHDG44qGqsadp1BaS6_XCQMX-G1?usp=sharing" },
            { "title": "Gravitation[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/1g-uCXiX9tFyb7pnvzK0vUsmrQPOPKgoG?usp=sharing" },
            { "title": "Elasticity, Thermal Expansion & Calorimetry", "download_link": "https://drive.google.com/drive/folders/1aewV86Sc8IGMDmxyWnPezYWi2-o48ggq?usp=sharing" },
            { "title": "Fluid Mechanics", "download_link": "https://drive.google.com/drive/folders/1nUhUH3q3sI895mvXZ1p6P1nF5NgN1_IP?usp=sharing" },
            { "title": "KTG & Thermodynamics", "download_link": "https://drive.google.com/drive/folders/1ULAZ7E8Pvt-7aSvoP3t9VyQIiG4puvz0?usp=sharing" },
            { "title": "Current Electricity", "download_link": "https://drive.google.com/drive/folders/10_dILc2ZK6cLDN3A2qQx3AwAg2QcyDZd?usp=sharing" },
            { "title": "EM Waves", "download_link": "https://drive.google.com/drive/folders/1JFU86upNUJnJEJaXwflO14tb2UOGqEWKv?usp=sharing" },
            { "title": "EMI (Electromagnetic Induction)", "download_link": "https://drive.google.com/drive/folders/16WkpU9tkXPphfe2UGHmrBFL8zyEkCuRy?usp=sharing" },
            { "title": "Moving Charges and Magnetism", "download_link": "https://drive.google.com/drive/folders/1Bc5dl-iIDTs1m3mv-YAzpEL5GqGBLTz9?usp=sharing" },
            { "title": "Magnetism & Matter", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "Capacitors", "download_link": "https://drive.google.com/drive/folders/1DrBix9lCpwV2zKDE2xRP1nPwc6EzPB7o?usp=sharing" },
            { "title": "Wave Optics", "download_link": "https://drive.google.com/drive/folders/1F-C9NdmOA1cbgaReWrzC382F_Ro0f-LL?usp=sharing" },
            { "title": "Electrostatics", "download_link": "https://drive.google.com/drive/folders/1BOI4P65TCU3E5jcJlJD8nzOqbgzvk_R0?usp=sharing" },
            { "title": "AC (Alternating Current)", "download_link": "https://drive.google.com/drive/folders/1ntpeYFs2rvIqi6f28-K6nzSYVjEJuOdY?usp=sharing" },
            { "title": "Rotational Motion[TEAM SAKSEN]", "download_link": "https://drive.google.com/drive/folders/19c83b28res1MVggwugQsy3UPqqMDmV-u?usp=sharing" },
            { "title": "String Waves", "download_link": "https://drive.google.com/drive/folders/192e2zwbi5p9dkmM903BJEmY4IJiJ6sMY?usp=sharing" },
            { "title": "Sound Waves", "download_link": "https://drive.google.com/drive/folders/1PDL9ThrKyk0LON_qTbsdhiYoyJ19pipA?usp=sharing" },
            { "title": "Geometric Optics & Dispersion", "download_link": "https://drive.google.com/drive/folders/1AZ7AHiYSBO-IbsHsRrhzy0I0XN8u5d6d?usp=sharing" },
            { "title": "Modern Physics & Nuclear Physics", "download_link": "https://drive.google.com/drive/folders/1YivqjNHYcyaYku4OIq6BEGn8efkFWUeA?usp=sharing" }
          ],
          "social_links": [
            { "title": "JOIN US", "url": "https://telegram.me/saksen_journey_offical" },
            { "title": "Prateek sir other material", "url": "https://telegram.me/pj_sir_dpp_module" }
          ]
        };
        
        // ----------------------------------------------------------------------
        // 2. UTILITY & SKELETON LOADER
        // ----------------------------------------------------------------------
        
        function formatStat(num) {
            if (num === null || num === undefined) return '0';
            if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        };

        function formatViewCount(num) {
            if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num;
        }

        function getSkeletonLoader() {
            return Array(6).fill(0).map(() => `
                <div class="card rounded-xl overflow-hidden h-72">
                    <div class="h-44 bg-gray-200 skeleton w-full"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-200 skeleton rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 skeleton rounded w-1/2"></div>
                    </div>
                </div>
            `).join('');
        }

        function fetchAndRenderStats() {
            db.doc(EDUCATOR_DOC_PATH).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('watchMinsDisplay').textContent = formatStat(data.watchmin);
                        document.getElementById('dedicationsDisplay').textContent = formatStat(data.dedications);
                        document.getElementById('followersDisplay').textContent = formatStat(data.followers);
                    }
                });
        }
        
        // ----------------------------------------------------------------------
        // 3. DYNAMIC CONTENT & SMART FILTERING LOGIC
        // ----------------------------------------------------------------------

        async function fetchAndRenderContent(collectionName) {
            activeTabName = collectionName;
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${getSkeletonLoader()}</div>`;
            filterArea.innerHTML = ''; 

            try {
                const snapshot = await db.doc(EDUCATOR_DOC_PATH).collection(collectionName)
                                        .where('status', '==', 'approved')
                                        .orderBy('createdAt', 'desc') 
                                        .get();

                let contentArray = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.timeText = data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date N/A';
                    contentArray.push(data);
                });

                activeTabCollection = contentArray;
                
                // GENERATE FILTERS
                generateDynamicFilters(contentArray);

                renderFilteredContent(contentArray);

            } catch (error) {
                console.error("Error fetching content:", error);
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Error loading content: ${error.message}</div>`;
            }
        }

        // --- UPDATED SMART FILTER FUNCTION ---
        // Checks 'subject', 'class', and 'status' fields from Firebase
        function generateDynamicFilters(data) {
            if(!data || data.length === 0) return;

            // Collect all unique tags from multiple fields
            const tags = new Set();
            
            data.forEach(item => {
                if (item.subject) tags.add(item.subject);
                if (item.class) tags.add(item.class);     // Checks for 'class' field (e.g. 11th)
                if (item.status) tags.add(item.status);   // Checks for 'status' field (e.g. Ongoing)
            });
            
            const uniqueTags = [...tags];

            let html = `<button class="filter-btn active" onclick="applyFilter('all', this)">All</button>`;
            
            uniqueTags.forEach(tag => {
                html += `<button class="filter-btn" onclick="applyFilter('${tag}', this)">${tag}</button>`;
            });

            filterArea.innerHTML = html;
        }

        // --- UPDATED APPLY FILTER FUNCTION ---
        window.applyFilter = function(criteria, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            if (criteria === 'all') {
                renderFilteredContent(activeTabCollection);
            } else {
                // Smart Filter: Checks if the criteria matches ANY of the fields
                const filtered = activeTabCollection.filter(item => 
                    (item.subject === criteria) || 
                    (item.class === criteria) || 
                    (item.status === criteria) ||
                    (item.language === criteria)
                );
                renderFilteredContent(filtered);
            }
        }

        function renderFilteredContent(data) {
            if (activeTabName === 'free_classes') {
                renderFreeClassCards(data);
            } else if (activeTabName === 'courses') {
                renderCourseCards(data);
            }
        }
        
        function renderFreeClassCards(contentArray) {
            if (contentArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No free classes found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = contentArray.map(item => {
                const thumb = MAIN_THUMBNAIL_URL;
                const logo = COMPANY_LOGO_URL;
                const dateDisplay = item.timeText || 'Date N/A';
                
                return `
                    <a href="${item.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-3 left-3 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                                <img src="${logo}" class="w-full h-full object-cover">
                            </div>
                            ${item.viewsCount ? `<div class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${formatViewCount(item.viewsCount)}</div>` : ''}
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    ${item.subject || 'Physics'}
                                </span>
                                ${item.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${item.class}</span>` : ''}
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                ${item.title}
                            </h3>
                            <div class="flex items-center gap-3 mb-4 text-sm">
                                <div class="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span class="font-medium">Starts: ${dateDisplay}</span>
                                </div>
                            </div>
                            <div class="relative bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    ${item.description || 'No description provided.'}
                                </p>
                            </div>
                            <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span class="text-xs text-gray-400 font-medium">${item.language || 'Hindi'}</span>
                                <span class="text-sm font-semibold text-blue-600 flex items-center">
                                    Watch Now 
                                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function renderCourseCards(courseArray) {
            if (courseArray.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No courses found for this filter.</div>`;
                return;
            }
            
            const cardsHtml = courseArray.map(course => {
                const thumb = MAIN_THUMBNAIL_URL;
                const dateDisplay = course.timeText || 'Date N/A';
                
                return `
                    <a href="${course.link}" target="_blank" class="card block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div class="relative w-full h-44 overflow-hidden">
                            <img src="${thumb}" alt="${course.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div class="absolute bottom-3 left-4 text-white font-bold flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.832 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                                Full Course
                            </div>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center mb-2 gap-2">
                                ${course.class ? `<span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wide">${course.class}</span>` : ''}
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">${course.name}</h3>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Start: ${dateDisplay}
                                </span>
                                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${course.duration || 'N/A Duration'}
                                </span>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                                <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    <span class="font-bold text-gray-800">Summary:</span> ${course.description || 'No description available.'}
                                </p>
                            </div>
                            <div class="mt-auto">
                                <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center">
                                    View Course
                                </button>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
            
            contentArea.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">${cardsHtml}</div>`;
        }

        function rendermodulesFromJSON() {
            filterArea.innerHTML = ''; 
            const modules = modulesData.courses;
            
            if (modules.length === 0) {
                contentArea.innerHTML = `<div class="p-8 text-center text-secondary">No modules found.</div>`;
                return;
            }

            const headerHtml = `
                <div class="mb-6 border-l-4 border-accent pl-4">
                    <h2 class="text-2xl font-bold text-primary">Module Topics</h2>
                    <p class="text-sm text-secondary">Comprehensive study materials and notes.</p>
                </div>
            `;

            const cardsHtml = modules.map(module => `
                <div class="card relative bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                    <div class="absolute top-4 right-4 text-gray-100 pointer-events-none group-hover:text-gray-50 transition-colors">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="mb-3 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800 mb-6 leading-tight">${module.title}</h3>
                    </div>
                    <div class="relative z-10 mt-auto">
                        <a href="${module.download_link}" target="_blank" class="flex items-center justify-center w-full py-2.5 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                            Access Drive
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');

            contentArea.innerHTML = `
                <div class="animate-fade-in">
                    ${headerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        }        

        // ----------------------------------------------------------------------
        // 4. TAB NAVIGATION & RENDERERS
        // ----------------------------------------------------------------------

        function renderOtherContent(tabName) {
            filterArea.innerHTML = ''; 
            const contentMap = {
                'PYQ Series': { 
                    title: "PYQ Series", 
                    text: "The Previous Year Questions (PYQ) Series is crucial for understanding exam patterns and gaining a competitive edge. This link provides access to all solved papers and videos.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "View PYQ Series Material" } 
                },
                'Module': { 
                    title: "Main Module Repository", 
                    text: "This repository hosts the comprehensive, downloadable study modules (PDFs, notes, and handouts) for all topics covered in the curriculum.", 
                    link: { href: modulesData.social_links.find(l => l.title === 'Prateek sir other material')?.url || '#', text: "Access Module Repository" } 
                },
                'About': { 
                    title: "About the Educator", 
                    text: `PRATEEK JAIN is a highly-respected educator in the NEET UG & JEE MAIN space. Known for his clarity and comprehensive approach, he has guided countless students to success. Join the official telegram channel for daily updates and interactive sessions.`,
                    link: { href: modulesData.social_links.find(l => l.title === 'JOIN US')?.url || '#', text: "Join Official Telegram Channel" } 
                }
            };

            const data = contentMap[tabName];
            if (!data) return '';
            
            return `
                <div class="max-w-4xl mx-auto">
                    <a href="${data.link.href}" target="_blank" class="content-feature-block card p-8 rounded-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] block">
                        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div class="p-4 rounded-full bg-accent bg-opacity-10 text-accent flex-shrink-0">
                                <img src="${COMPANY_LOGO_URL}" alt="Logo" class="w-8 h-8 object-contain">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold text-primary mb-2">${data.title}</h3>
                                <p class="text-secondary mb-4">${data.text}</p>
                                <span class="text-accent font-semibold flex items-center group-hover:underline">
                                    ${data.link.text} 
                                    <svg class="w-4 h-4 ml-2 transition-transform arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }

        const tabContentRenderers = {
            'Free classes': () => fetchAndRenderContent('free_classes'),
            'Courses': () => fetchAndRenderContent('courses'),
            'About': () => contentArea.innerHTML = renderOtherContent('About'),
            'modules': () => rendermodulesFromJSON(),
            'PYQ Series': () => contentArea.innerHTML = renderOtherContent('PYQ Series'),
            'Module': () => contentArea.innerHTML = renderOtherContent('Module'),
        };

        function loadTabContent(tabName) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('tab-active');
                } else {
                    tab.classList.remove('tab-active');
                }
            });

            if (tabContentRenderers[tabName]) {
                tabContentRenderers[tabName]();
            } else {
                contentArea.innerHTML = `<div class="p-8 text-center text-red-500">Content not available for ${tabName}.</div>`;
            }
        }
        
        // --- THEME SWITCHER LOGIC ---
        const THEME_KEY = 'pj_profile_theme';
        const themes = [
            { id: 'default-ui', name: 'Default', icon: '☀️' },
            { id: 'dark', name: 'Dark', icon: '🌙' },
            { id: 'vibrant', name: 'Vibrant', icon: '🟢' },
            { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
            { id: 'unacademy-inspired', name: 'Unacademy', icon: '⚫' }
        ];

        function switchTheme(themeId) {
            body.setAttribute('data-theme', themeId);
            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButtons(themeId);
        }

        function renderThemeButtons(currentTheme) {
            themeSwitcher.innerHTML = themes.map(theme => `
                <button class="theme-btn ${theme.id === currentTheme ? 'active' : ''}" data-theme-id="${theme.id}" >
                    ${theme.icon} ${theme.name}
                </button>
            `).join('');
        }

        function updateThemeButtons(activeTheme) {
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.themeId === activeTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }


        // ----------------------------------------------------------------------
        // 5. INITIALIZATION
        // ----------------------------------------------------------------------
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default-ui';
        
        renderThemeButtons(savedTheme);
        body.setAttribute('data-theme', savedTheme);
        
        document.addEventListener('DOMContentLoaded', () => {
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = e.currentTarget.getAttribute('data-tab');
                    loadTabContent(tabName);
                });
            });
            
            themeSwitcher.addEventListener('click', (e) => {
                const themeButton = e.target.closest('.theme-btn');
                if (themeButton && themeButton.dataset.themeId) {
                    switchTheme(themeButton.dataset.themeId);
                }
            });
            
            fetchAndRenderStats();
            
            // Set Default Tab to COURSES
            loadTabContent('Courses');
        });
    </script>
    <script src="/history.js"></script>
</body>
</html>




import { SITE_CONFIG } from "./site-config.js";
document.title = `${SITE_CONFIG.brandName} — ${SITE_CONFIG.appTitle}`;
document.querySelectorAll(".js-logo").forEach((img) => {
  img.src = SITE_CONFIG.logoPath;
  img.alt = SITE_CONFIG.brandName;
  img.onerror = () => {
    img.style.display = "none"; 
  };
});

document.querySelectorAll(".js-brand-name").forEach((el) => {
  el.textContent = SITE_CONFIG.brandName;
});

const SITE_LINKS = {
  website: SITE_CONFIG.websiteUrl,
  telegram: SITE_CONFIG.telegramUrl,
  email: `mailto:${SITE_CONFIG.supportEmail}`,
};

Object.entries(SITE_LINKS).forEach(([key, href]) => {
  document.querySelectorAll(`[data-site-link="${key}"]`).forEach((el) => {
    el.href = href;
    if (key === "email" && !el.textContent.trim()) {
      el.textContent = SITE_CONFIG.supportEmail;
    }
  });
});

const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();

const telegramModalBackdrop = document.getElementById("telegramModalBackdrop");
const telegramModalCloseBtn = document.getElementById("telegramModalCloseBtn");

function openTelegramModal() {
  if (telegramModalBackdrop) telegramModalBackdrop.classList.add("open");
}
function closeTelegramModal() {
  if (telegramModalBackdrop) telegramModalBackdrop.classList.remove("open");
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".js-open-telegram-modal")) {
    openTelegramModal();
  }
});
if (telegramModalCloseBtn) telegramModalCloseBtn.addEventListener("click", closeTelegramModal);
if (telegramModalBackdrop) {
  telegramModalBackdrop.addEventListener("click", (e) => {
    if (e.target === telegramModalBackdrop) closeTelegramModal();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".modal-backdrop.open").forEach((m) => m.classList.remove("open"));
});

const THEME_KEY = "neelaxmi:theme";

function applyTheme(theme) {
  document.body.classList.toggle("theme-light", theme === "light");
}

applyTheme(localStorage.getItem(THEME_KEY) || "dark");

const themeToggleBtn = document.getElementById("themeToggleBtn");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const next = document.body.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (err) {
    }
  });
}

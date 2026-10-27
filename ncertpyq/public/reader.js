import {
  db,
  auth,
  collection,
  getDocs,
  query,
  where,
} from "./firebase-config.js";
import { SITE_CONFIG } from "./site-config.js";
import { CHAPTERS, FREE_CHAPTER_IDS, chapterFileId, driveDirectUrl, driveProxyUrl } from "./drive-config.js";
import { hasActiveSubscription, openUnlockModal } from "./subscription.js";
import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  
  
  
const appShell = document.getElementById("appShell");
const chapterSelect = document.getElementById("chapterSelect");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const edgePrevBtn = document.getElementById("edgePrevBtn");
const edgeNextBtn = document.getElementById("edgeNextBtn");
const pageIndicator = document.getElementById("pageIndicator");
const viewerWrap = document.getElementById("viewerWrap");
const loadingMsg = document.getElementById("loadingMsg");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");
const pdfStage = document.getElementById("pdfStage");
const canvasEl = document.getElementById("pdfCanvas");
const watermarkCanvasEl = document.getElementById("watermarkCanvas");
const overlayEl = document.getElementById("highlightOverlay");
const outroPage = document.getElementById("outroPage");
const chapterLockCard = document.getElementById("chapterLockCard");
const chapterLockUnlockBtn = document.getElementById("chapterLockUnlockBtn");
const modalBackdrop = document.getElementById("pyqModalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const pyqCountTag = document.getElementById("pyqCountTag");
const pyqListContainer = document.getElementById("pyqListContainer");
chapterSelect.innerHTML = CHAPTERS.map((c, i) =>
  `<option value="${c.id}">Chapter ${i + 1} — ${c.title}${c.free ? " (Free)" : " 🔒"}</option>`).join("");

const pdfCache = new Map(); 
const state = {
  chapterId: chapterSelect.value,
  pdfDoc: null,
  pageNum: 1,
  totalRealPages: 1,
  rendering: false,
  loadRequestId: 0,
  renderTask: null,
};

function lastPageKey(chapterId) {
  return `neelaxmi:lastPage:${chapterId}`;
}

function getResumePage(chapterId, totalRealPages) {
  if (!SITE_CONFIG.rememberLastPage) return 1;
  const saved = parseInt(localStorage.getItem(lastPageKey(chapterId)), 10);
  if (Number.isFinite(saved) && saved >= 1 && saved <= totalRealPages + 1) return saved;
  return 1;
}

function saveLastPage(num) {
  if (!SITE_CONFIG.rememberLastPage) return;
  try {
    localStorage.setItem(lastPageKey(state.chapterId), String(num));
  } catch (err) {
  }
}

function chapterIsUnlocked(chapterId) {
  return FREE_CHAPTER_IDS.has(chapterId) || hasActiveSubscription();
}

function showChapterLockCard() {
  loadingMsg.style.display = "none";
  pdfStage.style.display = "none";
  outroPage.style.display = "none";
  if (chapterLockCard) chapterLockCard.style.display = "flex";
}

function hideChapterLockCard() {
  if (chapterLockCard) chapterLockCard.style.display = "none";
}

async function readPdfBytes(url, label) {
  let res;
  try { res = await fetch(url); } catch (e) { throw new Error(`${label}: blocked or offline`); }
  if (!res.ok) {
    let msg = "";
    try { const j = await res.json(); msg = j.error ? j.error + (j.detail ? ` (${j.detail})` : "") : ""; } catch (e) {}
    throw new Error(`${label}: ${msg || "HTTP " + res.status}`);
  }
  const total = Number(res.headers.get("content-length")) || 0;
  const rd = res.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await rd.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    if (total) setLoadingProgress(Math.min(100, Math.round((loaded / total) * 100)));
    else loadingText.textContent = `Loading PDF… ${(loaded / 1048576).toFixed(1)} MB`;
  }
  const data = new Uint8Array(loaded);
  let off = 0;
  for (const c of chunks) { data.set(c, off); off += c.length; }
  if (String.fromCharCode(...data.slice(0, 4)) !== "%PDF") throw new Error(`${label}: Drive sent a web page instead of the PDF`);
  return data;
}

async function fetchChapterBytes(chapterId) {
  const id = await chapterFileId(chapterId).catch(() => null);
  if (!id) throw new Error("this chapter's link isn't set in chapters.json yet.");
  const errors = [];
  for (const [url, label] of [[driveDirectUrl(id), "direct"], [driveProxyUrl(id), "proxy"]]) {
    try { return await readPdfBytes(url, label); }
    catch (e) { console.warn(e.message); errors.push(e.message); }
  }
  throw new Error(errors.join(" · "));
}

async function loadChapterPDF(chapterId) {
  const requestId = ++state.loadRequestId;

  if (state.renderTask) {
    try { state.renderTask.cancel(); } catch (e) {}
    state.renderTask = null;
  }
  state.rendering = false;
  state.pdfDoc = null;

  if (!chapterIsUnlocked(chapterId)) {
    showChapterLockCard();
    return;
  }
  hideChapterLockCard();

  loadingMsg.style.display = "block";
  pdfStage.style.display = "none";
  outroPage.style.display = "none";
  loadingText.textContent = "Loading PDF…";
  setLoadingProgress(0);

  try {
    let pdfDoc = pdfCache.get(chapterId);

    if (!pdfDoc) {
      const data = await fetchChapterBytes(chapterId);
      if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

      pdfDoc = await pdfjsLib.getDocument({ data }).promise;
      if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

      pdfCache.set(chapterId, pdfDoc);
    }

    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

    state.pdfDoc = pdfDoc;
    state.totalRealPages = pdfDoc.numPages;
    state.pageNum = getResumePage(chapterId, state.totalRealPages);
    await renderPage(state.pageNum, chapterId, requestId);
  } catch (err) {
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;
    if (err?.name === "RenderingCancelledException") return;

    console.error("Failed to load chapter PDF:", err);
    loadingMsg.style.display = "block";
    pdfStage.style.display = "none";
    loadingText.textContent = `Couldn't load this chapter — ${err && err.message ? err.message : "please try again."}`;
  }
}

function setLoadingProgress(pct) {
  progressBar.style.width = `${pct}%`;
}

function computeLayout(page) {
  const unscaledViewport = page.getViewport({ scale: 1 });
  const cssWidth = Math.min(window.innerWidth - 32, SITE_CONFIG.maxRenderCssWidth);
  const cssScale = cssWidth / unscaledViewport.width;
  const cssHeight = unscaledViewport.height * cssScale;
  const dpr = Math.min(window.devicePixelRatio || 1, SITE_CONFIG.maxDevicePixelRatio);
  return { cssWidth, cssHeight, dpr, renderScale: cssScale * dpr };
}

async function renderPage(num, chapterId = state.chapterId, requestId = state.loadRequestId) {
  if (!state.pdfDoc || requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

  if (state.renderTask) {
    try { state.renderTask.cancel(); } catch (e) {}
    state.renderTask = null;
  }

  state.rendering = true;
  viewerWrap.classList.add("is-turning");
  let currentRenderTask = null;

  try {
    if (num > state.totalRealPages) {
      if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;
      pdfStage.style.display = "none";
      outroPage.style.display = "flex";
      loadingMsg.style.display = "none";
      updatePageIndicator(num);
      saveLastPage(num);
      settleTransition();
      return;
    }

    outroPage.style.display = "none";
    const page = await state.pdfDoc.getPage(num);
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

    const { cssWidth, cssHeight, dpr, renderScale } = computeLayout(page);
    const viewport = page.getViewport({ scale: renderScale });
    const canvasCtx = canvasEl.getContext("2d");
    canvasEl.width = viewport.width;
    canvasEl.height = viewport.height;
    pdfStage.style.width = `${cssWidth}px`;
    pdfStage.style.height = `${cssHeight}px`;

    currentRenderTask = page.render({ canvasContext: canvasCtx, viewport });
    state.renderTask = currentRenderTask;
    await currentRenderTask.promise;

    if (state.renderTask === currentRenderTask) state.renderTask = null;
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

    drawWatermark(cssWidth, cssHeight, dpr);
    loadingMsg.style.display = "none";
    pdfStage.style.display = "block";
    updatePageIndicator(num);

    await renderHighlightsForPage(num, chapterId, requestId);
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

    saveLastPage(num);
    settleTransition();
  } catch (err) {
    if (err?.name === "RenderingCancelledException") return;
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

    console.error("Page render failed:", err);
    loadingMsg.style.display = "block";
    loadingText.textContent = `Couldn't render this page — ${err?.message || "please try again."}`;
  } finally {
    if (state.renderTask === currentRenderTask) state.renderTask = null;
    state.rendering = false;
  }
}

function settleTransition() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => viewerWrap.classList.remove("is-turning"));
  });
}

function updatePageIndicator(num) {
  pageIndicator.textContent =
    num > state.totalRealPages ? "✓ Chapter complete" : `Page ${num} / ${state.totalRealPages}`;
  prevPageBtn.disabled = num <= 1;
  nextPageBtn.disabled = num >= state.totalRealPages + 1;
  if (edgePrevBtn) edgePrevBtn.disabled = prevPageBtn.disabled;
  if (edgeNextBtn) edgeNextBtn.disabled = nextPageBtn.disabled;
}

function goToPage(n) {
  const clamped = Math.max(1, Math.min(n, state.totalRealPages + 1));
  if (clamped === state.pageNum || state.rendering) return;
  state.pageNum = clamped;
  renderPage(state.pageNum);
}

function drawWatermark(cssWidth, cssHeight, dpr) {
  watermarkCanvasEl.width = cssWidth * dpr;
  watermarkCanvasEl.height = cssHeight * dpr;
  watermarkCanvasEl.style.width = `${cssWidth}px`;
  watermarkCanvasEl.style.height = `${cssHeight}px`;

  const ctx = watermarkCanvasEl.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  ctx.globalAlpha = SITE_CONFIG.watermarkOpacity;
  ctx.fillStyle = SITE_CONFIG.watermarkColor;
  ctx.font = "700 20px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const angleRad = (SITE_CONFIG.watermarkAngleDeg * Math.PI) / 180;
  const stepX = 160;
  const stepY = 130;
  const diagonal = Math.sqrt(cssWidth * cssWidth + cssHeight * cssHeight);

  ctx.save();
  ctx.translate(cssWidth / 2, cssHeight / 2);
  ctx.rotate(-angleRad);
  for (let y = -diagonal; y < diagonal; y += stepY) {
    for (let x = -diagonal; x < diagonal; x += stepX) {
      ctx.fillText(SITE_CONFIG.watermarkText, x, y);
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

async function fetchHighlightsForPage(chapterId, pageNumber) {
  const highlightsRef = collection(db, "chapters", chapterId, "highlights");
  const q = query(highlightsRef, where("pageNumber", "==", pageNumber));
  const snap = await getDocs(q);

  const results = [];
  snap.forEach((docSnap) => {
    results.push({ id: docSnap.id, ...docSnap.data() });
  });
  return results;
}

async function renderHighlightsForPage(pageNumber, chapterId = state.chapterId, requestId = state.loadRequestId) {
  if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;
  overlayEl.innerHTML = "";

  let highlights = [];
  try {
    highlights = await fetchHighlightsForPage(chapterId, pageNumber);
  } catch (err) {
    if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;
    console.error("Failed to fetch highlights:", err);
    if (!chapterIsUnlocked(chapterId)) {
      showChapterLockCard();
    }
    return;
  }

  if (requestId !== state.loadRequestId || chapterId !== state.chapterId) return;

  highlights.forEach((mapping) => {
    const box = mapping.box || {};
    const highlightDiv = document.createElement("div");
    highlightDiv.className = "pyq-highlight";
    highlightDiv.style.top = box.top;
    highlightDiv.style.left = box.left;
    highlightDiv.style.width = box.width;
    highlightDiv.style.height = box.height;
    const badge = document.createElement("span");
    badge.className = "pyq-badge";
    const pyqCount = (mapping.pyqs || []).length;
    badge.textContent = `🎯 PYQ${pyqCount > 1 ? ` ×${pyqCount}` : ""}`;
    highlightDiv.appendChild(badge);
    highlightDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      openPyqModal(mapping);
    });

    overlayEl.appendChild(highlightDiv);
  });
}

function openPyqModal(mapping) {
  const pyqs = mapping.pyqs || [];
  pyqCountTag.textContent = `${pyqs.length} question${pyqs.length !== 1 ? "s" : ""} linked to this section`;
  pyqListContainer.innerHTML = "";

  pyqs.forEach((pyq, index) => {
    pyqListContainer.appendChild(buildMcqBlock(pyq, index));
  });

  modalBackdrop.classList.add("open");
}

function closePyqModal() {
  modalBackdrop.classList.remove("open");
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

function buildMcqBlock(pyq, index) {
  const block = document.createElement("div");
  block.className = "mcq-block";

  const qEl = document.createElement("div");
  qEl.className = "mcq-question";
  const num = document.createElement("span");
  num.className = "mcq-num";
  num.textContent = `Q${index + 1}`;
  const qText = document.createElement("span");
  qText.textContent = pyq.question;
  qEl.append(num, qText);
  block.appendChild(qEl);

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "mcq-options";

  const resultEl = document.createElement("div");
  resultEl.className = "mcq-result";

  (pyq.options || []).forEach((optionText, optIndex) => {
    const optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = "mcq-option";
    const letter = document.createElement("span");
    letter.className = "opt-letter";
    letter.textContent = OPTION_LETTERS[optIndex] || optIndex + 1;
    const label = document.createElement("span");
    label.textContent = optionText;
    optBtn.append(letter, label);

    optBtn.addEventListener("click", () => {
      const allOptionBtns = optionsWrap.querySelectorAll(".mcq-option");
      allOptionBtns.forEach((b) => (b.disabled = true));

      const correctIndex = Number(pyq.answerIndex);
      const isCorrect = optIndex === correctIndex;
      block.classList.add("answered");
      if (isCorrect) {
        optBtn.classList.add("correct");
        resultEl.textContent = "✅ Correct!";
        resultEl.className = "mcq-result correct-text";
      } else {
        optBtn.classList.add("incorrect");
        resultEl.textContent = `❌ Not quite. Correct answer: ${OPTION_LETTERS[correctIndex] || "?"}`;
        resultEl.className = "mcq-result incorrect-text";
        const correctBtn = allOptionBtns[correctIndex];
        if (correctBtn) correctBtn.classList.add("correct");
      }
    });

    optionsWrap.appendChild(optBtn);
  });

  block.appendChild(optionsWrap);
  block.appendChild(resultEl);
  return block;
}

chapterSelect.addEventListener("change", (e) => {
  const nextChapterId = e.target.value;
  state.chapterId = nextChapterId;
  loadChapterPDF(nextChapterId);
});

if (chapterLockUnlockBtn) {
  chapterLockUnlockBtn.addEventListener("click", openUnlockModal);
}

prevPageBtn.addEventListener("click", () => goToPage(state.pageNum - 1));
nextPageBtn.addEventListener("click", () => goToPage(state.pageNum + 1));
if (edgePrevBtn) edgePrevBtn.addEventListener("click", () => goToPage(state.pageNum - 1));
if (edgeNextBtn) edgeNextBtn.addEventListener("click", () => goToPage(state.pageNum + 1));

modalCloseBtn.addEventListener("click", closePyqModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closePyqModal();
});

window.addEventListener("keydown", (e) => {
  if (appShell.hidden) return;
  if (e.key === "ArrowLeft") goToPage(state.pageNum - 1);
  if (e.key === "ArrowRight") goToPage(state.pageNum + 1);
});

pdfStage.addEventListener("click", (e) => {
  const rect = pdfStage.getBoundingClientRect();
  const xRatio = (e.clientX - rect.left) / rect.width;
  if (xRatio < 0.18) goToPage(state.pageNum - 1);
  else if (xRatio > 0.82) goToPage(state.pageNum + 1);
});

let touchStartX = 0;
let touchStartY = 0;
let touchAxis = null;

function attachSwipe(target) {
  target.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchAxis = null;
    },
    { passive: true }
  );

  target.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      if (!touchAxis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
        touchAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (touchAxis === "x") e.preventDefault();
    },
    { passive: false }
  );

  target.addEventListener("touchend", (e) => {
    if (touchAxis !== "x") return;
    const endX = e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX;
    const dx = endX - touchStartX;
    const SWIPE_THRESHOLD = 55;
    if (dx <= -SWIPE_THRESHOLD) goToPage(state.pageNum + 1);
    else if (dx >= SWIPE_THRESHOLD) goToPage(state.pageNum - 1);
  });
}

attachSwipe(pdfStage);
attachSwipe(outroPage);

pdfStage.addEventListener("contextmenu", (e) => e.preventDefault());
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (state.pdfDoc) renderPage(state.pageNum);
  }, 200);
});

window.addEventListener(
  "neelaxmi:authenticated",
  () => {
    loadChapterPDF(state.chapterId); 
  },
  { once: true }
);

window.addEventListener("neelaxmi:subscription-active", () => {
  if (!state.pdfDoc && !FREE_CHAPTER_IDS.has(state.chapterId)) {
    loadChapterPDF(state.chapterId);
  }
});

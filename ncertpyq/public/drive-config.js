// Chapter list for the reader. Google Drive links live in public/chapters.json:
//   { "ch1": "https://drive.google.com/file/d/FILE_ID/view", "ch2": "...", ... }
// PDFs are public (files must be shared "Anyone with the link"); only the PYQ highlights stay behind login/subscription.
export const CHAPTERS = [
  { id: "ch1",  title: "The Living World", free: true },
  { id: "ch2",  title: "Biological Classification" },
  { id: "ch3",  title: "Plant Kingdom" },
  { id: "ch4",  title: "Animal Kingdom" },
  { id: "ch5",  title: "Morphology of Flowering Plants" },
  { id: "ch6",  title: "Anatomy of Flowering Plants" },
  { id: "ch7",  title: "Structural Organisation in Animals" },
  { id: "ch8",  title: "Cell: The Unit of Life" },
  { id: "ch9",  title: "Biomolecules" },
  { id: "ch10", title: "Cell Cycle and Cell Division" },
  { id: "ch11", title: "Photosynthesis in Higher Plants" },
  { id: "ch12", title: "Respiration in Plants" },
  { id: "ch13", title: "Plant Growth and Development" },
  { id: "ch14", title: "Breathing and Exchange of Gases" },
  { id: "ch15", title: "Body Fluids and Circulation" },
  { id: "ch16", title: "Excretory Products and Elimination" },
  { id: "ch17", title: "Locomotion and Movement" },
  { id: "ch18", title: "Neural Control and Coordination" },
  { id: "ch19", title: "Chemical Coordination and Integration" },
];
export const FREE_CHAPTER_IDS = new Set(CHAPTERS.filter((c) => c.free).map((c) => c.id));

const idFromLink = (v) => {
  const s = String(v || "").trim();
  const m = s.match(/\/d\/([\w-]{15,})/) || s.match(/[?&]id=([\w-]{15,})/);
  return m ? m[1] : /^[\w-]{15,}$/.test(s) ? s : null;      // full link or bare file ID
};
let linksPromise = null;
/** Returns the Drive file ID for a chapter ("ch2"), reading public/chapters.json. Keys may be ch2 / chap2 / 2. */
export async function chapterFileId(chapterId) {
  if (!linksPromise) linksPromise = fetch("/chapters.json", { cache: "no-cache" }).then((r) => r.json());
  const links = await linksPromise;
  const want = String(chapterId).match(/\d+/)[0];
  for (const [k, v] of Object.entries(links)) {
    const m = String(k).match(/\d+/);
    if (m && m[0] === want) return idFromLink(v);
  }
  return null;
}
// 1st try: straight from Drive (works if Google allows it for the visitor's browser). 2nd: our tiny CORS pass-through.
export const driveDirectUrl = (id) => `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
export const driveProxyUrl = (id) => `/.netlify/functions/drive-pdf?id=${encodeURIComponent(id)}`;

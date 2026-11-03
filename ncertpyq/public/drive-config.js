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
  return m ? m[1] : /^[\w-]{15,}$/.test(s) ? s : null;     
};
let linksPromise = null;
export async function chapterFileId(chapterId) {
  try {
    if (!linksPromise) {
      const chaptersUrl = new URL("./chapters.json", import.meta.url);
      linksPromise = fetch(chaptersUrl, { cache: "no-cache" }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`chapters.json request failed: HTTP ${response.status} (${chaptersUrl.pathname})`);
        }
        const links = await response.json();
        if (!links || typeof links !== "object" || Array.isArray(links)) {
          throw new Error("chapters.json must contain a JSON object of chapter IDs and Drive links.");
        }
        console.info("[NCERT PYQ][chapters][SUCCESS] chapters.json loaded", {
          path: chaptersUrl.pathname,
          entries: Object.keys(links).length,
        });
        return links;
      }).catch((error) => {
        linksPromise = null;
        throw error;
      });
    }

    const links = await linksPromise;
    const digits = String(chapterId || "").match(/\d+/);
    if (!digits) throw new Error(`Invalid chapter ID: ${chapterId}`);
    const wanted = digits[0];
    for (const [key, value] of Object.entries(links)) {
      const match = String(key).match(/\d+/);
      if (match && match[0] === wanted) {
        const fileId = idFromLink(value);
        if (!fileId) throw new Error(`Chapter ${chapterId} has an invalid or empty Drive link in chapters.json (key: ${key}).`);
        console.info("[NCERT PYQ][chapters][SUCCESS] chapter link resolved", { chapterId, key });
        return fileId;
      }
    }
    console.error("[NCERT PYQ][chapters][ERROR] chapter link missing", { chapterId });
    return null;
  } catch (error) {
    console.error("[NCERT PYQ][chapters][ERROR] unable to resolve chapter link", {
      chapterId,
      message: error?.message || String(error),
    });
    throw error;
  }
}
export const driveDirectUrl = (id) => `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
export const driveProxyUrl = (id) => `/api/ncertpyq/drive-pdf?id=${encodeURIComponent(id)}`;

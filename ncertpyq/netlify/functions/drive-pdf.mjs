// GET /.netlify/functions/drive-pdf?id=<GOOGLE_DRIVE_FILE_ID>
// Dumb pass-through: fetches a public Drive file and returns it with CORS allowed, because browsers can't read
// Drive links directly. No login, no link list, no dependencies. The chapter links live in public/chapters.json.
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const isFile = (r) => r.ok && !(r.headers.get("content-type") || "").includes("text/html");
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const cors = { "Access-Control-Allow-Origin": "*" };
const json = (status, error, detail) =>
  new Response(JSON.stringify({ error, detail }), { status, headers: { "Content-Type": "application/json", ...cors } });

async function fetchFromDrive(id) {
  const notes = [];
  const attempts = [
    `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${id}`,
  ];
  for (const url of attempts) {
    const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } });
    if (isFile(r)) return { res: r };
    const html = (r.headers.get("content-type") || "").includes("text/html") ? await r.text() : "";
    const title = (html.match(/<title>([^<]*)/i) || [])[1] || "";
    notes.push(`${r.status} ${(title || r.headers.get("content-type") || "").trim().slice(0, 60)}`);
    const form = html.match(/<form[^>]*action="([^"]+)"/i);     // Drive's "can't scan for viruses" page
    if (form) {
      const u = new URL(decode(form[1]), url);
      for (const tag of html.match(/<input[^>]*>/gi) || []) {
        const n = (tag.match(/name="([^"]*)"/i) || [])[1], v = (tag.match(/value="([^"]*)"/i) || [])[1];
        if (n && /hidden/i.test(tag)) u.searchParams.set(n, decode(v || ""));
      }
      const cookie = (r.headers.getSetCookie ? r.headers.getSetCookie() : []).map((c) => c.split(";")[0]).join("; ");
      const r2 = await fetch(u, { redirect: "follow", headers: { "User-Agent": UA, ...(cookie ? { Cookie: cookie } : {}) } });
      if (isFile(r2)) return { res: r2 };
      notes.push(`confirm step: ${r2.status}`);
    }
  }
  return { notes: notes.join(" | ") };
}

export default async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("id") || "";
    if (!/^[\w-]{15,}$/.test(id)) return json(400, "Bad file id.");
    const { res, notes } = await fetchFromDrive(id);
    if (!res) { console.error("Drive fetch failed:", id, notes); return json(502, "Google Drive didn't return the PDF.", notes); }
    const headers = { "Content-Type": "application/pdf", "Cache-Control": "public, max-age=3600", ...cors };
    const len = res.headers.get("content-length");
    if (len && !res.headers.get("content-encoding")) headers["Content-Length"] = len;
    return new Response(res.body, { headers });
  } catch (e) {
    console.error(e);
    return json(500, "Server error", String((e && e.message) || e).slice(0, 120));
  }
};

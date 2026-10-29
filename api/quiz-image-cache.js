// Same-origin image download fallback for ImgBB URLs that browsers cannot
// fetch directly because of cross-origin restrictions. Host allowlisting avoids
// turning this endpoint into an arbitrary URL proxy.
const ALLOWED_HOSTS = new Set(['i.ibb.co', 'ibb.co', 'imgbb.com', 'www.imgbb.com']);

function isAllowedImageHost(hostname) {
  const host = String(hostname || '').toLowerCase();
  return ALLOWED_HOSTS.has(host);
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, error: 'Method not allowed.' });
    }

    const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
    if (!rawUrl) {
      console.error('[Quiz][image-proxy][ERROR] Missing image URL.');
      return res.status(400).json({ success: false, error: 'Missing image URL.' });
    }

    let imageUrl;
    try {
      imageUrl = new URL(rawUrl);
    } catch (_) {
      console.error('[Quiz][image-proxy][ERROR] Invalid image URL.');
      return res.status(400).json({ success: false, error: 'Invalid image URL.' });
    }

    if (imageUrl.protocol !== 'https:' || !isAllowedImageHost(imageUrl.hostname)) {
      console.error('[Quiz][image-proxy][ERROR] Image host is not allowlisted.', { hostname: imageUrl.hostname });
      return res.status(400).json({ success: false, error: 'Only HTTPS ImgBB image URLs are supported.' });
    }

    const upstream = await fetch(imageUrl.href, { redirect: 'follow' });
    if (!upstream.ok) {
      console.error('[Quiz][image-proxy][ERROR] Upstream image download failed.', { status: upstream.status, hostname: imageUrl.hostname });
      return res.status(502).json({ success: false, error: 'Image host returned HTTP ' + upstream.status });
    }

    const finalUrl = new URL(upstream.url || imageUrl.href);
    if (finalUrl.protocol !== 'https:' || !isAllowedImageHost(finalUrl.hostname)) {
      console.error('[Quiz][image-proxy][ERROR] Upstream redirected to a non-allowlisted host.', { hostname: finalUrl.hostname });
      return res.status(502).json({ success: false, error: 'Image redirect host is not allowed.' });
    }

    const contentType = String(upstream.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!contentType.startsWith('image/')) {
      console.error('[Quiz][image-proxy][ERROR] Upstream response is not an image.', { contentType });
      return res.status(415).json({ success: false, error: 'URL did not return an image.' });
    }

    const bytes = Buffer.from(await upstream.arrayBuffer());
    const maxBytes = 8 * 1024 * 1024;
    if (!bytes.length || bytes.length > maxBytes) {
      console.error('[Quiz][image-proxy][ERROR] Image size is invalid.', { bytes: bytes.length });
      return res.status(413).json({ success: false, error: 'Image must be smaller than 8 MB.' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', String(bytes.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    console.info('[Quiz][image-proxy][SUCCESS] ImgBB image downloaded.', { hostname: finalUrl.hostname, bytes: bytes.length });
    return res.status(200).send(bytes);
  } catch (error) {
    console.error('[Quiz][image-proxy][ERROR] Unexpected image proxy failure.', { message: error && error.message });
    return res.status(500).json({ success: false, error: 'Could not download the question image.' });
  }
};

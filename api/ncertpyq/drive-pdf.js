'use strict';

module.exports = async function handler(req, res) {
  try {
    // The existing proxy uses the Web Request/Response API; adapt it for Vercel's Node response.
    const { default: drivePdf } = await import('../../ncertpyq/netlify/functions/drive-pdf.mjs');
    const url = new URL(req.url || '/api/ncertpyq/drive-pdf', 'https://vercel.invalid');
    const request = new Request(url, {
      method: req.method,
      headers: req.headers || {}
    });
    const response = await drivePdf(request);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const body = Buffer.from(await response.arrayBuffer());
    return res.status(response.status).send(body);
  } catch (error) {
    console.error('[vercel][ncertpyq:drive-pdf][ERROR]', {
      name: error && error.name || 'Error',
      message: error && error.message || 'Unknown server error'
    });
    return res.status(500).json({ error: 'Unable to fetch the PDF right now.' });
  }
};

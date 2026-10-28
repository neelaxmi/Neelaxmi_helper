'use strict';

// Vercel adapter for the existing server-side quiz scorer.
// Keep the scorer in one place so Netlify rollback remains possible.
const quizSubmit = require('../netlify/functions/quiz-submit');

module.exports = async function handler(req, res) {
  const event = {
    httpMethod: req.method,
    headers: req.headers || {},
    body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}),
    path: req.url || '/api/quiz-submit',
    queryStringParameters: Object.fromEntries(new URL(req.url || '/', 'https://vercel.invalid').searchParams.entries())
  };

  try {
    const result = await quizSubmit.handler(event);
    const status = Number(result && result.statusCode) || 200;
    for (const [key, value] of Object.entries((result && result.headers) || {})) {
      if (value !== undefined && value !== null) res.setHeader(key, value);
    }
    if (status === 204) return res.status(status).end();
    const body = result && result.body !== undefined ? result.body : '';
    return res.status(status).send(body);
  } catch (error) {
    console.error('[vercel][quiz-submit][ERROR]', {
      name: error && error.name || 'Error',
      message: error && error.message || 'Unknown server error'
    });
    return res.status(500).setHeader('Cache-Control', 'no-store').json({
      success: false,
      error: 'The attempt could not be synced. Your pending attempt is still saved on this device.'
    });
  }
};

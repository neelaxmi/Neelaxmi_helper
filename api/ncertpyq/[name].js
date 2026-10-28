'use strict';

// Route the NCERT PYQ app's named API calls to the existing business logic.
// Static imports let Vercel trace each module and its shared library dependencies.
const handlers = {
  'create-session': require('../../ncertpyq/netlify/functions/create-session'),
  'get-reviews': require('../../ncertpyq/netlify/functions/get-reviews'),
  'referral-init': require('../../ncertpyq/netlify/functions/referral-init'),
  'request-price-drop': require('../../ncertpyq/netlify/functions/request-price-drop'),
  'request-withdrawal': require('../../ncertpyq/netlify/functions/request-withdrawal'),
  'send-feedback': require('../../ncertpyq/netlify/functions/send-feedback'),
  'submit-order': require('../../ncertpyq/netlify/functions/submit-order'),
  'process-order-background': require('../../ncertpyq/netlify/functions/process-order-background'),
  'telegram-webhook': require('../../ncertpyq/netlify/functions/telegram-webhook')
};

module.exports = async function handler(req, res) {
  const name = String(req.query && req.query.name || '').trim();
  const selected = handlers[name];
  if (!selected || typeof selected.handler !== 'function') {
    return res.status(404).json({ error: 'API endpoint not found.' });
  }

  const event = {
    httpMethod: req.method,
    headers: req.headers || {},
    body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}),
    path: req.url || '/api/ncertpyq/' + name,
    queryStringParameters: Object.fromEntries(new URL(req.url || '/', 'https://vercel.invalid').searchParams.entries())
  };

  try {
    const result = await selected.handler(event);
    const status = Number(result && result.statusCode) || 200;
    for (const [key, value] of Object.entries((result && result.headers) || {})) {
      if (value !== undefined && value !== null) res.setHeader(key, value);
    }
    if (status === 204) return res.status(status).end();
    const body = result && result.body !== undefined ? result.body : '';
    return res.status(status).send(body);
  } catch (error) {
    console.error('[vercel][ncertpyq:' + name + '][ERROR]', {
      name: error && error.name || 'Error',
      message: error && error.message || 'Unknown server error'
    });
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

"use strict";
/**
 * Support notifications now go to your Telegram admin chat (same bot + chat as payment reviews).
 * Uses the env vars you already have: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. Nothing else to set up.
 * The user's email is shown in a tap-to-copy block so you can reply from your own Gmail.
 * (File name kept as mail.js so the other functions don't change.)
 */
const { tgSendMessage, esc } = require("./common");

const SUPPORT_EMAIL = "neelaxmi.support@gmail.com";

/** rows: [[label, value], ...] -> Telegram-HTML message (title, one line per row, optional body). */
function renderEmail(title, rows, body) {
  const lines = rows.filter((r) => r[1] !== "" && r[1] != null)
    .map(([k, v]) => `<b>${esc(k)}:</b> ${/email/i.test(k) ? `<code>${esc(v)}</code>` : esc(v)}`);
  return `<b>📩 ${esc(title)}</b>\n\n${lines.join("\n")}${body ? `\n\n💬 ${esc(body)}` : ""}\n\n<i>Reply from Gmail to the email above.</i>`;
}

/** Sends the message to Telegram. `subject`/`replyTo` are kept for API compatibility. */
async function sendSupportMail({ html, markup }) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) throw new Error("Telegram env vars are not set");
  await tgSendMessage(html, markup);
}

module.exports = { sendSupportMail, renderEmail, esc, SUPPORT_EMAIL };

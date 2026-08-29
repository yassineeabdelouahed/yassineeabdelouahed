import { Resend } from "resend";

export const emailEnabled = !!process.env.RESEND_API_KEY;

const EMAIL_FROM = process.env.EMAIL_FROM || "Talentis Connect <onboarding@resend.dev>";

const resend = emailEnabled ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends a transactional email via Resend. No-op (logged, not thrown) when
 * RESEND_API_KEY is unset — mirrors the googleEnabled/linkedinEnabled pattern
 * in auth.ts, so local dev works without a Resend account, and delivery
 * failures never break the caller's flow (registration, password reset, etc.).
 */
export async function sendEmail(params: { to: string; subject: string; html: string }): Promise<void> {
  if (!resend) {
    console.log(`[email:disabled] to=${params.to} subject="${params.subject}"`);
    return;
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
  } catch (err) {
    console.error("[email:send-failed]", err);
  }
}

const BRAND_HEADER = `
  <div style="background:#0b2545;padding:24px 32px;">
    <span style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">Talentis Connect</span>
  </div>
`;

const BRAND_FOOTER = `
  <div style="padding:20px 32px;color:#94a3b8;font-family:Arial,sans-serif;font-size:12px;">
    Talentis Consult — Casablanca, Maroc
  </div>
`;

/** Wraps templated content in a shared, self-contained (inline-CSS) HTML shell for email clients. */
export function emailLayout(bodyHtml: string): string {
  return `
    <div style="font-family:Arial,sans-serif;background:#f5f7f8;padding:32px 0;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        ${BRAND_HEADER}
        <div style="padding:32px;color:#0f172a;font-size:15px;line-height:1.6;">
          ${bodyHtml}
        </div>
        ${BRAND_FOOTER}
      </div>
    </div>
  `;
}

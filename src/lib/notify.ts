import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";

export async function notifyUser(userId: string, params: { type: string; title: string; body?: string; link?: string }) {
  await prisma.notification.create({
    data: { userId, type: params.type, title: params.title, body: params.body, link: params.link },
  });
  await sendNotificationEmail(userId, params);
}

async function sendNotificationEmail(userId: string, params: { title: string; body?: string; link?: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) return;

  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const link = params.link ? `${appUrl}${params.link}` : appUrl;

  await sendEmail({
    to: user.email,
    subject: params.title,
    html: emailLayout(`
      <p style="margin:0 0 16px;font-weight:700;font-size:17px;">${params.title}</p>
      ${params.body ? `<p style="margin:0 0 20px;color:#334155;">${params.body}</p>` : ""}
      <a href="${link}" style="display:inline-block;background:#0b2545;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;">Voir sur Talentis Connect</a>
    `),
  });
}

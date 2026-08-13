import { prisma } from "@/lib/prisma";

export async function notifyUser(userId: string, params: { type: string; title: string; body?: string; link?: string }) {
  await prisma.notification.create({
    data: { userId, type: params.type, title: params.title, body: params.body, link: params.link },
  });
  await sendEmail(userId, params);
}

/**
 * No-op for v1 (see plan §6 "cut corners") — swap for a real provider later.
 * Kept as a single call site so notifyUser() doesn't need to change when that happens.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendEmail(userId: string, params: { title: string; body?: string }) {
  return;
}

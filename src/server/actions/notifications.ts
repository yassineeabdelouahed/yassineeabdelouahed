"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";

export async function listMyNotifications() {
  const user = await getSessionUser();
  if (!user) return [];
  return prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function unreadNotificationCount(): Promise<number> {
  const user = await getSessionUser();
  if (!user) return 0;
  return prisma.notification.count({ where: { userId: user.id, read: false } });
}

export async function markNotificationReadAction(notificationId: string) {
  const user = await getSessionUser();
  if (!user) return;
  await prisma.notification.updateMany({
    where: { id: notificationId, userId: user.id },
    data: { read: true },
  });
  revalidatePath("/", "layout");
}

export async function markAllNotificationsReadAction() {
  const user = await getSessionUser();
  if (!user) return;
  await prisma.notification.updateMany({ where: { userId: user.id, read: false }, data: { read: true } });
  revalidatePath("/", "layout");
}

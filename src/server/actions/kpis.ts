"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export async function getGlobalKpis() {
  await requireAdmin();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);

  const [
    usersByRole,
    newUsersLast30d,
    totalJobPostings,
    publishedJobPostings,
    newJobPostingsLast30d,
    totalApplications,
    newApplicationsLast30d,
    hiredApplications,
    mandatsByStatus,
    interviewsScheduled,
    interviewsCompleted,
    revenueBySource,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.groupBy({ by: ["role"], _count: { _all: true } }),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.jobPosting.count(),
    prisma.jobPosting.count({ where: { status: "PUBLISHED" } }),
    prisma.jobPosting.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.jobApplication.count({ where: { status: "HIRED" } }),
    prisma.mandat.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.interview.count({ where: { status: "SCHEDULED" } }),
    prisma.interview.count({ where: { status: "COMPLETED" } }),
    prisma.invoice.groupBy({ by: ["sourceType"], _sum: { amount: true } }),
    prisma.invoice.aggregate({ _sum: { amount: true } }),
  ]);

  const roleCounts = Object.fromEntries(usersByRole.map((r) => [r.role, r._count._all]));
  const mandatStatusCounts = Object.fromEntries(mandatsByStatus.map((m) => [m.status, m._count._all]));
  const totalMandats = mandatsByStatus.reduce((sum, m) => sum + m._count._all, 0);
  const wonMandats = mandatStatusCounts.WON ?? 0;

  return {
    accounts: {
      client: roleCounts.CLIENT ?? 0,
      candidate: roleCounts.CANDIDATE ?? 0,
      cabinet: roleCounts.CABINET ?? 0,
      newLast30d: newUsersLast30d,
    },
    jobPostings: {
      total: totalJobPostings,
      published: publishedJobPostings,
      newLast30d: newJobPostingsLast30d,
    },
    applications: {
      total: totalApplications,
      newLast30d: newApplicationsLast30d,
      hired: hiredApplications,
      hireRate: totalApplications > 0 ? (hiredApplications / totalApplications) * 100 : 0,
    },
    mandats: {
      total: totalMandats,
      byStatus: mandatStatusCounts as Record<string, number>,
      won: wonMandats,
      winRate: totalMandats > 0 ? (wonMandats / totalMandats) * 100 : 0,
    },
    interviews: {
      scheduled: interviewsScheduled,
      completed: interviewsCompleted,
    },
    revenue: {
      total: totalRevenue._sum.amount ?? 0,
      bySource: Object.fromEntries(revenueBySource.map((r) => [r.sourceType, r._sum.amount ?? 0])),
      currency: "MAD",
    },
  };
}

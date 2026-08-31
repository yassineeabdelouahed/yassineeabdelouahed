import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/rbac";
import { getGlobalKpis } from "@/server/actions/kpis";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "CABINET" || !user.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const kpis = await getGlobalKpis();

  const rows: (string | number)[][] = [
    ["Catégorie", "Indicateur", "Valeur"],
    ["Comptes", "Entreprises", kpis.accounts.client],
    ["Comptes", "Candidats", kpis.accounts.candidate],
    ["Comptes", "Cabinet", kpis.accounts.cabinet],
    ["Comptes", "Nouveaux comptes (30j)", kpis.accounts.newLast30d],
    ["Offres", "Offres publiées", kpis.jobPostings.published],
    ["Offres", "Offres au total", kpis.jobPostings.total],
    ["Offres", "Nouvelles offres (30j)", kpis.jobPostings.newLast30d],
    ["Candidatures", "Total", kpis.applications.total],
    ["Candidatures", "Nouvelles (30j)", kpis.applications.newLast30d],
    ["Candidatures", "Recrutées", kpis.applications.hired],
    ["Candidatures", "Taux de recrutement (%)", kpis.applications.hireRate.toFixed(1)],
    ["Mandats", "Total", kpis.mandats.total],
    ["Mandats", "Gagnés", kpis.mandats.won],
    ["Mandats", "Taux de réussite (%)", kpis.mandats.winRate.toFixed(1)],
    ...Object.entries(kpis.mandats.byStatus).map(([status, count]) => ["Mandats par statut", status, count]),
    ["Entretiens", "Planifiés", kpis.interviews.scheduled],
    ["Entretiens", "Réalisés", kpis.interviews.completed],
    ["Revenu", `Total (${kpis.revenue.currency})`, kpis.revenue.total],
    ...Object.entries(kpis.revenue.bySource).map(([source, amount]) => [`Revenu (${kpis.revenue.currency})`, source, amount]),
  ];

  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="statistiques-talentis-connect-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

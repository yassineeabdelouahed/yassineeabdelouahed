import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "CABINET") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const candidates = await prisma.candidate.findMany({ orderBy: { createdAt: "desc" } });

  const rows = [
    ["Prénom", "Nom", "Email", "Téléphone", "Titre", "Localisation", "Expérience (ans)", "Compétences", "Source", "Créé le"],
    ...candidates.map((c) => [
      c.firstName,
      c.lastName,
      c.email,
      c.phone,
      c.headline,
      c.location,
      c.yearsExperience,
      c.skills.join("; "),
      c.source,
      c.createdAt.toISOString().slice(0, 10),
    ]),
  ];

  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="candidats-talentis-connect-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

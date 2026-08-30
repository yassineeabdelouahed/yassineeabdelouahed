import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/rbac";
import { generateInvoicePdf } from "@/lib/invoice";

export async function GET(_request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { invoiceId } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, select: { userId: true, number: true } });
  if (!invoice) return NextResponse.json({ error: "Reçu introuvable" }, { status: 404 });

  const isOwner = invoice.userId === user.id;
  const isCabinet = user.role === "CABINET";
  if (!isOwner && !isCabinet) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const pdf = await generateInvoicePdf(invoiceId);
  if (!pdf) return NextResponse.json({ error: "Reçu introuvable" }, { status: 404 });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.number}.pdf"`,
    },
  });
}

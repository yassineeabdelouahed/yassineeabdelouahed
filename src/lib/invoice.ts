import PDFDocument from "pdfkit";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type CreateInvoiceInput = {
  sourceType: "SPONSORSHIP" | "CV_ACCESS" | "ENROLLMENT";
  sourceId: string;
  companyId?: string | null;
  userId: string;
  description: string;
  amount: number;
  currency?: string;
};

/**
 * Called from within the same transaction as the payment confirmation. Numbering
 * is a simple per-year count — acceptable at the low, admin-driven confirmation
 * volume this runs at; not meant to survive high concurrent write load.
 */
export async function createInvoice(tx: Prisma.TransactionClient, input: CreateInvoiceInput) {
  const year = new Date().getFullYear();
  const countThisYear = await tx.invoice.count({
    where: { issuedAt: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) } },
  });
  const number = `INV-${year}-${String(countThisYear + 1).padStart(4, "0")}`;

  return tx.invoice.create({
    data: {
      number,
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      companyId: input.companyId ?? null,
      userId: input.userId,
      description: input.description,
      amount: input.amount,
      currency: input.currency ?? "MAD",
    },
  });
}

/**
 * `Number.toLocaleString("fr-FR")` groups thousands with a narrow no-break space (U+202F),
 * which falls outside pdfkit's default Helvetica/WinAnsi encoding and renders as a garbled
 * glyph. Group with a plain space instead so amounts stay legible in the generated PDF.
 */
export function formatAmount(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const [intPart, decPart] = rounded.toFixed(2).split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decPart === "00" ? withThousands : `${withThousands},${decPart}`;
}

/** Batch lookup so list pages can attach a "Télécharger le reçu" link without N+1 queries. */
export async function getInvoiceMap(
  sourceType: CreateInvoiceInput["sourceType"],
  sourceIds: string[],
): Promise<Record<string, { id: string; number: string }>> {
  if (sourceIds.length === 0) return {};
  const invoices = await prisma.invoice.findMany({
    where: { sourceType, sourceId: { in: sourceIds } },
    select: { id: true, number: true, sourceId: true },
  });
  return Object.fromEntries(invoices.map((inv) => [inv.sourceId, { id: inv.id, number: inv.number }]));
}

export async function generateInvoicePdf(invoiceId: string): Promise<Buffer | null> {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { user: { select: { name: true, email: true } }, company: { select: { name: true, ice: true, city: true } } },
  });
  if (!invoice) return null;

  const settings = await prisma.platformSettings.findUnique({ where: { id: "singleton" } });
  const legalMentionsComplete = !!(
    settings?.ice &&
    settings?.rc &&
    settings?.identifiantFiscal &&
    settings?.patente &&
    settings?.cnss
  );

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));

  doc.fontSize(20).fillColor("#0b2545").text(settings?.legalName ?? "Talentis Consult", { continued: false });
  doc.fontSize(10).fillColor("#64748b").text(legalMentionsComplete ? "Facture" : "Reçu de paiement");
  if (settings?.address) doc.fontSize(9).fillColor("#64748b").text(settings.address);
  doc.moveDown(1.5);

  doc.fontSize(12).fillColor("#0f172a").text(`${legalMentionsComplete ? "Facture" : "Reçu"} n° ${invoice.number}`);
  doc.fontSize(10).fillColor("#64748b").text(`Date : ${invoice.issuedAt.toLocaleDateString("fr-FR")}`);
  doc.moveDown(1);

  if (legalMentionsComplete) {
    doc.fontSize(9).fillColor("#334155").text(
      `ICE : ${settings!.ice} · RC : ${settings!.rc} · IF : ${settings!.identifiantFiscal} · Patente : ${settings!.patente} · CNSS : ${settings!.cnss}`,
    );
    doc.moveDown(1);
  }

  doc.fontSize(11).fillColor("#0f172a").text("Facturé à :");
  doc.fontSize(10).fillColor("#334155").text(invoice.company?.name ?? invoice.user.name);
  if (invoice.company?.ice) doc.text(`ICE : ${invoice.company.ice}`);
  if (invoice.company?.city) doc.text(invoice.company.city);
  doc.text(invoice.user.email);
  doc.moveDown(1.5);

  doc.fontSize(11).fillColor("#0f172a").text("Détail :");
  doc.fontSize(10).fillColor("#334155").text(invoice.description);
  doc.moveDown(1);

  const tvaRatePercent = settings?.tvaRatePercent ?? 20;
  const amountTtc = invoice.amount;
  const amountHt = amountTtc / (1 + tvaRatePercent / 100);
  const amountTva = amountTtc - amountHt;

  doc.fontSize(10).fillColor("#334155").text(`Total HT : ${formatAmount(amountHt)} ${invoice.currency}`);
  doc.text(`TVA (${tvaRatePercent}%) : ${formatAmount(amountTva)} ${invoice.currency}`);
  doc.fontSize(14).fillColor("#0b2545").text(
    `Total TTC : ${formatAmount(amountTtc)} ${invoice.currency}`,
  );
  doc.moveDown(2);

  doc.fontSize(8).fillColor("#94a3b8").text(
    legalMentionsComplete
      ? `${settings!.legalName} — Casablanca, Maroc.`
      : "Talentis Consult — Casablanca, Maroc. Ce document tient lieu de reçu de paiement confirmé manuellement ; " +
          "il ne constitue pas une facture au sens fiscal tant que les mentions légales obligatoires n'ont pas été complétées.",
    { width: 480 },
  );

  doc.end();
  return done;
}

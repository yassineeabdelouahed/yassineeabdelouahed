import { prisma } from "@/lib/prisma";
import type { MandatStatus } from "@/generated/prisma/enums";

/**
 * Valid forward transitions per the business plan's 8-step process (§5.2).
 * CANCELLED is reachable from any non-terminal status (handled separately below).
 */
const FORWARD_TRANSITIONS: Record<MandatStatus, MandatStatus[]> = {
  NEW: ["SOURCING"],
  SOURCING: ["SHORTLIST_SENT"],
  SHORTLIST_SENT: ["CLIENT_SELECTING"],
  CLIENT_SELECTING: ["INTERVIEWING"],
  INTERVIEWING: ["OFFER"],
  OFFER: ["WON"],
  WON: [],
  CANCELLED: [],
};

const TERMINAL_STATUSES: MandatStatus[] = ["WON", "CANCELLED"];

export class InvalidMandatTransitionError extends Error {
  constructor(from: MandatStatus, to: MandatStatus) {
    super(`Transition de mandat invalide : ${from} -> ${to}`);
    this.name = "InvalidMandatTransitionError";
  }
}

export function canTransition(from: MandatStatus, to: MandatStatus): boolean {
  if (to === "CANCELLED") return !TERMINAL_STATUSES.includes(from);
  return FORWARD_TRANSITIONS[from].includes(to);
}

/**
 * Applies a status transition to a mandate, recording it in MandatStatusEvent.
 * Throws InvalidMandatTransitionError if the transition isn't allowed from the
 * mandate's current status (re-read inside the transaction to avoid races).
 */
export async function transitionMandat({
  mandatId,
  toStatus,
  actorUserId,
  note,
}: {
  mandatId: string;
  toStatus: MandatStatus;
  actorUserId: string;
  note?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const mandat = await tx.mandat.findUniqueOrThrow({
      where: { id: mandatId },
      select: { status: true },
    });

    if (!canTransition(mandat.status, toStatus)) {
      throw new InvalidMandatTransitionError(mandat.status, toStatus);
    }

    const updateData: { status: MandatStatus; closedAt?: Date; closeReason?: "WON" | "CANCELLED" } = {
      status: toStatus,
    };
    if (toStatus === "WON" || toStatus === "CANCELLED") {
      updateData.closedAt = new Date();
      updateData.closeReason = toStatus;
    }

    const updated = await tx.mandat.update({ where: { id: mandatId }, data: updateData });

    await tx.mandatStatusEvent.create({
      data: {
        mandatId,
        fromStatus: mandat.status,
        toStatus,
        actorUserId,
        note,
      },
    });

    return updated;
  });
}

const STEP_BY_STATUS: Record<MandatStatus, number> = {
  NEW: 1,
  SOURCING: 3,
  SHORTLIST_SENT: 4,
  CLIENT_SELECTING: 5,
  INTERVIEWING: 6,
  OFFER: 8,
  WON: 8,
  CANCELLED: 0,
};

/** Maps a mandate's current status to its position among the 8 process steps (for the timeline UI). */
export function currentStep(status: MandatStatus): number {
  return STEP_BY_STATUS[status];
}

export async function generateMandatReference(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.mandat.count({
    where: { reference: { startsWith: `MC-${year}-` } },
  });
  return `MC-${year}-${String(count + 1).padStart(4, "0")}`;
}

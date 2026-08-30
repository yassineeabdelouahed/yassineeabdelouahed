import { prisma } from "@/lib/prisma";
import type { ProspectStage } from "@/generated/prisma/enums";

/** Linear commercial pipeline (roadmap §7). LOST is reachable from any non-terminal stage. */
const FORWARD_TRANSITIONS: Record<ProspectStage, ProspectStage[]> = {
  PROSPECT: ["CONTACTED"],
  CONTACTED: ["QUALIFIED"],
  QUALIFIED: ["MEETING"],
  MEETING: ["NEED_CONFIRMED"],
  NEED_CONFIRMED: ["PROPOSAL"],
  PROPOSAL: ["NEGOTIATION"],
  NEGOTIATION: ["WON"],
  WON: [],
  LOST: [],
};

const TERMINAL_STAGES: ProspectStage[] = ["WON", "LOST"];

export class InvalidProspectTransitionError extends Error {
  constructor(from: ProspectStage, to: ProspectStage) {
    super(`Transition de prospect invalide : ${from} -> ${to}`);
    this.name = "InvalidProspectTransitionError";
  }
}

export function canTransitionProspect(from: ProspectStage, to: ProspectStage): boolean {
  if (to === "LOST") return !TERMINAL_STAGES.includes(from);
  return FORWARD_TRANSITIONS[from].includes(to);
}

export async function transitionProspect({
  prospectId,
  toStage,
  actorUserId,
  note,
}: {
  prospectId: string;
  toStage: ProspectStage;
  actorUserId: string;
  note?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const prospect = await tx.prospect.findUniqueOrThrow({
      where: { id: prospectId },
      select: { stage: true },
    });

    if (!canTransitionProspect(prospect.stage, toStage)) {
      throw new InvalidProspectTransitionError(prospect.stage, toStage);
    }

    const updated = await tx.prospect.update({ where: { id: prospectId }, data: { stage: toStage } });

    await tx.prospectStageEvent.create({
      data: { prospectId, fromStage: prospect.stage, toStage, actorUserId, note },
    });

    return updated;
  });
}

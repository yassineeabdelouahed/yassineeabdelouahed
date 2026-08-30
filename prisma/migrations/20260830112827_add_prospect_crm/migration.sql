-- CreateEnum
CREATE TYPE "ProspectStage" AS ENUM ('PROSPECT', 'CONTACTED', 'QUALIFIED', 'MEETING', 'NEED_CONFIRMED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST');

-- CreateTable
CREATE TABLE "prospects" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "sector" TEXT,
    "city" TEXT,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "stage" "ProspectStage" NOT NULL DEFAULT 'PROSPECT',
    "urgency" "MandatUrgency" NOT NULL DEFAULT 'MEDIUM',
    "estimatedBudget" INTEGER,
    "notes" TEXT,
    "assignedToUserId" TEXT,
    "convertedToCompanyId" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prospects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prospect_stage_events" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "fromStage" "ProspectStage",
    "toStage" "ProspectStage" NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prospect_stage_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prospects" ADD CONSTRAINT "prospects_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prospects" ADD CONSTRAINT "prospects_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prospects" ADD CONSTRAINT "prospects_convertedToCompanyId_fkey" FOREIGN KEY ("convertedToCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prospect_stage_events" ADD CONSTRAINT "prospect_stage_events_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "prospects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prospect_stage_events" ADD CONSTRAINT "prospect_stage_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

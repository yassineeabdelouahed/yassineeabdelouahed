-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "legalName" TEXT NOT NULL DEFAULT 'Talentis Consult',
    "ice" TEXT,
    "rc" TEXT,
    "identifiantFiscal" TEXT,
    "patente" TEXT,
    "cnss" TEXT,
    "address" TEXT,
    "tvaRatePercent" INTEGER NOT NULL DEFAULT 20,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

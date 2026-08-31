-- CreateTable
CREATE TABLE "retention_purge_logs" (
    "id" TEXT NOT NULL,
    "ranAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggeredBy" TEXT NOT NULL,
    "summary" JSONB NOT NULL,

    CONSTRAINT "retention_purge_logs_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "JobBoardSyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED', 'UNAVAILABLE');

-- CreateTable
CREATE TABLE "job_board_syncs" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "status" "JobBoardSyncStatus" NOT NULL DEFAULT 'PENDING',
    "externalId" TEXT,
    "error" TEXT,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_board_syncs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_board_syncs_jobPostingId_board_key" ON "job_board_syncs"("jobPostingId", "board");

-- AddForeignKey
ALTER TABLE "job_board_syncs" ADD CONSTRAINT "job_board_syncs_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

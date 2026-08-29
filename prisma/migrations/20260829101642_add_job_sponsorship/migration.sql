-- CreateEnum
CREATE TYPE "SponsorshipPaymentMethod" AS ENUM ('VIREMENT', 'ESPECES', 'AUTRE');

-- CreateEnum
CREATE TYPE "SponsorshipPaymentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "job_postings" ADD COLUMN     "sponsoredUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "job_sponsorships" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "requestedByUserId" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MAD',
    "paymentMethod" "SponsorshipPaymentMethod" NOT NULL,
    "paymentStatus" "SponsorshipPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "confirmedByUserId" TEXT,

    CONSTRAINT "job_sponsorships_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_sponsorships" ADD CONSTRAINT "job_sponsorships_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_sponsorships" ADD CONSTRAINT "job_sponsorships_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_sponsorships" ADD CONSTRAINT "job_sponsorships_confirmedByUserId_fkey" FOREIGN KEY ("confirmedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

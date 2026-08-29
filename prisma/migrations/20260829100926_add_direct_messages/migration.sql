-- CreateTable
CREATE TABLE "direct_messages" (
    "id" TEXT NOT NULL,
    "jobApplicationId" TEXT NOT NULL,
    "senderUserId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "direct_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "job_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'CABINET', 'CANDIDATE');

-- CreateEnum
CREATE TYPE "CandidateSource" AS ENUM ('INTERNAL_DB', 'JOBBOARD', 'NETWORK', 'COOPTATION', 'SELF_REGISTERED');

-- CreateEnum
CREATE TYPE "MandatStatus" AS ENUM ('NEW', 'SOURCING', 'SHORTLIST_SENT', 'CLIENT_SELECTING', 'INTERVIEWING', 'OFFER', 'WON', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MandatUrgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "MandatCloseReason" AS ENUM ('WON', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MandateApplicationStatus" AS ENUM ('PROPOSED', 'PUBLISHED_TO_CLIENT', 'SELECTED_BY_CLIENT', 'REJECTED_BY_CLIENT', 'INTERVIEWING', 'VALIDATED', 'RESERVED', 'REFUSED', 'HIRED');

-- CreateEnum
CREATE TYPE "InterviewMode" AS ENUM ('ONSITE', 'VIDEO', 'PHONE');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('SLOT_PROPOSED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "InterviewFeedbackOutcome" AS ENUM ('VALIDATED', 'RESERVED', 'REFUSED');

-- CreateEnum
CREATE TYPE "JobPostingStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'HIRED');

-- CreateEnum
CREATE TYPE "TrainingDomain" AS ENUM ('MARKETING_DIGITAL', 'FINANCE', 'RH');

-- CreateEnum
CREATE TYPE "TrainingCourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TrainingSessionStatus" AS ENUM ('OPEN', 'FULL', 'CLOSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EnrollmentPaymentMethod" AS ENUM ('VIREMENT', 'ESPECES', 'AUTRE');

-- CreateEnum
CREATE TYPE "EnrollmentPaymentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ice" TEXT,
    "sector" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobTitle" TEXT,
    "phone" TEXT,

    CONSTRAINT "client_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cabinet_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "phone" TEXT,

    CONSTRAINT "cabinet_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cabinet_invites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cabinet_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "headline" TEXT,
    "location" TEXT,
    "yearsExperience" INTEGER,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cvUrl" TEXT,
    "source" "CandidateSource" NOT NULL DEFAULT 'SELF_REGISTERED',
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mandats" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "skillsRequired" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "experienceLevel" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'MAD',
    "location" TEXT,
    "remotePolicy" TEXT,
    "urgency" "MandatUrgency" NOT NULL DEFAULT 'MEDIUM',
    "status" "MandatStatus" NOT NULL DEFAULT 'NEW',
    "assignedConsultantId" TEXT,
    "wonCandidateId" TEXT,
    "closedAt" TIMESTAMP(3),
    "closeReason" "MandatCloseReason",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mandats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mandat_status_events" (
    "id" TEXT NOT NULL,
    "mandatId" TEXT NOT NULL,
    "fromStatus" "MandatStatus",
    "toStatus" "MandatStatus" NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mandat_status_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mandat_messages" (
    "id" TEXT NOT NULL,
    "mandatId" TEXT NOT NULL,
    "authorUserId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mandat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mandate_applications" (
    "id" TEXT NOT NULL,
    "mandatId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "addedByUserId" TEXT NOT NULL,
    "prequalNotes" TEXT,
    "strengths" TEXT,
    "watchPoints" TEXT,
    "status" "MandateApplicationStatus" NOT NULL DEFAULT 'PROPOSED',
    "publishedAt" TIMESTAMP(3),
    "selectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mandate_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "mandatId" TEXT NOT NULL,
    "mandateApplicationId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "mode" "InterviewMode",
    "meetingLink" TEXT,
    "status" "InterviewStatus" NOT NULL DEFAULT 'SLOT_PROPOSED',
    "clientFeedbackOutcome" "InterviewFeedbackOutcome",
    "clientFeedbackComment" TEXT,
    "feedbackSubmittedAt" TIMESTAMP(3),
    "feedbackByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_slots" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "proposedByUserId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "chosen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interview_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "mandatId" TEXT,
    "postedByUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "missions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "profile" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "city" TEXT,
    "remoteType" TEXT,
    "contractType" TEXT,
    "category" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "status" "JobPostingStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "coverNote" TEXT,
    "cvUrl" TEXT,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "promotedToMandateApplicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_courses" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "domain" "TrainingDomain" NOT NULL,
    "description" TEXT NOT NULL,
    "durationHours" INTEGER,
    "status" "TrainingCourseStatus" NOT NULL DEFAULT 'DRAFT',
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_sessions" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "schedule" TEXT,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MAD',
    "instructorName" TEXT,
    "capacity" INTEGER NOT NULL,
    "location" TEXT,
    "status" "TrainingSessionStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "candidateId" TEXT,
    "paymentMethod" "EnrollmentPaymentMethod" NOT NULL,
    "paymentStatus" "EnrollmentPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MAD',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "confirmedByUserId" TEXT,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_profiles_userId_key" ON "client_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cabinet_profiles_userId_key" ON "cabinet_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cabinet_invites_token_key" ON "cabinet_invites"("token");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_userId_key" ON "candidates"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "mandats_reference_key" ON "mandats"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "mandate_applications_mandatId_candidateId_key" ON "mandate_applications"("mandatId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "job_applications_jobPostingId_candidateId_key" ON "job_applications"("jobPostingId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "training_courses_slug_key" ON "training_courses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_sessionId_userId_key" ON "enrollments"("sessionId", "userId");

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cabinet_profiles" ADD CONSTRAINT "cabinet_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cabinet_invites" ADD CONSTRAINT "cabinet_invites_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandats" ADD CONSTRAINT "mandats_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandats" ADD CONSTRAINT "mandats_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandats" ADD CONSTRAINT "mandats_assignedConsultantId_fkey" FOREIGN KEY ("assignedConsultantId") REFERENCES "cabinet_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandat_status_events" ADD CONSTRAINT "mandat_status_events_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "mandats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandat_status_events" ADD CONSTRAINT "mandat_status_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandat_messages" ADD CONSTRAINT "mandat_messages_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "mandats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandat_messages" ADD CONSTRAINT "mandat_messages_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandate_applications" ADD CONSTRAINT "mandate_applications_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "mandats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandate_applications" ADD CONSTRAINT "mandate_applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mandate_applications" ADD CONSTRAINT "mandate_applications_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "mandats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_mandateApplicationId_fkey" FOREIGN KEY ("mandateApplicationId") REFERENCES "mandate_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_feedbackByUserId_fkey" FOREIGN KEY ("feedbackByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_slots" ADD CONSTRAINT "interview_slots_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_slots" ADD CONSTRAINT "interview_slots_proposedByUserId_fkey" FOREIGN KEY ("proposedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "mandats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_postedByUserId_fkey" FOREIGN KEY ("postedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_courses" ADD CONSTRAINT "training_courses_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_sessions" ADD CONSTRAINT "training_sessions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "training_courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "training_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_confirmedByUserId_fkey" FOREIGN KEY ("confirmedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('INTERNSHIP', 'FULL_TIME', 'SCHOLARSHIP', 'HACKATHON', 'RESEARCH');

-- CreateTable
CREATE TABLE "opportunities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "company" VARCHAR(150) NOT NULL,
    "location" VARCHAR(150) NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "stipend" VARCHAR(100),
    "description" TEXT,
    "sourceUrl" TEXT,
    "deadline" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "opportunities_type_isActive_idx" ON "opportunities"("type", "isActive");

-- CreateIndex
CREATE INDEX "opportunities_deadline_idx" ON "opportunities"("deadline");

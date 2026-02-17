/*
  Warnings:

  - You are about to drop the column `cbtAttempts` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "cbtAttempts";

-- CreateTable
CREATE TABLE "CBTAttempt" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CBTAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CBTAttempt" ADD CONSTRAINT "CBTAttempt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

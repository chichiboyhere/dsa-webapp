/*
  Warnings:

  - You are about to drop the column `correct` on the `CBTQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CBTAttempt" ADD COLUMN     "exam" TEXT,
ADD COLUMN     "subjects" JSONB;

-- AlterTable
ALTER TABLE "CBTQuestion" DROP COLUMN "correct",
ADD COLUMN     "answer" TEXT,
ADD COLUMN     "exam" TEXT;

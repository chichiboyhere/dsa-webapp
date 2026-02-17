/*
  Warnings:

  - Made the column `tradeSubject` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "tradeSubject" SET NOT NULL;

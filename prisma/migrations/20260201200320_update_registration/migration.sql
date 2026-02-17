/*
  Warnings:

  - Added the required column `emergencyName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyPhone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeSubject` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "agreedToConduct" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "amountPaid" INTEGER,
ADD COLUMN     "emergencyName" TEXT NOT NULL,
ADD COLUMN     "emergencyPhone" TEXT NOT NULL,
ADD COLUMN     "paymentRef" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tradeSubject" TEXT NOT NULL;

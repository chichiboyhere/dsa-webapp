-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "cbtAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cbtExpiresAt" TIMESTAMP(3),
ADD COLUMN     "cbtPaidAt" TIMESTAMP(3);

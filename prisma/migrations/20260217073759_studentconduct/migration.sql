/*
  Warnings:

  - You are about to drop the column `conduct` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `conductNotes` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DisciplinaryStatus" AS ENUM ('SATISFACTORY', 'DISTINCTIVE', 'WORTHY_OF_EMULATION', 'UNDER_WATCH', 'DISCIPLINED');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "conduct",
DROP COLUMN "conductNotes",
ADD COLUMN     "disciplinaryNote" TEXT,
ADD COLUMN     "disciplinaryStatus" "DisciplinaryStatus" NOT NULL DEFAULT 'SATISFACTORY';

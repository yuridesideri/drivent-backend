/*
  Warnings:

  - Added the required column `endsAt` to the `UserActivities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `UserActivities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserActivities" ADD COLUMN     "endsAt" TEXT NOT NULL,
ADD COLUMN     "startsAt" TEXT NOT NULL;

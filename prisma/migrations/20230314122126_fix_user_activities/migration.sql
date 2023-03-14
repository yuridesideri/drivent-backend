/*
  Warnings:

  - You are about to drop the column `placeId` on the `UserActivities` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `UserActivities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserActivities" DROP CONSTRAINT "UserActivities_placeId_fkey";

-- AlterTable
ALTER TABLE "UserActivities" DROP COLUMN "placeId",
ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

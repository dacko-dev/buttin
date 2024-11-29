/*
  Warnings:

  - Added the required column `creatorId` to the `Button` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ButtonClick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Button" ADD COLUMN     "creatorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ButtonClick" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Button_creatorId_idx" ON "Button"("creatorId");

-- CreateIndex
CREATE INDEX "ButtonClick_userId_idx" ON "ButtonClick"("userId");

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

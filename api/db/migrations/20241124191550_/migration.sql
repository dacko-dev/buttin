/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Button` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ButtonClick` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ButtonClick" DROP CONSTRAINT "ButtonClick_userId_fkey";

-- DropIndex
DROP INDEX "Button_creatorId_idx";

-- DropIndex
DROP INDEX "ButtonClick_userId_idx";

-- AlterTable
ALTER TABLE "Button" DROP COLUMN "creatorId";

-- AlterTable
ALTER TABLE "ButtonClick" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "avatarUrl" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `NFT` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_userUser_id_fkey";

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "userUser_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;

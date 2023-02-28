/*
  Warnings:

  - You are about to drop the column `user_id` on the `NFT` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_user_id_fkey";

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "user_id",
ADD COLUMN     "userUser_id" TEXT;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

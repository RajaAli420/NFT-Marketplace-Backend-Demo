/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collection_address]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `AuctionOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SellOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionOrder" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Bids" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "collection_address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SellOrder" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;

-- CreateTable
CREATE TABLE "History" (
    "history_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ownerWalletAddress" TEXT NOT NULL,
    "buyerWalletAddress" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "collection_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("history_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_history_id_key" ON "History"("history_id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_collection_address_key" ON "Collection"("collection_address");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("nft_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE CASCADE ON UPDATE CASCADE;

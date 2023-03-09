/*
  Warnings:

  - You are about to drop the column `bannerImage` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `endingDate` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `redeemCode` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `startingDate` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[message_id]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `banner_image` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redeem_code` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordReset_messageId_key";

-- DropIndex
DROP INDEX "User_walletAddress_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "bannerImage",
DROP COLUMN "shortUrl",
ADD COLUMN     "banner_image" TEXT NOT NULL,
ADD COLUMN     "short_url" TEXT,
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id");

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "endingDate",
DROP COLUMN "price",
DROP COLUMN "redeemCode",
DROP COLUMN "startingDate",
DROP COLUMN "type",
ADD COLUMN     "redeem_code" TEXT NOT NULL,
ADD CONSTRAINT "NFT_pkey" PRIMARY KEY ("nft_id");

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "messageId",
ADD COLUMN     "message_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletAddress",
ADD COLUMN     "wallet_address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SellOrder" (
    "order_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "buyerAddress" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,

    CONSTRAINT "SellOrder_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "AuctionOrder" (
    "order_id" TEXT NOT NULL,
    "minimum_bid" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "starting_date" TIMESTAMP(3),
    "ending_date" TIMESTAMP(3),
    "buyer_address" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,

    CONSTRAINT "AuctionOrder_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Bids" (
    "bid_id" TEXT NOT NULL,
    "bid_amount" DOUBLE PRECISION NOT NULL,
    "bidder_wallet_address" TEXT NOT NULL,
    "auction_order_id" TEXT NOT NULL,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("bid_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bids_bid_id_key" ON "Bids"("bid_id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_message_id_key" ON "PasswordReset"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- AddForeignKey
ALTER TABLE "SellOrder" ADD CONSTRAINT "SellOrder_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("nft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionOrder" ADD CONSTRAINT "AuctionOrder_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("nft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_auction_order_id_fkey" FOREIGN KEY ("auction_order_id") REFERENCES "AuctionOrder"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

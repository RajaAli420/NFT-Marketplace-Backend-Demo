-- CreateTable
CREATE TABLE "Role" (
    "role_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "website" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Followers" (
    "follow_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Collection" (
    "collection_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortUrl" TEXT,
    "bannerImage" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NFT" (
    "nft_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "alternative_Text" TEXT,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "startingDate" TIMESTAMP(3),
    "endingDate" TIMESTAMP(3),
    "redeemCode" TEXT NOT NULL,
    "collection_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NFTMetadata" (
    "nft_metadata_id" TEXT NOT NULL,
    "trait_type" TEXT NOT NULL,
    "trait_value" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Followers_follow_id_key" ON "Followers"("follow_id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_collection_id_key" ON "Collection"("collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_nft_id_key" ON "NFT"("nft_id");

-- CreateIndex
CREATE UNIQUE INDEX "NFTMetadata_nft_metadata_id_key" ON "NFTMetadata"("nft_metadata_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTMetadata" ADD CONSTRAINT "NFTMetadata_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("nft_id") ON DELETE RESTRICT ON UPDATE CASCADE;

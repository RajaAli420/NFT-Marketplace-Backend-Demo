import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prismaService: PrismaService) {}
  async create(
    createCollectionDto: CreateCollectionDto,
    file: Express.Multer.File,
  ) {
    try {
      let path = file['bannerImage'][0]['path'];
      path = process.env.SERVER_PATH + path;
      path = path.replace(/\\/g, '/');

      console.log(createCollectionDto.collection_name);
      let createCollection = await this.prismaService.collection.create({
        data: {
          name: createCollectionDto.collection_name,
          symbol: createCollectionDto.symbol,
          description: createCollectionDto.description,
          short_url: createCollectionDto.shortUrl,
          banner_image: path,
          user_id: createCollectionDto.user_id,
        },
      });
      if (createCollection) return { Message: 'Collection Created' };
    } catch (e) {
      return e;
    }
  }

  async findAll() {
    return await this.prismaService.collection.findMany();
  }

  async findOne(id: string) {
    try {
      let oneCollection = await this.prismaService.collection.findUnique({
        where: {
          collection_id: id,
        },
        select: {
          name: true,
          symbol: true,
          description: true,
          short_url: true,
          banner_image: true,
          user: {
            select: {
              name: true,
            },
          },
          NFT: {
            select: {
              name: true,
              description: true,
              alternative_Text: true,
              image: true,
              redeem_code: true,
              NFTMetadata: true,
              Orders: true,
              AuctionOrder: true,
            },
          },
        },
      });

      return oneCollection;
    } catch (e) {}
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }
  async newCollectionFilter() {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentCollections = await this.prismaService.collection.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (recentCollections) return recentCollections;
    } catch (err) {
      return { Message: err };
    }
  }
  async topCollectionFilter(range: string) {
    let collectiondata;
    let nftData;
    let arrColl = [];
    let arrNft = [];
    let dateRange: Date;

    if (range === '1') {
      dateRange = new Date(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      );
    } else if (range === '7') {
      dateRange = new Date(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      );
    } else if (range === '30') {
      dateRange = new Date(
        new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      );
    } else {
      throw new Error('Invalid date range');
    }
    const topCollection: any = await this.prismaService
      .$queryRaw`SELECT SUM("price"),"History"."collection_id",ARRAY_AGG("History"."nft_id") as nft_id,ARRAY_AGG("History"."buyerWalletAddress") as buyer,ARRAY_AGG("History"."ownerWalletAddress") as ownerWallet, ARRAY_AGG("History"."createdAt") as dateSold, ARRAY_AGG("History"."price") as price
    FROM "History"
    JOIN "Collection" on "History"."collection_id"="Collection"."collection_id"
    Join "NFT" on "Hi story"."nft_id"="NFT"."nft_id"
     WHERE "History"."createdAt" >=${dateRange}
    GROUP BY "History"."collection_id"
    HAVING COUNT("History"."collection_id") >= 1`;

    for (let i = 0; i < topCollection.length; i++) {
      arrColl.push(topCollection[i].collectionAddress);
      for (let j = 0; j < topCollection[i].nft_id.length; j++) {
        arrNft.push(topCollection[i].nft_id[i]);
      }
    }
    collectiondata = await this.prismaService.collection.findMany({
      where: {
        collection_address: {
          in: arrColl,
        },
      },
      select: {
        name: true,
        banner_image: true,
        NFT: {
          where: {
            nft_id: {
              in: arrNft,
            },
          },
        },
      },
    });
    topCollection.push({ collectionData: collectiondata });
    if (topCollection)
      return {
        TopCollection: topCollection,
      };
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}

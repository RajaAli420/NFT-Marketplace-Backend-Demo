import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NftService {
  constructor(private prismaService: PrismaService) {}
  async create(createNftDto: CreateNftDto, file: Express.Multer.File) {
    try {
      let path = file['NftImage'][0]['path'];
      path = process.env.SERVER_PATH + path;
      path = path.replace(/\\/g, '/');
      let createNFT = await this.prismaService.nFT.create({
        data: {
          name: createNftDto.name,
          description: createNftDto.description,
          alternative_Text: createNftDto.alternative_Text,
          image: path,
          redeem_code: createNftDto.redeemCode,
          collection_id: createNftDto.collection_id,
        },
      });
      if (!createNFT)
        return {
          Message: `NFT Not Created`,
          HttpStatus: HttpStatus.NOT_MODIFIED,
        };
      if (createNftDto.type == 'Fixed') {
        let createOrder = await this.prismaService.sellOrder.create({
          data: {
            price: parseFloat(createNftDto.price.toString()),
            active: true,
            buyerAddress: '',
            nft_id: createNFT.nft_id,
          },
        });
      } else if (createNftDto.type == 'Auction') {
        let createAuction = await this.prismaService.auctionOrder.create({
          data: {
            minimum_bid: createNftDto.price,
            active: true,
            starting_date: createNftDto.startingDate,
            ending_date: createNftDto.endingDate,
            nft_id: createNFT.nft_id,
          },
        });
      } else {
        throw new HttpException(
          'Not A Valid Order Type',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findAll() {
    console.log(new Date());
    return `This action returns all nft`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  update(id: number, updateNftDto: UpdateNftDto) {
    return `This action updates a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}

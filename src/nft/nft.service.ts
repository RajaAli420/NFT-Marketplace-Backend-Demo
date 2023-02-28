import { Injectable } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NftService {
  constructor(private prismaService: PrismaService) {}
  async create(createNftDto: CreateNftDto, file: Express.Multer.File) {
    console.log(new Date(), createNftDto.price);
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
          price: parseFloat(createNftDto.price.toString()),
          type: createNftDto.type,
          startingDate: new Date(createNftDto.startingDate),
          endingDate: new Date(createNftDto.endingDate),
          redeemCode: createNftDto.redeemCode,
          collection_id: createNftDto.collection_id,
        },
      });
      if (createNFT) return { Message: createNFT };
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

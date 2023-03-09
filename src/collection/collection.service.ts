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

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}

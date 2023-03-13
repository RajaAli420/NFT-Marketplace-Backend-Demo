import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuctionOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updatePrice = await this.prismaService.sellOrder.update({
        where: {
          order_id: id,
        },
        data: {
          price: updateOrderDto.price,
        },
      });
      if (!updateOrderDto)
        throw new HttpException('Price NOt Update', HttpStatus.NOT_MODIFIED);
    } catch (e) {}
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

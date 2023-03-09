import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuctionOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  async createSellOrder(createOrderDto: CreateOrderDto) {
    try {
      let createOrder = await this.prismaService.sellOrder.create({
        data: {
          price: createOrderDto.price,
          active: createOrderDto.active,
          buyerAddress: createOrderDto.buyerAddress,
          nft_id: createOrderDto.nft_id,
        },
      });
      if (!createOrder)
        throw new HttpException('Order Not Create', HttpStatus.CONFLICT);
      return HttpStatus.CREATED;
    } catch (e) {
      return { Message: e };
    }
  }
  async createAuctionOrder(createAuctionOrderDto: CreateAuctionOrderDto) {
    try {
      let createOrder = await this.prismaService.auctionOrder.create({
        data: {
          minimum_bid: createAuctionOrderDto.minimum_bid,
          active: createAuctionOrderDto.active,
          starting_date: createAuctionOrderDto.startingDate,
          ending_date: createAuctionOrderDto.endingDate,
          nft_id: createAuctionOrderDto.nft_id,
        },
      });
      if (!createOrder)
        throw new HttpException('Order Not Create', HttpStatus.CONFLICT);
      return HttpStatus.CREATED;
    } catch (e) {
      return { Message: e };
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateAuctionOrderDto,
  CreateOrderDto,
  PlaceBidDto,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':filter')
  findAll(@Param('filter') filter: string) {
    return this.ordersService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('fixed/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
  @Patch('buy/:id')
  buyNFT(@Param('id') id: string, @Body('buyerAddress') buyerAddress: string) {
    return this.ordersService.buyNFT(id, buyerAddress);
  }
  @Post('placeBid')
  placeBid(@Body() placeBidDto: PlaceBidDto) {
    return this.ordersService.placeBid(placeBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

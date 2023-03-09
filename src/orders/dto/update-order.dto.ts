import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionOrderDto, CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
export class UpdateAuctionOrderDto extends PartialType(CreateAuctionOrderDto) {}

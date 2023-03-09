import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
  @IsNotEmpty()
  @IsString()
  buyerAddress: string;
  @IsNotEmpty()
  @IsString()
  nft_id: string;
}

export class CreateAuctionOrderDto {
  @IsNumber()
  @IsNotEmpty()
  minimum_bid: number;
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
  @IsNotEmpty()
  @IsDate()
  startingDate: Date;
  @IsNotEmpty()
  @IsDate()
  endingDate: Date;
  @IsNotEmpty()
  @IsString()
  nft_id: string;
}

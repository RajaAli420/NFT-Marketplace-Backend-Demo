import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateNftDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  alternative_Text: string;
  image: any;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNumber()
  @IsNotEmpty()
  price: number; //also used as minimum bid
  @IsString()
  buyerAddress: string;
  @IsDate()
  startingDate: Date;
  @IsDate()
  endingDate: Date;
  @IsString()
  @IsNotEmpty()
  redeemCode: string;
  @IsString()
  @IsNotEmpty()
  collection_id: string;
}

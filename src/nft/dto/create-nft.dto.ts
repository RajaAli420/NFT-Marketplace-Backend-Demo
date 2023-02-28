import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;
  @IsString()
  @IsNotEmpty()
  type: string;
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

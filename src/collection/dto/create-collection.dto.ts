import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  collection_name: string;
  @IsString()
  @IsNotEmpty()
  symbol: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  shortUrl: string;
  bannerImage: any;
  @IsString()
  @IsNotEmpty()
  user_id: string;
}

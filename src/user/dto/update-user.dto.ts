import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  bio: string;
  @IsString()
  @IsOptional()
  website: string;
  @IsString()
  @IsOptional()
  instagram: string;
  @IsString()
  @IsOptional()
  twitter: string;
  @IsString()
  @IsOptional()
  discord: string;
}

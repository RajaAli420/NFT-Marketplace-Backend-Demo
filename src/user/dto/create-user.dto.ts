import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsEmail()
  email: string;
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
  @IsNotEmpty()
  @IsString()
  role_id: string;
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
  avatar: any;
}

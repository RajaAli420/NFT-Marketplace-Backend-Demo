import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    try {
      let allUsers = await this.prismaService.user.findMany();
      if (allUsers) return { Users: allUsers };
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    try {
      let userDetail = await this.prismaService.user.findUnique({
        where: {
          user_id: id,
        },
        select: {
          username: true,
          Collection: {
            select: {
              name: true,
              banner_image: true,
              short_url: true,
              description: true,
              NFT: {},
            },
          },
        },
      });
      let followers = await this.prismaService.followers.findMany({
        where: {
          user_id: id,
        },
        select: {
          follower_id: true,
        },
      });
      let following = await this.prismaService.followers.findMany({
        where: {
          follower_id: id,
        },
        select: {
          user_id: true,
        },
      });
      (userDetail as any).follower = followers;
      (userDetail as any).following = following;
      if (userDetail) return { Details: userDetail };
    } catch (e) {
      return e;
    }
  }

  async update(
    wallet_address: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    let path = '';
    if (file != undefined) {
      path = (process.env.SERVER_PATH + file.path).replace(/\\/g, '/');
    }
    try {
      let updateUser = await this.prismaService.user.update({
        where: {
          wallet_address: wallet_address,
        },
        data: {
          avatar: path,
          bio: updateUserDto.bio ? updateUserDto.bio : null,
          website: updateUserDto.website ? updateUserDto.website : null,
          instagram: updateUserDto.instagram ? updateUserDto.instagram : null,
          twitter: updateUserDto.twitter ? updateUserDto.twitter : null,
          discord: updateUserDto.discord ? updateUserDto.discord : null,
        },
      });
      console.log(updateUser);
    } catch (e) {
      return { Message: e };
    }
  }

  async follow(user_id: string, follower_id: string) {
    try {
      const follower = await this.prismaService.followers.create({
        data: {
          user_id: user_id,
          follower_id: follower_id,
        },
      });
      if (!follower)
        throw new HttpException('Could not follow', HttpStatus.NOT_MODIFIED);
      return follower;
    } catch (e) {
      return e;
    }
  }
}

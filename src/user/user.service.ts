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
              bannerImage: true,
              shortUrl: true,
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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

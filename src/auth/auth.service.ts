import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}
  async signup(createUserDto: CreateUserDto, file: Express.Multer.File) {
    try {
      console.log(process.env.SERVER_PATH + file.path);
      let hash = await bcrypt.hash(createUserDto.password, 10);
      let createUser = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          username: createUserDto.username,
          password: hash,
          email: createUserDto.email,
          bio: createUserDto.bio,
          website: createUserDto.website,
          instagram: createUserDto.instagram,
          twitter: createUserDto.twitter,
          discord: createUserDto.discord,
          walletAddress: createUserDto.walletAddress,
          avatar: (process.env.SERVER_PATH + file.path).replace(/\\/g, '/'),
          role_id: createUserDto.role_id,
        },
        select: {
          user_id: true,
          username: true,
          Role: {
            select: {
              type: true,
            },
          },
        },
      });

      if (createUser)
        return {
          ACCESS_TOKEN: this.signToken({
            user_id: createUser.user_id,
            username: createUser.username,
            role: createUser.Role.type,
          }),
        };
    } catch (e) {
      return e;
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      let userDetail = await this.prismaService.user.findUnique({
        where: {
          username: createAuthDto.username,
        },
        select: {
          user_id: true,
          password: true,
          Role: {
            select: {
              type: true,
            },
          },
        },
      });
      if (!userDetail)
        throw new HttpException('User Does Not Found', HttpStatus.NOT_FOUND);
      if (!bcrypt.compare(createAuthDto.password, userDetail.password))
        throw new HttpException(
          'Credentials Don`t Match',
          HttpStatus.UNAUTHORIZED,
        );
      return {
        ACCESS_TOKEN: this.signToken({
          user_id: userDetail.user_id,
          username: createAuthDto.username,
          role: userDetail.Role.type,
        }),
      };
    } catch (e) {
      return e;
    }
  }
  signToken(payload: { user_id: string; username: string; role: string }) {
    const secret = process.env.JWTSECRET;
    return this.jwt.sign(payload, {
      expiresIn: '1h',
      secret,
    });
  }
  async validateUserExists(user_id: string) {
    try {
      let user = await this.prismaService.user.findUnique({
        where: {
          user_id,
        },
      });
      if (user) return true;
      else return false;
    } catch (e) {
      return e;
    }
  }
  async updateRole(user_id: string, role_id: string) {
    try {
      const updateRole = await this.prismaService.user.update({
        where: {
          user_id: user_id,
        },
        data: {
          role_id: role_id,
        },
        select: {
          username: true,
          Role: {
            select: {
              type: true,
            },
          },
        },
      });
      console.log(updateRole);
      if (!updateRole)
        throw new HttpException('Could Not Update', HttpStatus.NOT_MODIFIED);
      return {
        ACCESS_TOKEN: this.signToken({
          user_id: user_id,
          username: updateRole.username,
          role: updateRole.Role.type,
        }),
      };
    } catch (e) {
      return new HttpException('Did Not Update', HttpStatus.NOT_MODIFIED, {
        cause: new Error(e),
      });
    }
  }
  async resetPassword(email: string) {
    try {
      let user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user)
        return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      const generateOTP = () => {
        const otp = crypto.randomInt(100000, 999999);
        return otp.toString();
      };

      const otp = generateOTP();
      console.log(otp);
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        // host: 'smtp.gmail.com',
        // port: 657,
        // secure: true,
        auth: {
          user: 'doetesting43@gmail.com',
          pass: 'syjfbkohrnefubox',
        },
      });

      const mailOptions = {
        from: 'doetesting43@gmail.com',
        to: email,
        subject: 'Reset your password',
        text: `Use the following code for resetting your password: ${otp}`,
      };
      let mailResponse = await transporter.sendMail(mailOptions);
      await this.prismaService.passwordReset.create({
        data: {
          messageId: mailResponse.messageId,
          otp: otp,
          email: email,
          active: true,
        },
      });
      return 'Check Your Gmail For Password Reset Code';
    } catch (e) {
      return e;
    }
  }
}

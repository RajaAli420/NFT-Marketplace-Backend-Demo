import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  @Patch('changerole')
  @UseGuards(AuthGuard('jwt'))
  updateRole(@Req() req: Express.Request, @Body('role_id') role_id: string) {
    const user: any = req.user;
    console.log(user.user_id, role_id);
    return this.authService.updateRole(user.user_id, role_id);
  }
  @Post('resetPassword')
  // @UseGuards(AuthGuard('jwt'))
  resetPasswordOTP(@Body('email') email: string) {
    return this.authService.resetPasswordOTP(email);
  }
  @Post('matchOTP')
  matchOTP(@Body('code') code: string, @Body('email') email: string) {
    return this.authService.matchOTP(code, email);
  }
}

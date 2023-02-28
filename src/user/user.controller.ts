import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Express.Request) {
    const user: any = req.user;
    if (id != user.user_id) {
      return new HttpException('Not Allowed', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Post('follow')
  @UseGuards(AuthGuard('jwt'))
  follow(
    @Req() req: Express.Request,
    @Body('follower_id') follower_id: string,
  ) {
    const user: any = req.user;
    return this.userService.follow(user.user_id, follower_id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterceptorDecorator } from './decorator/file.interceptor';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('create-nft')
  @UseInterceptors(FileInterceptorDecorator)
  create(
    @UploadedFiles() file: Express.Multer.File,
    @Body() createNftDto: any,
  ) {
    return this.nftService.create(createNftDto, file);
  }

  @Get()
  findAll() {
    return this.nftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNftDto: UpdateNftDto) {
    return this.nftService.update(+id, updateNftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nftService.remove(+id);
  }
}

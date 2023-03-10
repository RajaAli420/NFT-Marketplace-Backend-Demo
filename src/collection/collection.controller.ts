import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { clearConfigCache } from 'prettier';
import { FileInterceptorDecorator } from './decorator/file.interceptor';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post('createCollection')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Artisan')
  @UseInterceptors(FileInterceptorDecorator)
  create(
    @UploadedFiles() file: Express.Multer.File,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return this.collectionService.create(createCollectionDto, file);
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get('recent')
  findAllRecent() {
    console.log('here');
    return this.collectionService.newCollectionFilter();
  }
  @Get('top/:range')
  topCollections(@Param('range') range: string) {
    return this.collectionService.topCollectionFilter(range);
  }

  //for getting one collection
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }
  //not sure what a user could update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}

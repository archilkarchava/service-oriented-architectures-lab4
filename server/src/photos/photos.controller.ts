import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PhotoEntity } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get()
  findAll(): Promise<PhotoEntity[]> {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PhotoEntity> {
    return this.photoService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.photoService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<string> {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    // throw new BadRequestException(
    //   `Please provide photo ${Object.getOwnPropertyNames(
    //     CreatePhotoDto.prototype,
    //   ).map(key => {
    //     if (!createPhotoDto[key]) {
    //       return key;
    //     }
    //     // if (!createPhotoDto[key] || createPhotoDto[key].length === 0) {
    //     //   return key;
    //     // }
    //   })}.`,
    // );
    if (
      !createPhotoDto ||
      !createPhotoDto.name ||
      !createPhotoDto.description ||
      !createPhotoDto.filename
    ) {
      throw new BadRequestException(
        'Please provide photo name, description and filename.',
      );
    }
    return this.photoService.create(createPhotoDto);
  }
}

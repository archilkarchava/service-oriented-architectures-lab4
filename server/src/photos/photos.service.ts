import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PhotoEntity } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photosRepository: Repository<PhotoEntity>,
  ) {}

  async findOne(id: number): Promise<PhotoEntity> {
    const photo = await this.photosRepository.findOne(id);
    return photo;
  }

  async findAll(): Promise<PhotoEntity[]> {
    return await this.photosRepository.find();
  }

  async create(createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    const photo = {
      name: createPhotoDto.name,
      description: createPhotoDto.description,
      filename: createPhotoDto.filename,
      views: 0,
      isPublished: false,
    } as PhotoEntity;
    return await this.photosRepository.save(photo);
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<string> {
    const photoUpdate = {
      ...(updatePhotoDto.name && { name: updatePhotoDto.name }),
      ...(updatePhotoDto.description && {
        description: updatePhotoDto.description,
      }),
      ...(updatePhotoDto.filename && { filename: updatePhotoDto.filename }),
    } as PhotoEntity;
    const updateResult = await this.photosRepository.update(id, photoUpdate);
    if (updateResult.affected === 0) {
      throw new BadRequestException(`photo with id ${id} does not exist`);
    }
    return 'success';
  }

  async delete(id: number): Promise<string> {
    const deleteResult = await this.photosRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new BadRequestException(`photo with id ${id} does not exist`);
    }
    return 'success';
  }
}

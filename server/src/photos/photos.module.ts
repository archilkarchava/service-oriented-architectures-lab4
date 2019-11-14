import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}

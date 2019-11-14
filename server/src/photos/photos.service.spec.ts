import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosService,
        { provide: getRepositoryToken(PhotoEntity), useClass: Repository },
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

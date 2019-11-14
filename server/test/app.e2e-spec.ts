import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PhotosService } from '../src/photos/photos.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const photosService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PhotosService)
      .useValue(photosService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/photos (GET)', () => {
    return request(app.getHttpServer())
      .get('/photos')
      .expect(200)
      .expect(photosService.findAll());
  });

  // it('/photos/15 (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/photos/15')
  //     .expect(200)
  //     .expect(
  //       JSON.stringify({
  //         id: 15,
  //         name: 'kikiki',
  //         description: 'phphp',
  //         filename:
  //           'https://i.scdn.co/image/ab67616d0000b2739650aada596b9a12181db474',
  //         views: 0,
  //         isPublished: false,
  //       }),
  //     );
  // });
  // it('/photos/16 (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/photos/16')
  //     .expect(200)
  //     .expect(
  //       JSON.stringify({
  //         id: 16,
  //         name: 'hhhh',
  //         description: 'eeeee',
  //         filename:
  //           'https://i.scdn.co/image/ab67616d0000b2739650aada596b9a12181db474',
  //         views: 0,
  //         isPublished: false,
  //       }),
  //     );
  // });
});

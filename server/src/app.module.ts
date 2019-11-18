import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ItemTypesModule } from './item-types/item-types.module';
import { ItemsModule } from './items/items.module';
import { LocationsModule } from './locations/locations.module';
import { MessagesModule } from './messages/messages.module';
import { PhotosModule } from './photos/photos.module';
import { PlayersModule } from './players/players.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as any,
        host: configService.DATABASE_HOST,
        port: configService.DATABASE_PORT,
        username: configService.DATABASE_USER,
        password: configService.DATABASE_PASSWORD,
        database: configService.DATABASE_NAME,
        synchronize: configService.NODE_ENV === 'production' ? false : true,
        logging: configService.NODE_ENV === 'production' ? false : true,
        entities: ['build/**/entities/*.entity.{ts,js}'],
        migrations: ['build/**/migrations/*.migration.{ts,js}'],
        subscribers: ['build/**/subscribers/*.subscriber.{ts,js}'],
      }),
      inject: [ConfigService],
    }),
    PhotosModule,
    AuthModule,
    UsersModule,
    PlayersModule,
    LocationsModule,
    ItemsModule,
    ItemTypesModule,
    MessagesModule,
  ],
})
export class AppModule {}

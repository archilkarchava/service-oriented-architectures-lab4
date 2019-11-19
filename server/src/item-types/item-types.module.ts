import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeEntity } from './entities/item-type.entity';
import { ItemTypesController } from './item-types.controller';
import { ItemTypesService } from './item-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTypeEntity])],
  providers: [ItemTypesService],
  controllers: [ItemTypesController],
})
export class ItemTypesModule {}

import { Module } from '@nestjs/common';
import { ItemTypesService } from './item-types.service';
import { ItemTypesController } from './item-types.controller';

@Module({
  providers: [ItemTypesService],
  controllers: [ItemTypesController]
})
export class ItemTypesModule {}

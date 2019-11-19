import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ItemTypeItemDto } from './item-type-item.dto';

export class UpdateItemDto {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ItemTypeItemDto)
  readonly itemType: ItemTypeItemDto;

  @IsOptional()
  @IsInt()
  readonly quality: number;
}

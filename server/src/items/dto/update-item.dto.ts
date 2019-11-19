import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ItemTypeDto } from '../../item-types/dto/item-type.dto';

export class UpdateItemDto {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ItemTypeDto)
  readonly itemType: ItemTypeDto;

  @IsOptional()
  @IsInt()
  readonly quality: number;
}

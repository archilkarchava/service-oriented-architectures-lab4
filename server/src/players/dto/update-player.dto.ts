import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ItemEntity } from '../../items/entities/item.entity';
import { UpdateLocationDto } from '../../locations/dto/update-location.dto';

export class UpdatePlayerDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsOptional()
  @Matches(/\bKnight\b|\bWizard\b|\bThief\b|\bPaladin\b/)
  readonly playerClass: 'Knight' | 'Wizard' | 'Thief' | 'Paladin';
  @IsOptional()
  @IsInt()
  readonly level: number;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  readonly position: UpdateLocationDto;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemEntity)
  readonly items: ItemEntity[];
}

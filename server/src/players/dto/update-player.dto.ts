import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { UpdatePlayerPositionDto } from './update-player-position.dto';

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
  @Type(() => UpdatePlayerPositionDto)
  readonly position: UpdatePlayerPositionDto;
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => ItemEntity)
  // readonly items: ItemEntity[];
}

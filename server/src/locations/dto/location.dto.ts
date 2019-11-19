import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { PlayerDto } from '../../players/dto/player.dto';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  readonly locationId: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @Matches(/\bForest\b|\bDesert\b|\bDungeon\b|\bRiver\b|\bOcean\b/)
  readonly locationType: 'Forest' | 'Desert' | 'Dungeon' | 'River' | 'Ocean';

  @ValidateNested({ each: true })
  readonly players: PlayerDto[];
}

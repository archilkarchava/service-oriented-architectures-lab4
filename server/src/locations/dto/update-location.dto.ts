import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateLocationDto {
  @IsNotEmpty()
  @IsString()
  readonly locationId: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @Matches(/\bForest\b|\bDesert\b|\bDungeon\b|\bRiver\b|\bOcean\b/)
  readonly locationType: 'Forest' | 'Desert' | 'Dungeon' | 'River' | 'Ocean';
}

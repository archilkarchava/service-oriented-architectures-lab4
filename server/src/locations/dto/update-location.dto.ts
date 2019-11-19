import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @Matches(/\bForest\b|\bDesert\b|\bDungeon\b|\bRiver\b|\bOcean\b/)
  readonly locationType: 'Forest' | 'Desert' | 'Dungeon' | 'River' | 'Ocean';
}

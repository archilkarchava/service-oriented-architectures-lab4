import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @Matches(/\bKnight\b|\bWizard\b|\bThief\b|\bPaladin\b/)
  readonly playerClass: 'Knight' | 'Wizard' | 'Thief' | 'Paladin';
}

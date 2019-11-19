import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePlayerPositionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly locationId: string;
}

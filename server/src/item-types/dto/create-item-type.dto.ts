import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

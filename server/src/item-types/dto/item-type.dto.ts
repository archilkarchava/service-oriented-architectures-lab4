import { IsInt } from 'class-validator';

export class ItemTypeDto {
  @IsInt()
  readonly id;
}

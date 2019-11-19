import { IsInt } from 'class-validator';

export class ItemTypeItemDto {
  @IsInt()
  readonly id;
}

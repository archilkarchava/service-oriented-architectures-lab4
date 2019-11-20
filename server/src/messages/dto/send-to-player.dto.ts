import { IsInt } from 'class-validator';

export class SendToPlayerDto {
  @IsInt()
  id: number;
}

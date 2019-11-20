import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { SendToPlayerDto } from './send-to-player.dto';

export class SendMessageDto {
  @ValidateNested()
  @Type(() => SendToPlayerDto)
  playerTo: SendToPlayerDto;

  @IsString()
  @IsNotEmpty()
  messageText: string;
}

import { PlayerDto } from '../../players/dto/player.dto';
import { MessageEntity } from '../entities/message.entity';

export class MessageDto {
  constructor(messageEntity: MessageEntity) {
    this.messageId = messageEntity.messageId;
    this.playerFrom = messageEntity.playerFrom;
    this.playerTo = messageEntity.playerTo;
    this.messageText = messageEntity.messageText;
  }
  readonly messageId: number;

  readonly playerFrom: PlayerDto;

  readonly playerTo: PlayerDto;

  readonly messageText: string;
}

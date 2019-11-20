import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from '../players/entities/player.entity';
import { UserDto } from '../users/dto/user.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
    @InjectRepository(PlayerEntity)
    private readonly playersRepository: Repository<PlayerEntity>,
  ) {}

  private async playerBelongsToUser(playerId, userId): Promise<boolean> {
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && userId === currentPlayer.user.id) {
      return true;
    }
    return false;
  }

  async findAllReceived(
    user: UserDto,
    playerId: number,
  ): Promise<MessageEntity[]> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      return await this.messagesRepository.find({
        where: { playerTo: { id: playerId }, deletedByReceiver: false },
        relations: ['playerFrom'],
      });
    }
    throw new ForbiddenException();
  }

  async findOneReceived(
    user: UserDto,
    playerId: number,
    messageId: number,
  ): Promise<MessageEntity> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      return await this.messagesRepository.findOne(messageId, {
        where: { playerTo: { id: playerId }, deletedByReceiver: false },
        relations: ['playerFrom'],
      });
    }
    throw new ForbiddenException();
  }

  async findAllSent(user: UserDto, playerId: number): Promise<MessageEntity[]> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      return await this.messagesRepository.find({
        where: { playerFrom: { id: playerId }, deletedBySender: false },
        relations: ['playerTo'],
      });
    }
    throw new ForbiddenException();
  }

  async findOneSent(
    user: UserDto,
    playerId: number,
    messageId: number,
  ): Promise<MessageEntity> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      return await this.messagesRepository.findOne(messageId, {
        where: { playerFrom: { id: playerId }, deletedBySender: false },
        relations: ['playerTo'],
      });
    }
    throw new ForbiddenException();
  }

  async send(user: UserDto, playerId: number, sendMessageDto: SendMessageDto) {
    if (this.playerBelongsToUser(playerId, user.id)) {
      const message = {
        ...sendMessageDto,
        playerFrom: { id: playerId },
      } as MessageEntity;
      return await this.messagesRepository.save(message);
    }
    throw new ForbiddenException();
  }

  async deleteReceived(
    user: UserDto,
    playerId: number,
    messageId: number,
  ): Promise<string> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      const message = await this.messagesRepository.findOne(messageId);
      if (!message) {
        throw new BadRequestException(
          `you haven't sent a message with id ${messageId}`,
        );
      }
      if (message.deletedBySender) {
        const deleteQuery = await this.messagesRepository.delete({
          messageId,
          playerTo: { id: playerId },
        });
        if (deleteQuery.affected === 0) {
          throw new BadRequestException(
            `you haven't sent a message with id ${messageId}`,
          );
        }
        return 'success';
      } else {
        const updateQuery = await this.messagesRepository.update(
          { messageId, playerTo: { id: playerId } },
          {
            deletedByReceiver: true,
          },
        );
        if (updateQuery.affected === 0) {
          throw new BadRequestException(
            `you haven't sent a message with id ${messageId}`,
          );
        }
        return 'success';
      }
    }
    throw new ForbiddenException();
  }
  async deleteSent(
    user: UserDto,
    playerId: number,
    messageId: number,
  ): Promise<string> {
    if (this.playerBelongsToUser(playerId, user.id)) {
      const message = await this.messagesRepository.findOne(messageId);
      if (!message) {
        throw new BadRequestException(
          `you haven't sent a message with id ${messageId}`,
        );
      }
      if (message.deletedByReceiver) {
        const deleteQuery = await this.messagesRepository.delete({
          messageId,
          playerFrom: { id: playerId },
        });
        if (deleteQuery.affected === 0) {
          throw new BadRequestException(
            `you haven't sent a message with id ${messageId}`,
          );
        }
        return 'success';
      } else {
        const updateQuery = await this.messagesRepository.update(
          { messageId, playerFrom: { id: playerId } },
          {
            deletedBySender: true,
          },
        );
        if (updateQuery.affected === 0) {
          throw new BadRequestException(
            `you haven't sent a message with id ${messageId}`,
          );
        }
        return 'success';
      }
    }
    throw new ForbiddenException();
  }
}

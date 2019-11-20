import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async findAllRecieved(
    user: UserDto,
    playerId: number,
  ): Promise<MessageEntity[]> {
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && user.id === currentPlayer.user.id) {
      return await this.messagesRepository.find({
        where: { playerTo: { id: playerId } },
        relations: ['playerFrom'],
      });
    }
    throw new ForbiddenException();
  }

  async findOneRecieved(
    user: UserDto,
    playerId: number,
    messageId: number,
  ): Promise<MessageEntity> {
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && user.id === currentPlayer.user.id) {
      return await this.messagesRepository.findOne(messageId, {
        where: { playerTo: { id: playerId } },
        relations: ['playerFrom'],
      });
    }
    throw new ForbiddenException();
  }

  async findAllSent(user: UserDto, playerId: number): Promise<MessageEntity[]> {
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && user.id === currentPlayer.user.id) {
      return await this.messagesRepository.find({
        where: { playerFrom: { id: playerId } },
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
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && user.id === currentPlayer.user.id) {
      return await this.messagesRepository.findOne(messageId, {
        where: { playerFrom: { id: playerId } },
        relations: ['playerTo'],
      });
    }
    throw new ForbiddenException();
  }

  async send(user: UserDto, playerId: number, sendMessageDto: SendMessageDto) {
    const currentPlayer = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (currentPlayer && user.id === currentPlayer.user.id) {
      const message = {
        ...sendMessageDto,
        playerFrom: { id: playerId },
      } as MessageEntity;
      return await this.messagesRepository.save(message);
    }
    throw new ForbiddenException();
  }
}

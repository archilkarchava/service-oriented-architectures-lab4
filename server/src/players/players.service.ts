import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../users/dto/user.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playersRepository: Repository<PlayerEntity>,
  ) {}

  async findAll(): Promise<PlayerEntity[]> {
    return await this.playersRepository.find({
      relations: ['items', 'user'],
    });
  }

  async findOne(id: number): Promise<PlayerEntity> {
    return await this.playersRepository.findOne(id, {
      relations: ['items', 'user'],
    });
  }

  async create(
    createPlayerDto: CreatePlayerDto,
    user: UserDto,
  ): Promise<PlayerEntity> {
    const playerExists = await this.playersRepository.findOne({
      where: { name: createPlayerDto.name },
    });
    if (!playerExists) {
      const player = {
        name: createPlayerDto.name,
        playerClass: createPlayerDto.playerClass,
        level: 1,
        user,
      } as PlayerEntity;
      return await this.playersRepository.save(player);
    } else {
      throw new ConflictException('Player with this name already exists.');
    }
  }

  async update(
    id: number,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerEntity> {
    const player = await this.playersRepository.findOne(id, {
      relations: ['position', 'items', 'user', 'outbox', 'inbox'],
    });
    if (!player) {
      throw new BadRequestException(`player with id ${id} does not exist`);
    }
    const updatedPlayer = {
      ...player,
      ...updatePlayerDto,
    };
    const updateResult = await this.playersRepository.save(updatedPlayer);
    return updateResult;
  }

  async delete(id: number, user: UserDto): Promise<string> {
    const player = await this.playersRepository.findOne(id, {
      relations: ['user'],
    });
    if (!player) {
      throw new BadRequestException(`player with id ${id} does not exist`);
    }
    const playerOwner = player.user;
    if (user.id === playerOwner.id || user.roles.includes('admin')) {
      await this.playersRepository.delete(id);
      return 'success';
    }
    throw new ForbiddenException();
  }
}

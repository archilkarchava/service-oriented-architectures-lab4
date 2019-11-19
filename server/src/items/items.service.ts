import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemTypeEntity } from '../item-types/entities/item-type.entity';
import { PlayerEntity } from '../players/entities/player.entity';
import { UserDto } from '../users/dto/user.dto';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemsRepository: Repository<ItemEntity>,
    @InjectRepository(PlayerEntity)
    private readonly playersRepository: Repository<PlayerEntity>,
  ) {}

  async findAllForPlayer(playerId: number): Promise<ItemEntity[]> {
    const player = await this.playersRepository.findOne(playerId, {
      relations: ['items', 'items.itemType'],
    });
    return player && player.items;
    // return await this.itemsRepository.find({
    //   where: { owner: { id } },
    //   relations: ['itemType'],
    // });
  }

  async findOneForPlayer(
    playerId: number,
    itemId: number,
  ): Promise<ItemEntity> {
    // const player = await this.playersRepository.findOne(playerId, {
    //   relations: ['items', 'items.itemType'],
    // });
    // console.log(player.items);
    return await this.itemsRepository.findOne({
      where: { id: itemId, owner: { id: playerId } },
      relations: ['itemType'],
    });
    // return (
    //   player && player.items && player.items.find(item => item.id === itemId)
    // );
  }

  async addForPlayer(
    playerId: number,
    itemTypeId: number,
  ): Promise<ItemEntity> {
    const newItem = {
      itemType: { id: itemTypeId } as ItemTypeEntity,
      owner: { id: playerId } as PlayerEntity,
      quality: 100,
    } as ItemEntity;
    return await this.itemsRepository.save(newItem);
  }
  async deleteFromPlayer(
    playerId: number,
    itemId: number,
    user: UserDto,
  ): Promise<string> {
    const player = await this.playersRepository.findOne(playerId, {
      relations: ['user'],
    });
    if (user.id === player.user.id || user.roles.includes('admin')) {
      const deleteQuery = await this.itemsRepository.delete({
        id: itemId,
        owner: { id: playerId },
      });
      if (deleteQuery.affected === 0) {
        throw new BadRequestException(
          `item with id ${itemId} does not exist or does not belong to the player with id ${playerId}`,
        );
      }
      return 'success';
    }
    throw new ForbiddenException();
  }
}

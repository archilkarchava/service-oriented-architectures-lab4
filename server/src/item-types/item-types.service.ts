import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { ItemTypeEntity } from './entities/item-type.entity';

@Injectable()
export class ItemTypesService {
  constructor(
    @InjectRepository(ItemTypeEntity)
    private readonly itemTypesRepository: Repository<ItemTypeEntity>,
  ) {}

  async findAll(): Promise<ItemTypeEntity[]> {
    return await this.itemTypesRepository.find();
  }

  async findOne(id: number): Promise<ItemTypeEntity> {
    return await this.itemTypesRepository.findOne(id);
  }

  async create(createLocationDto: CreateItemTypeDto): Promise<ItemTypeEntity> {
    return await this.itemTypesRepository.save(createLocationDto);
  }

  async update(
    id: number,
    updateLocationDto: UpdateItemTypeDto,
  ): Promise<string> {
    const updateQuery = await this.itemTypesRepository.update(
      id,
      updateLocationDto,
    );
    if (updateQuery.affected === 0) {
      throw new BadRequestException(`location with id ${id} does not exist`);
    }
    return 'success';
  }

  async delete(id: number): Promise<string> {
    const deleteQuery = await this.itemTypesRepository.delete(id);
    if (deleteQuery.affected === 0) {
      throw new BadRequestException(`location with id ${id} does not exist`);
    }
    return 'success';
  }
}

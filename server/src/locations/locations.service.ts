import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationsRepository: Repository<LocationEntity>,
  ) {}

  async findAll(): Promise<LocationEntity[]> {
    return await this.locationsRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<LocationEntity> {
    return await this.locationsRepository.findOne(id, {
      relations: ['players'],
    });
  }

  async create(createLocationDto: CreateLocationDto): Promise<LocationEntity> {
    return await this.locationsRepository.save(createLocationDto);
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<string> {
    const updateQuery = await this.locationsRepository.update(
      id,
      updateLocationDto,
    );
    if (updateQuery.affected === 0) {
      throw new BadRequestException(`location with id ${id} does not exist`);
    }
    return 'success';
  }

  async delete(id: number): Promise<string> {
    const deleteQuery = await this.locationsRepository.delete(id);
    if (deleteQuery.affected === 0) {
      throw new BadRequestException(`location with id ${id} does not exist`);
    }
    return 'success';
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async createNewUser(newUser: CreateUserDto): Promise<UserEntity> {
    const userRegistered = await this.findByEmail(newUser.email);
    if (!userRegistered) {
      newUser.password = await argon2.hash(newUser.password);
      return await this.usersRepository.save({
        ...newUser,
        ...{ roles: ['user'] },
      });
    } else {
      throw new ConflictException('User with this email already exists.');
    }
  }

  // async findAll(): Promise<UserEntity[]> {
  //   return await this.photosRepository.find();
  // }
  // async create(createPhotoDto: CreatePhotoDto): Promise<UserEntity> {
  //   const user = {
  //     name: createPhotoDto.name,
  //     description: createPhotoDto.description,
  //     filename: createPhotoDto.filename,
  //     views: 0,
  //     isPublished: false,
  //   } as UserEntity;
  //   return await this.photosRepository.save(photo);
  // }

  // async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<string> {
  //   const photoUpdate = {
  //     ...(updatePhotoDto.name && { name: updatePhotoDto.name }),
  //     ...(updatePhotoDto.description && {
  //       description: updatePhotoDto.description,
  //     }),
  //     ...(updatePhotoDto.filename && { filename: updatePhotoDto.filename }),
  //   } as UserEntity;
  //   const updateResult = await this.photosRepository.update(id, photoUpdate);
  //   if (updateResult.affected === 0) {
  //     throw new BadRequestException(`photo with id ${id} does not exist`);
  //   }
  //   return 'success';
  // }

  // async delete(id: number): Promise<string> {
  //   const deleteResult = await this.photosRepository.delete(id);
  //   if (deleteResult.affected === 0) {
  //     throw new BadRequestException(`photo with id ${id} does not exist`);
  //   }
  //   return 'success';
  // }
}

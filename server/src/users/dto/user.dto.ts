import { UserEntity } from '../entities/user.entity';

export class UserDto {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.username = userEntity.username;
  }
  id: number;
  username: string;
}

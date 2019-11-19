import { UserEntity } from '../entities/user.entity';

export class UserDto {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.roles = userEntity.roles;
  }
  readonly id: number;

  // @IsEmail()
  readonly email: string;

  readonly roles: string[];
}

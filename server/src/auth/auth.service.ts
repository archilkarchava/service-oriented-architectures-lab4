import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(username: string, pass: string) {
    const userFromDb = await this.usersService.findByUsername(username);
    if (!userFromDb) {
      // throw new NotFoundException('User not found.');
      throw new UnauthorizedException('Login error');
    }

    const isValidPass = await argon2.verify(userFromDb.password, pass);

    if (isValidPass) {
      const accessToken = await this.jwtService.createToken(
        userFromDb.id,
        userFromDb.username,
      );
      return { token: accessToken, user: new UserDto(userFromDb) };
    } else {
      throw new UnauthorizedException('Login error');
    }
  }
}

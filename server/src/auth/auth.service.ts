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

  async validateLogin(email: string, pass: string) {
    const userFromDb = await this.usersService.findByEmail(email);
    if (!userFromDb) {
      // throw new NotFoundException('User not found.');
      throw new UnauthorizedException('Login error');
    }

    const isValidPass = await argon2.verify(userFromDb.password, pass);

    if (isValidPass) {
      const accessToken = await this.jwtService.createToken(
        userFromDb.email,
        userFromDb.roles,
      );
      return { token: accessToken, user: new UserDto(userFromDb) };
    } else {
      throw new UnauthorizedException('Login error');
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(id: number, username: string) {
    const expiresIn = '7 days';
    const secret = this.configService.JWT_SECRET;
    const userInfo: UserDto = { id, username };
    const token = jwt.sign(userInfo, secret, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser: UserDto): Promise<UserDto> {
    const userFromDb = await this.usersService.findByUsername(
      signedUser.username,
    );
    if (userFromDb) {
      return new UserDto(userFromDb);
    }
    return null;
  }
}

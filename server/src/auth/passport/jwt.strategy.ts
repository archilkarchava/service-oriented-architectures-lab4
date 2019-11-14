import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { UserDto } from '../../users/dto/user.dto';
import { JwtService } from '../jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passReqToCallback: true,
      secretOrKey: configService.JWT_SECRET,
    });
  }

  async validate(req: any): Promise<UserDto> {
    const user = await this.jwtService.validateUser(req);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

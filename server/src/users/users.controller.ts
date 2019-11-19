import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);
    // if (!user) {
    //   throw new NotFoundException();
    // }
    return user && new UserDto(user);
  }
}

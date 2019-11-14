import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findById(@Param('username') username: string): Promise<UserDto> {
    const user = await this.usersService.findByUsername(username);
    return new UserDto(user);
  }
}

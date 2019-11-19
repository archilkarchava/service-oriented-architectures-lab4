import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserDto } from '../users/dto/user.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Roles('admin', 'user')
  @Get()
  async findAll() {
    const players: PlayerDto[] = [];
    for (const player of await this.playersService.findAll()) {
      players.push(new PlayerDto(player));
    }
    return players;
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const player = await this.playersService.findOne(id);
    return player && new PlayerDto(player);
  }

  @Roles('admin', 'user')
  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @CurrentUser() user: UserDto,
  ) {
    return await this.playersService.create(createPlayerDto, user);
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return new PlayerDto(await this.playersService.update(id, updatePlayerDto));
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async delete(@Param('id') id: number, @CurrentUser() user: UserDto) {
    return await this.playersService.delete(id, user);
  }
  // @Get()
  // async findById(@Param('email') email: string): Promise<UserDto> {
  //   const user = await this.usersService.findByEmail(email);
  //   return new UserDto(user);
  // }
}

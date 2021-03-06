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
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('players/:playerId/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Roles('admin', 'user')
  @Get()
  async findAll(@Param('playerId') playerId: number) {
    return await this.itemsService.findAllForPlayer(playerId);
  }

  @Roles('admin', 'user')
  @Get(':itemId')
  async findOne(
    @Param('playerId') playerId: number,
    @Param('itemId') itemId: number,
  ) {
    return await this.itemsService.findOneForPlayer(playerId, itemId);
  }

  @Roles('admin')
  @Post(':itemTypeId')
  async add(
    @Param('playerId') playerId: number,
    @Param('itemTypeId') itemTypeId: number,
  ) {
    return await this.itemsService.addForPlayer(playerId, itemTypeId);
  }

  @Roles('admin')
  @Put(':itemId')
  async update(
    @Param('playerId') playerId: number,
    @Param('itemId') itemId: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemsService.updateForPlayer(
      playerId,
      itemId,
      updateItemDto,
    );
  }

  @Roles('admin', 'user')
  @Delete(':itemId')
  async delete(
    @Param('playerId') playerId: number,
    @Param('itemId') itemId: number,
    @CurrentUser() user: UserDto,
  ) {
    return await this.itemsService.deleteFromPlayer(playerId, itemId, user);
  }
}

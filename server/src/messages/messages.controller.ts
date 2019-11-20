import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { SendMessageDto } from './dto/send-message.dto';
import { MessagesService } from './messages.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('players/:playerId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Roles('admin', 'user')
  @Get('inbox')
  async findAllRecieved(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
  ) {
    return await this.messagesService.findAllRecieved(user, playerId);
  }

  @Roles('admin', 'user')
  @Get('inbox/:messageId')
  async findOneRecieved(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    return await this.messagesService.findOneRecieved(
      user,
      playerId,
      messageId,
    );
  }
  @Roles('admin', 'user')
  @Get('outbox')
  async findAllSent(@CurrentUser() user, @Param('playerId') playerId: number) {
    return await this.messagesService.findAllSent(user, playerId);
  }

  @Roles('admin', 'user')
  @Get('outbox/:messageId')
  async findOneSent(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    return await this.messagesService.findOneSent(user, playerId, messageId);
  }

  @Roles('admin', 'user')
  @Post()
  async send(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return await this.messagesService.send(user, playerId, sendMessageDto);
  }

  // @Roles('admin', 'user')
  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return await this.messagesService.delete(id);
  // }

  // @Roles('admin', 'user')
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateLocationDto: UpdateLocationDto,
  // ) {
  //   return await this.messagesService.update(id, updateLocationDto);
  // }
}

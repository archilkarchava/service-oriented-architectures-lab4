import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { MessageDto } from './dto/message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MessagesService } from './messages.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('players/:playerId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Roles('admin', 'user')
  @Get('inbox')
  async findAllReceived(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
  ) {
    const messages = await this.messagesService.findAllReceived(user, playerId);
    const messageDtos: MessageDto[] = [];
    for (const message of messages) {
      messageDtos.push(new MessageDto(message));
    }
    return messageDtos;
  }

  @Roles('admin', 'user')
  @Get('inbox/:messageId')
  async findOneReceived(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    const message = await this.messagesService.findOneReceived(
      user,
      playerId,
      messageId,
    );
    return message && new MessageDto(message);
  }
  @Roles('admin', 'user')
  @Get('outbox')
  async findAllSent(@CurrentUser() user, @Param('playerId') playerId: number) {
    const messages = await this.messagesService.findAllSent(user, playerId);
    const messageDtos: MessageDto[] = [];
    for (const message of messages) {
      messageDtos.push(new MessageDto(message));
    }
    return messageDtos;
  }

  @Roles('admin', 'user')
  @Get('outbox/:messageId')
  async findOneSent(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    const message = await this.messagesService.findOneSent(
      user,
      playerId,
      messageId,
    );
    return message && new MessageDto(message);
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

  @Roles('admin', 'user')
  @Delete('inbox/:messageId')
  async deleteReceived(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    return await this.messagesService.deleteReceived(user, playerId, messageId);
  }

  @Roles('admin', 'user')
  @Delete('outbox/:messageId')
  async deleteSent(
    @CurrentUser() user,
    @Param('playerId') playerId: number,
    @Param('messageId') messageId: number,
  ) {
    return await this.messagesService.deleteSent(user, playerId, messageId);
  }

  // @Roles('admin', 'user')
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateLocationDto: UpdateLocationDto,
  // ) {
  //   return await this.messagesService.update(id, updateLocationDto);
  // }
}

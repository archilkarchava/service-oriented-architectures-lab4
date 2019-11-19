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
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { ItemTypesService } from './item-types.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('item-types')
export class ItemTypesController {
  constructor(private readonly itemTypesService: ItemTypesService) {}

  @Roles('admin', 'user')
  @Get()
  async findAll() {
    return await this.itemTypesService.findAll();
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.itemTypesService.findOne(id);
  }

  @Roles('admin')
  @Post()
  async create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return await this.itemTypesService.create(createItemTypeDto);
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateItemTypeDto,
  ) {
    return await this.itemTypesService.update(id, updateLocationDto);
  }

  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.itemTypesService.delete(id);
  }
}

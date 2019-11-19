import { ItemEntity } from '../../items/entities/item.entity';
import { UserDto } from '../../users/dto/user.dto';
import { PlayerEntity } from '../entities/player.entity';

export class PlayerDto {
  constructor(playerEntity: PlayerEntity) {
    this.id = playerEntity.id;
    this.name = playerEntity.name;
    this.playerClass = playerEntity.playerClass;
    this.level = playerEntity.level;
    this.items = playerEntity.items;
    this.user = playerEntity.user && new UserDto(playerEntity.user);
  }
  readonly id: number;

  // @IsNotEmpty()
  // @IsString()
  readonly name: string;

  // @Matches(/\bKnight\b|\bWizard\b|\bThief\b|\bPaladin\b/)
  readonly playerClass: 'Knight' | 'Wizard' | 'Thief' | 'Paladin';

  // @IsInt()
  readonly level: number;

  // @IsArray()
  readonly items: ItemEntity[];

  readonly user: UserDto;
}

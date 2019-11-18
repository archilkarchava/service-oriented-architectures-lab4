import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemEntity } from '../../items/entities/item.entity';
import { LocationEntity } from '../../locations/entities/location.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  playerClass: 'Knight' | 'Wizard' | 'Thief' | 'Paladin';

  @Column()
  level: number;

  @ManyToOne(
    type => LocationEntity,
    location => location.players,
  )
  position: LocationEntity;

  @OneToMany(
    type => ItemEntity,
    item => item.owner,
  )
  items: ItemEntity[];

  @ManyToOne(
    type => UserEntity,
    user => user.characters,
  )
  user: UserEntity;

  @OneToMany(
    type => MessageEntity,
    message => message.playerFrom,
  )
  outbox: MessageEntity[];

  @OneToMany(
    type => MessageEntity,
    message => message.playerTo,
  )
  inbox: MessageEntity[];
}

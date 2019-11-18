import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemTypeEntity } from '../../item-types/entities/item-type.entity';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => ItemTypeEntity,
    itemType => itemType.items,
  )
  itemType: ItemTypeEntity;

  @Column()
  quality: number;

  @ManyToOne(
    type => PlayerEntity,
    player => player.items,
  )
  owner: PlayerEntity;
}

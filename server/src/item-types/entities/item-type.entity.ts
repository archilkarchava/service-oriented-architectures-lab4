import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemEntity } from '../../items/entities/item.entity';

@Entity()
export class ItemTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => ItemEntity,
    item => item.itemType,
  )
  items: ItemEntity[];
}

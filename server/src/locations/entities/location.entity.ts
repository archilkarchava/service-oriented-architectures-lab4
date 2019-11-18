import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity()
export class LocationEntity {
  @PrimaryColumn({ length: 10 })
  locationId: string;

  @Column()
  description: string;

  @Column()
  locationType: 'Forest' | 'Desert' | 'Dungeon' | 'River' | 'Ocean';

  @OneToMany(
    type => PlayerEntity,
    player => player.position,
  )
  players: PlayerEntity[];
}

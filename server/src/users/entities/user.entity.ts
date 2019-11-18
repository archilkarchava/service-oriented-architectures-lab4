import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    type => PlayerEntity,
    player => player.user,
  )
  characters: PlayerEntity[];
}

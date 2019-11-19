import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: string[];

  @OneToMany(
    type => PlayerEntity,
    player => player.user,
  )
  characters: PlayerEntity[];
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  messageId: number;

  @ManyToOne(
    type => PlayerEntity,
    player => player.outbox,
  )
  playerFrom: PlayerEntity;

  @ManyToOne(
    type => PlayerEntity,
    player => player.inbox,
  )
  playerTo: PlayerEntity;

  @Column({ length: 1000 })
  messageText: string;

  @Column({ default: false })
  deletedBySender: boolean;

  @Column({ default: false })
  deletedByReceiver: boolean;
}

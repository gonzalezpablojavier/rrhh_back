import { Timestamp } from 'rxjs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  colaboradorID: number;

  @Column()
  mood: string;
}

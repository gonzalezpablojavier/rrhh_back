import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FeedBack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colaboradorID: number;

  
  @Column()
  colaboradorIDDestino: number;

  @Column()
  normaID: number;

  @Column({
    type: 'enum',
    enum: ['felicitacion', 'revision'],
  })
  tipo: 'felicitacion' | 'revision';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  mesAnio: string; // Nuevo campo para registrar el mes y año (formato: 'YYYY-MM')
}
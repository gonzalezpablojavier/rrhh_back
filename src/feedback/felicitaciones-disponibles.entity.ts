import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FelicitacionesDisponibles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colaboradorID: number;

  @Column()
  mesAnio: string;

  @Column()
  disponibles: number;
}

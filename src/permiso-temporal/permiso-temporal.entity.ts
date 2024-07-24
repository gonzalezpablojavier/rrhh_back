import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PermisoTemporal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaPermiso: string;

  @Column()
  colaboradorCubre: string;

  @Column()
  motivo: string;

  @Column()
  observacion: string;

  @Column()
  horario: string;

  @Column()
  autorizado: string;

  @Column()
  colaboradorID: number;

  @Column()
  date: Date;

  @Column()
  area: string;
}

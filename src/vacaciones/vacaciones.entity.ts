import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Vacaciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaPermisoDesde: string;

  @Column()
  fechaPermisoHasta: string;

  @Column()
  colaboradorCubre: string;

  @Column()
  motivo: string;

  @Column()
  observacion: string;

  @Column()
  autorizado: string;

  @Column()
  colaboradorID: number;

  @Column()
  vacacionesPendientes: number;
  @Column()
  diasCorresponden : number;
  @Column()
  diasDisponibles : number;

  @Column()
  date: Date;

  @Column()
  area: string;
}
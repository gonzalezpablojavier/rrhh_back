import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  colaboradorID: number;

  @Column()
  nombreUsuario: string;

  @Column()
  password: string;

  // Otros campos necesarios
}

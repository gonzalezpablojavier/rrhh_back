import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';

@Entity()
export class Presentismo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colaboradorID: number;

  @Column()
  tipo: string;  // 'entrada' o 'salida'

  @Column()
  horaRegistro: Date;

  @ManyToOne(() => UsuariosRegistrados, (usuario) => usuario.presentismos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colaboradorID', referencedColumnName: 'colaboradorID' })
  colaborador: UsuariosRegistrados;
}

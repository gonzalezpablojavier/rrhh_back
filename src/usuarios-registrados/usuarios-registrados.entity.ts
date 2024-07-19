import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Colaborador } from '../colaborador/colaborador.entity'; // Ajusta esta importación según tu entidad de usuario

@Entity()
export class UsuariosRegistrados {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fechaNacimiento: string;

  @Column()
  miFamilia: string;

  @Column()
  direccion: string;

  @Column()
  localidad: string;

  @Column()
  sucursal: string;

  @Column()
  area: string;

  @Column()
  cuil: string;

  @Column()
  foto: string;

  @Column()
  pass: string;

  @Column()
  email: string;

   
  @Column()
  colaboradorID: number; // Asegúrate de que este campo esté definido
}

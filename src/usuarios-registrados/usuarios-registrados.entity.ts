import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany  } from 'typeorm';
import { Colaborador } from '../colaborador/colaborador.entity'; // Ajusta esta importación según tu entidad de usuario
import { Mood } from '../mood/mood.entity';
import { Presentismo } from '../presentismo/presentismo.entity';

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

  @Column({ unique: true })
  colaboradorID: number; // Asegúrate de que este campo esté definido

  @OneToMany(() => Mood, (mood) => mood.colaboradorID)
  moods: Mood[];

  
  @OneToMany(() => Presentismo, (presentismo) => presentismo.colaboradorID)
  presentismos: Presentismo[];
}

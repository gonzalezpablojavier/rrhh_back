import { Timestamp } from 'rxjs';
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn } from 'typeorm';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';
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


  @ManyToOne(() => UsuariosRegistrados, (usuario) => usuario.moods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'colaboradorID', referencedColumnName: 'colaboradorID' })
  colaborador: UsuariosRegistrados;
  


}

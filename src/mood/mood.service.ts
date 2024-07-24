import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Mood } from './mood.entity';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood)
    private moodRepository: Repository<Mood>,
    @InjectRepository(UsuariosRegistrados)
    private usuarioRepository: Repository<UsuariosRegistrados>,
  ) {}

  async create(moodData: Partial<Mood>): Promise<Mood> {
    const { colaboradorID } = moodData;

    // Verificar si el colaboradorID existe en la tabla usuarios_registrados
    const usuario = await this.usuarioRepository.findOne({ where: { colaboradorID } });
    if (!usuario) {
      throw new BadRequestException('El colaboradorID no existe');
    }

    const newMood = this.moodRepository.create(moodData);
    return this.moodRepository.save(newMood);
  }

  findAll(): Promise<Mood[]> {
    return this.moodRepository.find();
  }
 
  async hasMoodInLastHours(colaboradorID: number, hours: number): Promise<boolean> {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - hours * 60 * 60 * 1000); // Restar las horas en milisegundos

    const recentMood = await this.moodRepository.findOne({
      where: {
        colaboradorID,
        date: MoreThan(pastDate),
      },
    });

    return !!recentMood; // Devuelve true si existe un registro, de lo contrario false
  }

  async findLastByColaboradorID(colaboradorID: number): Promise<Mood> {
    return this.moodRepository.findOne({
      where: { colaboradorID },
      order: { date: 'DESC' },
    });
  }

}

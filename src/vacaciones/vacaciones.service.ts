import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacaciones } from './vacaciones.entity';

@Injectable()
export class VacacionesService {
  constructor(
    @InjectRepository(Vacaciones)
    private vacacionesRepository: Repository<Vacaciones>,
  ) {}

  async create(data: Partial<Vacaciones>): Promise<Vacaciones> {
    const existingVacaciones = await this.vacacionesRepository.findOne({
      where: { colaboradorID: data.colaboradorID, autorizado: 'Evaluando' },
    });

    if (existingVacaciones) {
      throw new Error('Ya tienes una solicitud de vacaciones en estado Evaluando.');
    }

    const newVacaciones = this.vacacionesRepository.create(data);
    return this.vacacionesRepository.save(newVacaciones);
  }

  findAll(): Promise<Vacaciones[]> {
    return this.vacacionesRepository.find();
  }

  findOne(id: number): Promise<Vacaciones> {
    return this.vacacionesRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Vacaciones>): Promise<Vacaciones> {
    await this.vacacionesRepository.update(id, data);
    return this.findOne(id);
  }

  async getLatestByColaboradorID(colaboradorID: number): Promise<Vacaciones | undefined> {
    return await this.vacacionesRepository.findOne({
      where: { colaboradorID },
      order: { id: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    await this.vacacionesRepository.delete(id);
  }

  async deleteLastEvaluatingVacaciones(colaboradorID: number): Promise<boolean> {
    const lastVacaciones = await this.vacacionesRepository.findOne({
      where: { 
        colaboradorID: colaboradorID, 
        autorizado: 'Evaluando' 
      },
      order: { date: 'DESC' }
    });

    if (lastVacaciones) {
      await this.vacacionesRepository.remove(lastVacaciones);
      return true;
    }

    return false;
  }
}
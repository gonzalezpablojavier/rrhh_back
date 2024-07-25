import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoTemporal } from './permiso-temporal.entity';

@Injectable()
export class PermisoTemporalService {
  constructor(
    @InjectRepository(PermisoTemporal)
    private permisoTemporalRepository: Repository<PermisoTemporal>,
  ) {}

  async create(data: Partial<PermisoTemporal>): Promise<PermisoTemporal> {
    // Verificar si existe un permiso en estado "Evaluando" para el mismo colaborador
    const existingPermiso = await this.permisoTemporalRepository.findOne({
      where: { colaboradorID: data.colaboradorID, autorizado: 'Evaluando' },
    });

    if (existingPermiso) {
      throw new Error('Ya tienes un permiso en estado Evaluando.');
    }

    const newPermiso = this.permisoTemporalRepository.create(data);
    return this.permisoTemporalRepository.save(newPermiso);
  }

  findAll(): Promise<PermisoTemporal[]> {
    return this.permisoTemporalRepository.find();
  }

  findOne(id: number): Promise<PermisoTemporal> {
    return this.permisoTemporalRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<PermisoTemporal>): Promise<PermisoTemporal> {
    await this.permisoTemporalRepository.update(id, data);
    return this.findOne(id);
  }

  async getLatestByColaboradorID(colaboradorID: number): Promise<PermisoTemporal | undefined> {
    return await this.permisoTemporalRepository.findOne({
      where: { colaboradorID },
      order: { date: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    await this.permisoTemporalRepository.delete(id);
  }
}

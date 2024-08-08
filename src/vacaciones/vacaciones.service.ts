import { Injectable,Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Vacaciones } from './vacaciones.entity';

@Injectable()
export class VacacionesService {

  private readonly logger = new Logger(VacacionesService.name);


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

  async verificarDisponibilidad(
    fechaDesde: string,
    fechaHasta: string,
    area: string,
    colaboradorID: number
  ): Promise<boolean> {
    this.logger.log(`Verificando disponibilidad en base de datos: ${fechaDesde} - ${fechaHasta}, área: ${area}, colaboradorID: ${colaboradorID}`);

    const vacacionesSolapadas = await this.vacacionesRepository.find({
      where: [
        {
          area,
          autorizado: 'Aprobado',
          fechaPermisoDesde: LessThanOrEqual(fechaHasta),
          fechaPermisoHasta: MoreThanOrEqual(fechaDesde),
        },
        {
          area,
          autorizado: 'Evaluando',
          fechaPermisoDesde: LessThanOrEqual(fechaHasta),
          fechaPermisoHasta: MoreThanOrEqual(fechaDesde),
        },
      ],
    });

    this.logger.log(`Vacaciones solapadas encontradas: ${vacacionesSolapadas.length}`);

    // Excluir las vacaciones del colaborador actual si están en estado 'Evaluando'
    const vacacionesSolapadasFiltradas = vacacionesSolapadas.filter(
      (v) => !(v.colaboradorID === colaboradorID && v.autorizado === 'Evaluando')
    );

    this.logger.log(`Vacaciones solapadas después de filtrar: ${vacacionesSolapadasFiltradas.length}`);

    return vacacionesSolapadasFiltradas.length === 0;
  }
}
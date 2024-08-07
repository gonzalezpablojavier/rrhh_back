import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedBack } from './feedback.entity';
import { FelicitacionesDisponibles } from './felicitaciones-disponibles.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(FeedBack)
    private feedbackRepository: Repository<FeedBack>,
    @InjectRepository(FelicitacionesDisponibles)
    private felicitacionesDisponiblesRepository: Repository<FelicitacionesDisponibles>,

  ) {}

  async create(data: Partial<FeedBack>): Promise<FeedBack> {
    if (data.tipo === 'felicitacion'||data.tipo === 'revision') {
      const mesAnio = new Date().toISOString().slice(0, 7); // Formato 'YYYY-MM'
      data.mesAnio = mesAnio;

      const disponibles = await this.getFelicitacionesDisponibles(data.colaboradorID, mesAnio);
      if (disponibles <= 0) {
        throw new HttpException('No tienes felicitaciones disponibles este mes', HttpStatus.BAD_REQUEST);
      }

      await this.actualizarFelicitacionesDisponibles(data.colaboradorID, mesAnio);
    }


    const newFeedback = this.feedbackRepository.create(data);
    return this.feedbackRepository.save(newFeedback);
  }

  findAll(): Promise<FeedBack[]> {
    return this.feedbackRepository.find();
  }

  findOne(id: number): Promise<FeedBack> {
    return this.feedbackRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<FeedBack>): Promise<FeedBack> {
    await this.feedbackRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }


  private async getFelicitacionesDisponibles(colaboradorID: number, mesAnio: string): Promise<number> {
    let registro = await this.felicitacionesDisponiblesRepository.findOne({
      where: { colaboradorID, mesAnio }
    });

    if (!registro) {
      registro = this.felicitacionesDisponiblesRepository.create({
        colaboradorID,
        mesAnio,
        disponibles: 30
      });
      await this.felicitacionesDisponiblesRepository.save(registro);
    }

    return registro.disponibles;
  }

  private async actualizarFelicitacionesDisponibles(colaboradorID: number, mesAnio: string): Promise<void> {
    await this.felicitacionesDisponiblesRepository.decrement(
      { colaboradorID, mesAnio },
      'disponibles',
      1
    );
  }

  async getFelicitacionesDisponiblesActuales(colaboradorID: number): Promise<number> {
    const mesAnio = new Date().toISOString().slice(0, 7);
    return this.getFelicitacionesDisponibles(colaboradorID, mesAnio);
  }
}
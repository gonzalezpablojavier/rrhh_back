import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presentismo } from './presentismo.entity';

@Injectable()
export class PresentismoService {
  constructor(
    @InjectRepository(Presentismo)
    private presentismoRepository: Repository<Presentismo>,
  ) {}

  create(data: Partial<Presentismo>): Promise<Presentismo> {
    const newRecord = this.presentismoRepository.create(data);
    return this.presentismoRepository.save(newRecord);
  }

  findAll(): Promise<Presentismo[]> {
    return this.presentismoRepository.find();
  }

  findByColaboradorID(colaboradorID: number): Promise<Presentismo[]> {
    return this.presentismoRepository.find({ where: { colaboradorID } });
  }

  findOne(id: number): Promise<Presentismo> {
    return this.presentismoRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Presentismo>): Promise<Presentismo> {
    await this.presentismoRepository.update(id, data);
    const updatedRecord = await this.findOne(id);
    if (!updatedRecord) {
      throw new NotFoundException('Registro no encontrado');
    }
    return updatedRecord;
  }

  async remove(id: number): Promise<void> {
    const result = await this.presentismoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Registro no encontrado');
    }
  }

  async findLastByColaboradorID(colaboradorID: number): Promise<Presentismo> {
    return this.presentismoRepository.findOne({
      where: { colaboradorID },
      order: { horaRegistro: 'DESC' },
    });
  }
}

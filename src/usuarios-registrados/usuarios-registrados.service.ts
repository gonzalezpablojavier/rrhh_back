import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosRegistrados } from './usuarios-registrados.entity';

@Injectable()
export class UsuariosRegistradosService {
  constructor(
    @InjectRepository(UsuariosRegistrados)
    private usuariosRegistradosRepository: Repository<UsuariosRegistrados>,
  ) {}

  async createIfNotExists(data: Partial<UsuariosRegistrados>): Promise<UsuariosRegistrados> {
    let user = await this.usuariosRegistradosRepository.findOne({ where: { colaboradorID: data.colaboradorID } });
    if (user) {
      return user;
    }
    user = this.usuariosRegistradosRepository.create(data);
    return this.usuariosRegistradosRepository.save(user);
  }

  create(data: Partial<UsuariosRegistrados>): Promise<UsuariosRegistrados> {
    const newUser = this.usuariosRegistradosRepository.create(data);
    return this.usuariosRegistradosRepository.save(newUser);
  }

  findAll(): Promise<UsuariosRegistrados[]> {
    return this.usuariosRegistradosRepository.find();
  }

  findOneByColaboradorID(colaboradorID: number): Promise<UsuariosRegistrados> {
    return this.usuariosRegistradosRepository.findOne({ where: { colaboradorID } });
  }

  async updateByColaboradorID(colaboradorID: number, data: Partial<UsuariosRegistrados>): Promise<UsuariosRegistrados> {
    await this.usuariosRegistradosRepository.update({ colaboradorID }, data);
    return this.findOneByColaboradorID(colaboradorID);
  }

  async removeByColaboradorID(colaboradorID: number): Promise<void> {
    await this.usuariosRegistradosRepository.delete({ colaboradorID });
  }
}

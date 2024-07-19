import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosRegistrados } from './usuarios-registrados.entity';
import { UsuariosRegistradosService } from './usuarios-registrados.service';
import { UsuariosRegistradosController } from './usuarios-registrados.controller';
import { Colaborador } from '../colaborador/colaborador.entity'; // Ajusta esta importación según tu entidad de usuario

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosRegistrados, Colaborador])],
  providers: [UsuariosRegistradosService],
  controllers: [UsuariosRegistradosController],
})
export class UsuariosRegistradosModule {}

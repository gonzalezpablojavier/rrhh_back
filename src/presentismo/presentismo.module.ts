import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentismo } from './presentismo.entity';
import { PresentismoService } from './presentismo.service';
import { PresentismoController } from './presentismo.controller';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presentismo, UsuariosRegistrados]),
  ],
  providers: [PresentismoService],
  controllers: [PresentismoController],
})
export class PresentismoModule {}

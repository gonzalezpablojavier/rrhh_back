import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacaciones } from './vacaciones.entity';
import { VacacionesService } from './vacaciones.service';
import { VacacionesController } from './vacaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacaciones])],
  providers: [VacacionesService],
  controllers: [VacacionesController],
})
export class VacacionesModule {}
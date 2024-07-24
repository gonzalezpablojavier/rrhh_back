import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoTemporal } from './permiso-temporal.entity';
import { PermisoTemporalService } from './permiso-temporal.service';
import { PermisoTemporalController } from './permiso-temporal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermisoTemporal])],
  providers: [PermisoTemporalService],
  controllers: [PermisoTemporalController],
})
export class PermisoTemporalModule {}

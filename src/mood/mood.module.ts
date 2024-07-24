import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { Mood } from './mood.entity';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';
import { UsuariosRegistradosModule } from '../usuarios-registrados/usuarios-registrados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mood, UsuariosRegistrados]),
    UsuariosRegistradosModule,  // Asegúrate de importar el módulo aquí
  ],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}

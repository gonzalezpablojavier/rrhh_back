import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodModule } from './mood/mood.module';
import { AuthModule } from './auth/auth.module';
import { Colaborador } from './colaborador/colaborador.entity';
import { UsuariosRegistradosModule } from './usuarios-registrados/usuarios-registrados.module';
import { UsuariosRegistrados } from './usuarios-registrados/usuarios-registrados.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'elated-kowalevski.51-222-158-198.plesk.page',
      port: 3306,
      username: 'rrhh',
      password: 'Integracion123**',
      database: 'admin_rrhh',
      entities: [Colaborador,UsuariosRegistrados],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MoodModule,
    AuthModule,
    UsuariosRegistradosModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodModule } from './mood/mood.module';
import { AuthModule } from './auth/auth.module';
import { Colaborador } from './colaborador/colaborador.entity';
import { UsuariosRegistradosModule } from './usuarios-registrados/usuarios-registrados.module';
import { UsuariosRegistrados } from './usuarios-registrados/usuarios-registrados.entity';
import { PermisoTemporalModule } from './permiso-temporal/permiso-temporal.module';
import { PermisoTemporal } from './permiso-temporal/permiso-temporal.entity';
import { PresentismoModule } from './presentismo/presentismo.module';
import { Presentismo } from './presentismo/presentismo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'elated-kowalevski.51-222-158-198.plesk.page',
      port: 3306,
      username: 'rrhh',
      password: 'Integracion123**',
      database: 'admin_rrhh',
      entities: [Colaborador,UsuariosRegistrados,PermisoTemporal,Presentismo],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Carpeta temporal para guardar los archivos
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),





    MoodModule,
    AuthModule,
    UsuariosRegistradosModule,
    PermisoTemporalModule,
    PresentismoModule,
  ],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Leer orígenes permitidos desde las variables de entorno

 // Habilitar CORS
 app.enableCors({
 origin: 'https://rrhh-distrisuper.vercel.app', // Permitir solicitudes desde cualquier origen https://rrhh-distrisuper.vercel.app
// origin:'http://localhost:3001', 
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:true,
 
});

  // Configurar global pipes para validación (opcional)
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

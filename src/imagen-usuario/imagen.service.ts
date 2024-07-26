// imagen.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosRegistrados } from '../usuarios-registrados/usuarios-registrados.entity';


@Injectable()
export class ImagenService {
  constructor(
    @InjectRepository(UsuariosRegistrados)
    private usuarioRepository: Repository<UsuariosRegistrados>,
  ) {}

  async uploadImage(file: Express.Multer.File, colaboradorID: string): Promise<string> {
    // Aquí iría la lógica para guardar el archivo
    // Por ejemplo, podrías usar el paquete 'fs' para guardarlo localmente
    // o un servicio de almacenamiento en la nube como AWS S3
    const imageUrl = `http://tudominio.com/images/${file.filename}`;  // Ejemplo

    // Actualiza la URL de la imagen en la base de datos
    await this.usuarioRepository.update(colaboradorID, { foto: imageUrl });

    return imageUrl;
  }
}
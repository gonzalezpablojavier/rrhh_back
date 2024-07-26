import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosRegistrados } from './usuarios-registrados.entity';
import * as ftp from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosRegistradosService {
  private readonly logger = new Logger(UsuariosRegistradosService.name);

  constructor(
    @InjectRepository(UsuariosRegistrados)
    private usuariosRegistradosRepository: Repository<UsuariosRegistrados>,
    private configService: ConfigService
  ) {}

  async createOrUpdateUsuario(data: Partial<UsuariosRegistrados>, filename: string) {
    let existingUsuario = await this.usuariosRegistradosRepository.findOne({ where: { colaboradorID: data.colaboradorID } });
    if (existingUsuario) {
      Object.assign(existingUsuario, data, { foto: filename });
    } else {
      existingUsuario = this.usuariosRegistradosRepository.create({ ...data, foto: filename });
    }
    return this.usuariosRegistradosRepository.save(existingUsuario);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.originalname) {
      throw new Error('El archivo o el nombre del archivo no está definido');
    }

    const filename = file.originalname;
    await this.uploadFileToFTP(file);

    const imageDomain = this.configService.get<string>('IMAGE_DOMAIN');
    return `${imageDomain}/remote/path/${filename}`;
  }
 
  private async uploadFileToFTP(file: Express.Multer.File): Promise<void> {
    this.logger.log('Iniciando uploadFileToFTP con file:', file.originalname);
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    const filename = file.originalname;
    const localFilePath = path.join(__dirname, '../../uploads', filename);
    this.logger.log('Ruta local del archivo:', localFilePath);
    
    const remoteDirPath = `/public_html/remote/path/`;
    const remoteFilePath = `${remoteDirPath}${filename}`;
    this.logger.log('Ruta remota del archivo:', remoteFilePath);
    
    try {
      await fs.promises.writeFile(localFilePath, file.buffer);
      
      this.logger.log('Intentando conexión FTP');
      await client.access({
        host: this.configService.get<string>('FTP_HOST'),
        user: this.configService.get<string>('FTP_USER'),
        password: this.configService.get<string>('FTP_PASSWORD'),
        secure: false,
      });
      this.logger.log('Conexión FTP exitosa');
      
      await client.ensureDir(remoteDirPath);
      
      await client.uploadFrom(localFilePath, remoteFilePath);
      this.logger.log('Archivo cargado exitosamente');
      
      await fs.promises.unlink(localFilePath);
      this.logger.log('Archivo local eliminado');
    } catch (error) {
      this.logger.error('Error al cargar el archivo al FTP:', error);
      throw error;
    } finally {
      client.close();
      this.logger.log('Conexión FTP cerrada');
    }
  }
  
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
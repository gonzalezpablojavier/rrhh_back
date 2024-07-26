import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsuariosRegistradosService } from './usuarios-registrados.service';
import { UsuariosRegistrados } from './usuarios-registrados.entity';
import { FileInterceptor } from '@nestjs/platform-express';
// Importa el tipo de archivo de Multer
import { Express } from 'express';



@Controller('usuarios-registrados')
export class UsuariosRegistradosController {
  constructor(private readonly usuariosRegistradosService: UsuariosRegistradosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('foto'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() userData: Partial<UsuariosRegistrados>) {
    try {
      console.log('Iniciando carga de archivo:', file?.originalname);
      
      if (!file) {
        throw new HttpException('No se proporcionó ningún archivo', HttpStatus.BAD_REQUEST);
      }
  
      const imageUrl = await this.usuariosRegistradosService.uploadImage(file);
      console.log('Imagen subida exitosamente:', imageUrl);
  
      const usuario = await this.usuariosRegistradosService.createOrUpdateUsuario(userData, file.originalname);
      console.log('Usuario creado/actualizado:', usuario);
  
      return { 
        ok: 1,
        message: 'Archivo subido y usuario actualizado exitosamente',
        data: { ...usuario, fotoUrl: imageUrl }
      };
    } catch (error) {
      console.error('Error en uploadFile:', error);
      throw new HttpException({
        ok: 0,
        message: 'Error al procesar la solicitud',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('create-if-not-exists')
  async createIfNotExists(@Body() data: Partial<UsuariosRegistrados>) {
    try {
      const user = await this.usuariosRegistradosService.createIfNotExists(data);
      return { ok: 1, message: 'Usuario registrado exitosamente', data: user };
    } catch (error) {
      return { ok: 0, message: 'Error al registrar usuario', error: error.message };
    }
  }

  @Post()
  async create(@Body() data: Partial<UsuariosRegistrados>) {
    try {
      const user = await this.usuariosRegistradosService.create(data);
      return { ok: 1, message: 'Usuario creado exitosamente', data: user };
    } catch (error) {
      return { ok: 0, message: 'Error al crear usuario', error: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usuariosRegistradosService.findAll();
      return { ok: 1, message: 'Usuarios encontrados exitosamente', data: users };
    } catch (error) {
      return { ok: 0, message: 'Error al obtener usuarios', error: error.message };
    }
  }

  @Get(':colaboradorID')
  async findOneByColaboradorID(@Param('colaboradorID') colaboradorID: number) {
    try {
      const user = await this.usuariosRegistradosService.findOneByColaboradorID(colaboradorID);
      if (user) {
        return { ok: 1, message: 'Usuario encontrado', data: user };
      } else {
        return { ok: 0, message: 'Usuario no encontrado' };
      }
    } catch (error) {
      return { ok: 0, message: 'Error al obtener usuario', error: error.message };
    }
  }

  @Put(':colaboradorID')
  async updateByColaboradorID(@Param('colaboradorID') colaboradorID: number, @Body() data: Partial<UsuariosRegistrados>) {
    try {
      const user = await this.usuariosRegistradosService.updateByColaboradorID(colaboradorID, data);
      return { ok: 1, message: 'Usuario actualizado exitosamente', data: user };
    } catch (error) {
      return { ok: 0, message: 'Error al actualizar usuario', error: error.message };
    }
  }

  @Delete(':colaboradorID')
  async removeByColaboradorID(@Param('colaboradorID') colaboradorID: number) {
    try {
      await this.usuariosRegistradosService.removeByColaboradorID(colaboradorID);
      return { ok: 1, message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      return { ok: 0, message: 'Error al eliminar usuario', error: error.message };
    }
  }
}

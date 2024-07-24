import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { PermisoTemporalService } from './permiso-temporal.service';
import { PermisoTemporal } from './permiso-temporal.entity';

@Controller('permiso-temporal')
export class PermisoTemporalController {
  constructor(private readonly permisoTemporalService: PermisoTemporalService) {}

  @Post()
  async create(@Body() data: Partial<PermisoTemporal>): Promise<any> {
    try {
      const newPermiso = await this.permisoTemporalService.create(data);
      return { ok: 1, message: 'Permiso solicitado exitosamente', data: newPermiso };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Get()
  findAll(): Promise<PermisoTemporal[]> {
    return this.permisoTemporalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PermisoTemporal> {
    return this.permisoTemporalService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<PermisoTemporal>): Promise<any> {
    try {
      const updatedPermiso = await this.permisoTemporalService.update(id, data);
      return { ok: 1, message: 'Permiso actualizado exitosamente', data: updatedPermiso };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.permisoTemporalService.remove(id);
      return { ok: 1, message: 'Permiso eliminado exitosamente' };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }
}

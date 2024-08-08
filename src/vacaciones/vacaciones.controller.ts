import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus,Query,Logger   } from '@nestjs/common';
import { VacacionesService } from './vacaciones.service';
import { Vacaciones } from './vacaciones.entity';

@Controller('vacaciones')
export class VacacionesController {
  private readonly logger = new Logger(VacacionesController.name);
  constructor(private readonly vacacionesService: VacacionesService) {}

  @Get('verificar')
  async verificarDisponibilidad(
    @Query('fechaDesde') fechaDesde: string,
    @Query('fechaHasta') fechaHasta: string,
    @Query('area') area: string,
    @Query('colaboradorID') colaboradorID: number
  ): Promise<{ disponible: boolean }> {
    this.logger.log(`Verificando disponibilidad: ${fechaDesde} - ${fechaHasta}, área: ${area}, colaboradorID: ${colaboradorID}`);
    
    try {
      const disponible = await this.vacacionesService.verificarDisponibilidad(
        fechaDesde,
        fechaHasta,
        area,
        colaboradorID
      );
      this.logger.log(`Resultado de verificación: ${disponible}`);
      return { disponible };
    } catch (error) {
      this.logger.error(`Error al verificar disponibilidad: ${error.message}`);
      throw new HttpException({ disponible: false, error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() data: Partial<Vacaciones>): Promise<any> {
    try {
      const newVacaciones = await this.vacacionesService.create(data);
      return { ok: 1, message: 'Vacaciones solicitadas exitosamente', data: newVacaciones };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Get()
  findAll(): Promise<Vacaciones[]> {
    return this.vacacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vacaciones> {
    return this.vacacionesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Vacaciones>): Promise<any> {
    try {
      const updatedVacaciones = await this.vacacionesService.update(id, data);
      return { ok: 1, message: 'Vacaciones actualizadas exitosamente', data: updatedVacaciones };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.vacacionesService.remove(id);
      return { ok: 1, message: 'Vacaciones eliminadas exitosamente' };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Get('latest/:colaboradorID')
  async getLatestByColaboradorID(@Param('colaboradorID') colaboradorID: number) {
    return await this.vacacionesService.getLatestByColaboradorID(colaboradorID);
  }

  @Delete('delete-last-evaluating/:colaboradorID')
  async deleteLastEvaluatingVacaciones(@Param('colaboradorID') colaboradorID: number) {
    const deleted = await this.vacacionesService.deleteLastEvaluatingVacaciones(colaboradorID);
    if (deleted) {
      return { message: 'Última solicitud de vacaciones en evaluación eliminada con éxito' };
    } else {
      throw new HttpException('No se encontró una solicitud de vacaciones en evaluación para eliminar', HttpStatus.NOT_FOUND);
    }
  }


}
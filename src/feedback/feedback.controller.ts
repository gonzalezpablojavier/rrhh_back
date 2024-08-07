import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FeedBackService } from './feedback.service';
import { FeedBack } from './feedback.entity';

@Controller('feedback')
export class FeedBackController {
  constructor(private readonly feedbackService: FeedBackService) {}

  @Post()
  async create(@Body() data: Partial<FeedBack>): Promise<any> {
    try {
      const newFeedback = await this.feedbackService.create(data);
      return { ok: 1, message: 'Feedback creado exitosamente', data: newFeedback };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Get()
  findAll(): Promise<FeedBack[]> {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FeedBack> {
    return this.feedbackService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<FeedBack>): Promise<any> {
    try {
      const updatedFeedback = await this.feedbackService.update(id, data);
      return { ok: 1, message: 'Feedback actualizado exitosamente', data: updatedFeedback };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.feedbackService.remove(id);
      return { ok: 1, message: 'Feedback eliminado exitosamente' };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

  @Get('felicitaciones-disponibles/:colaboradorID')
  async getFelicitacionesDisponibles(@Param('colaboradorID') colaboradorID: number): Promise<any> {
    try {
      const disponibles = await this.feedbackService.getFelicitacionesDisponiblesActuales(colaboradorID);
      return { ok: 1, message: 'Felicitaciones disponibles obtenidas exitosamente', data: { disponibles } };
    } catch (error) {
      return { ok: 0, message: error.message };
    }
  }

}
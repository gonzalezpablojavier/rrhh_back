import { Controller, Get, Post, Body, Query, BadRequestException,Param } from '@nestjs/common';
import { MoodService } from './mood.service';
import { Mood } from './mood.entity';

@Controller('howareyou')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}



  @Get(':colaboradorID/last')
  async findLastByColaboradorID(@Param('colaboradorID') colaboradorID: number): Promise<any> {
    const mood = await this.moodService.findLastByColaboradorID(colaboradorID);
    if (mood) {
      return { ok: 1, message: 'Último estado de ánimo encontrado', data: mood };
    }
    return { ok: 0, message: 'No se encontró el último estado de ánimo' };
  }
  @Post()
  async create(@Body() moodData: Partial<Mood>): Promise<any> {
    const { colaboradorID } = moodData;
    if (!colaboradorID) {
      throw new BadRequestException('colaboradorID es requerido');
    }

    const hasMoodInLast4Hours = await this.moodService.hasMoodInLastHours(colaboradorID, 4);
    if (hasMoodInLast4Hours) {
      return { ok: 0, message: 'Ya has insertado un estado en las últimas 4 horas' };
    }

    const newMood = await this.moodService.create(moodData);
    return { ok: 1, message: 'Estado insertado exitosamente', data: newMood };
  }

  @Get()
  findAll(): Promise<Mood[]> {
    return this.moodService.findAll();
  }

  @Get('check')
  async checkMoodInLast4Hours(@Query('colaboradorID') colaboradorID: number): Promise<any> {
    if (!colaboradorID) {
      throw new BadRequestException('colaboradorID es requerido');
    }

    const hasMoodInLast4Hours = await this.moodService.hasMoodInLastHours(colaboradorID, 4);
    return {
      ok: hasMoodInLast4Hours ? 1 : 0,
      message: hasMoodInLast4Hours ? 'Ya has insertado un estado en las últimas 4 horas' : 'No has insertado un estado en las últimas 4 horas',
    };
  }
}

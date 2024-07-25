import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PresentismoService } from './presentismo.service';
import { Presentismo } from './presentismo.entity';

@Controller('presentismo')
export class PresentismoController {
  constructor(private readonly presentismoService: PresentismoService) {}

  @Post()
  create(@Body() data: Partial<Presentismo>): Promise<Presentismo> {
    return this.presentismoService.create(data);
  }

  @Get()
  findAll(): Promise<Presentismo[]> {
    return this.presentismoService.findAll();
  }

  @Get('colaborador/:colaboradorID')
  findByColaboradorID(@Param('colaboradorID') colaboradorID: number): Promise<Presentismo[]> {
    return this.presentismoService.findByColaboradorID(colaboradorID);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Presentismo> {
    return this.presentismoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Presentismo>): Promise<Presentismo> {
    return this.presentismoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.presentismoService.remove(id);
  }
}

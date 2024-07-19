import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoodService } from './mood.service';
import { Mood } from './mood.entity';

@Controller('howareyou')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  create(@Body() moodData: Partial<Mood>): Promise<Mood> {
    return this.moodService.create(moodData);
  }

  @Get()
  findAll(): Promise<Mood[]> {
    return this.moodService.findAll();
  }
}

// google-calendar.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Post('create-event')
  async createEvent(@Body() eventData: {
    summary: string;
    description: string;
    start: string;
    end: string;
    colaboradorId: number;
  }) {
    try {
      const result = await this.googleCalendarService.createEvent(eventData);
      return result;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras, por ejemplo:
      throw new Error('No se pudo crear el evento en el calendario');
    }
  }
}
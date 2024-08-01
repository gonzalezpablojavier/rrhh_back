// google-calendar.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleCalendarService {
  private auth: OAuth2Client;

  constructor() {
    this.auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
 }

  async createEvent(eventData: {
    summary: string;
    description: string;
    start: string;
    end: string;
  }) {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });

    const event = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: new Date(eventData.start).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires', // Ajusta esto a tu zona horaria
      },
      end: {
        dateTime: new Date(eventData.end).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires', // Ajusta esto a tu zona horaria
      },
    };

    try {
      const result = await calendar.events.insert({
        calendarId: 'primary', // Usa el ID del calendario específico si no es el primario
        requestBody: event,
      });

      return { message: 'Evento creado exitosamente', eventId: result.data.id };
    } catch (error) {
      console.error('Error al crear el evento en el calendario:', error);
      throw new Error('Error al crear el evento en el calendario');
    }
  }
}
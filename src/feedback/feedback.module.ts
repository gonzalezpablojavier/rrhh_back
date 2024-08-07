import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBack } from './feedback.entity';
import { FeedBackService } from './feedback.service';
import { FeedBackController } from './feedback.controller';
import { FelicitacionesDisponibles } from './felicitaciones-disponibles.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FeedBack,FelicitacionesDisponibles])],
  providers: [FeedBackService],
  controllers: [FeedBackController],
})
export class FeedBackModule {}
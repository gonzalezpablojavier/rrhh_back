import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { Mood } from './mood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}

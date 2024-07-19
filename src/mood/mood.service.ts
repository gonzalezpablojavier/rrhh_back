import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mood } from './mood.entity';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood)
    private moodRepository: Repository<Mood>,
  ) {}

  create(moodData: Partial<Mood>): Promise<Mood> {
    const newMood = this.moodRepository.create(moodData);
    return this.moodRepository.save(newMood);
  }

  findAll(): Promise<Mood[]> {
    return this.moodRepository.find();
  }
}

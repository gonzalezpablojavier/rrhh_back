import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedBack } from './feedback.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(FeedBack)
    private feedbackRepository: Repository<FeedBack>,
  ) {}

  async create(data: Partial<FeedBack>): Promise<FeedBack> {
    const newFeedback = this.feedbackRepository.create(data);
    return this.feedbackRepository.save(newFeedback);
  }

  findAll(): Promise<FeedBack[]> {
    return this.feedbackRepository.find();
  }

  findOne(id: number): Promise<FeedBack> {
    return this.feedbackRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<FeedBack>): Promise<FeedBack> {
    await this.feedbackRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }
}
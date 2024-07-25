import { Test, TestingModule } from '@nestjs/testing';
import { PresentismoService } from './presentismo.service';

describe('PresentismoService', () => {
  let service: PresentismoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentismoService],
    }).compile();

    service = module.get<PresentismoService>(PresentismoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PermisoTemporalService } from './permiso-temporal.service';

describe('PermisoTemporalService', () => {
  let service: PermisoTemporalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermisoTemporalService],
    }).compile();

    service = module.get<PermisoTemporalService>(PermisoTemporalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PermisoTemporalController } from './permiso-temporal.controller';

describe('PermisoTemporalController', () => {
  let controller: PermisoTemporalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermisoTemporalController],
    }).compile();

    controller = module.get<PermisoTemporalController>(PermisoTemporalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

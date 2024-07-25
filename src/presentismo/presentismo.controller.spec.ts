import { Test, TestingModule } from '@nestjs/testing';
import { PresentismoController } from './presentismo.controller';

describe('PresentismoController', () => {
  let controller: PresentismoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentismoController],
    }).compile();

    controller = module.get<PresentismoController>(PresentismoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

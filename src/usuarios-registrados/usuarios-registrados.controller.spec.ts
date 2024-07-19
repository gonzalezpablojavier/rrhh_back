import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosRegistradosController } from './usuarios-registrados.controller';

describe('UsuariosRegistradosController', () => {
  let controller: UsuariosRegistradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosRegistradosController],
    }).compile();

    controller = module.get<UsuariosRegistradosController>(UsuariosRegistradosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

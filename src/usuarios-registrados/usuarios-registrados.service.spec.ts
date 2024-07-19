import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosRegistradosService } from './usuarios-registrados.service';

describe('UsuariosRegistradosService', () => {
  let service: UsuariosRegistradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosRegistradosService],
    }).compile();

    service = module.get<UsuariosRegistradosService>(UsuariosRegistradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

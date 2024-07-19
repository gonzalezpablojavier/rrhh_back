import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Colaborador } from '../colaborador/colaborador.entity'; // Ajusta esta importación según tu entidad de usuario
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.colaboradorRepository.findOne({ where: { nombreUsuario: username } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.nombreUsuario, sub: user.colaboradorID };
    return {
      access_token: this.jwtService.sign(payload),
      colaboradorID: user.colaboradorID,
      nombreUsuario: user.nombreUsuario,
    };
  }
}

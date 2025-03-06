import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('nombreCompleto') nombreCompleto: string,
    @Body('email') email: string,
    @Body('telefono') telefono: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(nombreCompleto, email, telefono, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Get('profile')
  async getProfile(
    @Body('idUsuario') idUsuario: number,
  ) {
    return this.authService.getProfile(idUsuario);
  }
}

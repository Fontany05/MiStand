import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './interface/auth.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un emprendedor' })
  register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authservice.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion' })
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authservice.login(loginDto);
  }
}

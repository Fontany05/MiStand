import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './interface/auth.interface';
import { JwtGuard } from './guards/jwt.guard';
import type { RequestWithUser } from './interface/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authservice.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authservice.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Request() req: RequestWithUser) {
    return req.user;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interface/auth.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  //register
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { password, ...userData } = registerDto;

    const existingUser = await this.prisma.entrepreneur.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const entrepreneur = await this.prisma.entrepreneur.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const token = this.jwtService.sign({ id: entrepreneur.id });
    return {
      token,
      entrepreneur: {
        id: entrepreneur.id,
        name: entrepreneur.name,
        email: entrepreneur.email,
        standName: entrepreneur.standName,
      },
    };
  }
  //login
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const entrepreneur = await this.prisma.entrepreneur.findUnique({
      where: { email },
    });

    if (!entrepreneur) {
      throw new UnauthorizedException('invalid creedentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      entrepreneur.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: entrepreneur.id });

    return {
      token,
      entrepreneur: {
        id: entrepreneur.id,
        name: entrepreneur.name,
        email: entrepreneur.email,
        standName: entrepreneur.standName,
      },
    };
  }
}

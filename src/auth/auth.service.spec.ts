import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockPrismaService = {
  entrepreneur: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a new entrepreneur and return token', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);
      mockPrismaService.entrepreneur.create.mockResolvedValue({
        id: 'uuid-123',
        name: 'Ana García',
        email: 'ana@gmail.com',
        standName: 'Stand de Ana',
      });

      const result = await service.register({
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: '123456',
        standName: 'Stand de Ana',
        phone: '1234567890',
      });

      expect(result.token).toBe('mock-token');
      expect(result.entrepreneur.email).toBe('ana@gmail.com');
      expect(mockPrismaService.entrepreneur.findUnique).toHaveBeenCalledWith({
        where: { email: 'ana@gmail.com' },
      });
    });

    it('should throw BadRequestException if email already exists', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: 'uuid-123',
        email: 'ana@gmail.com',
      });

      await expect(
        service.register({
          name: 'Ana García',
          email: 'ana@gmail.com',
          password: '123456',
          standName: 'Stand de Ana',
          phone: '1234567890',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return token when credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);

      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: 'uuid-123',
        name: 'Ana García',
        email: 'ana@gmail.com',
        password: hashedPassword,
        standName: 'Stand de Ana',
      });

      const result = await service.login({
        email: 'ana@gmail.com',
        password: '123456',
      });

      expect(result.token).toBe('mock-token');
      expect(result.entrepreneur.email).toBe('ana@gmail.com');
    });

    it('should throw UnauthorizedException if email does not exist', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'noexiste@gmail.com',
          password: '123456',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);

      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: 'uuid-123',
        email: 'ana@gmail.com',
        password: hashedPassword,
      });

      await expect(
        service.login({
          email: 'ana@gmail.com',
          password: 'password-incorrecto',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

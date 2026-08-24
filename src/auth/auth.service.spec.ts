import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { createRegisterDto } from 'src/test/helpers/auth.helper';

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
      const dto = createRegisterDto();

      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);
      mockPrismaService.entrepreneur.create.mockResolvedValue({
        id: faker.string.uuid(),
        name: dto.name,
        email: dto.email,
        standName: dto.standName,
      });
      const result = await service.register(dto);

      expect(result.token).toBe('mock-token');
      expect(result.entrepreneur.email).toBe(dto.email);
      expect(mockPrismaService.entrepreneur.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });

    it('should throw BadRequestException if email already exists', async () => {
      const dto = createRegisterDto();
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: faker.string.uuid(),
        email: dto.email,
      });
      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    const dto = createRegisterDto();
    it('should return token when credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: faker.string.uuid(),
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        standName: dto.standName,
      });

      const result = await service.login({
        email: dto.email,
        password: dto.password,
      });

      expect(result.token).toBe('mock-token');
      expect(result.entrepreneur.email).toBe(dto.email);
    });

    it('should throw UnauthorizedException if email does not exist', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: faker.internet.email(),
          password: faker.internet.password({ length: 8 }),
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      mockPrismaService.entrepreneur.findUnique.mockResolvedValue({
        id: faker.string.uuid(),
        email: dto.email,
        password: hashedPassword,
      });

      await expect(
        service.login({
          email: dto.email,
          password: faker.internet.password({ length: 8 }),
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

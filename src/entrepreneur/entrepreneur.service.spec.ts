import { Test, TestingModule } from '@nestjs/testing';
import { EntrepreneurService } from './entrepreneur.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  entrepreneur: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockEntrepreneur = {
  id: 'uuid-123',
  name: 'Ana García',
  email: 'ana@gmail.com',
  standName: 'Stand de Ana',
  description: null,
  currentLocation: null,
  phone: '1234567890',
  createdAt: new Date(),
};

describe('EntrepreneurService', () => {
  let service: EntrepreneurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntrepreneurService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EntrepreneurService>(EntrepreneurService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return entrepreneur profile', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(
        mockEntrepreneur,
      );

      const result = await service.getProfile('uuid-123');

      expect(result).toEqual(mockEntrepreneur);
      expect(mockPrismaService.entrepreneur.findUnique).toHaveBeenCalled();
    });

    it('should throw NotFoundException if entrepreneur does not exist', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);

      await expect(service.getProfile('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProfile', () => {
    it('should delete entrepreneur and return message', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(
        mockEntrepreneur,
      );
      mockPrismaService.entrepreneur.delete.mockResolvedValue(mockEntrepreneur);

      const result = await service.deleteProfile('uuid-123');

      expect(result).toEqual({ message: 'Account deleted successfully' });
    });

    it('should throw NotFoundException if entrepreneur does not exist', async () => {
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(null);

      await expect(service.deleteProfile('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

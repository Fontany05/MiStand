import { Test, TestingModule } from '@nestjs/testing';
import { EntrepreneurService } from './entrepreneur.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { createMockEntrepreneur } from 'src/test/helpers/entrepreneur.helper';

const mockPrismaService = {
  entrepreneur: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
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
      const mockEntrepreneur = createMockEntrepreneur();
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(
        mockEntrepreneur,
      );

      const result = await service.getProfile(mockEntrepreneur.id);

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
      const mockEntrepreneur = createMockEntrepreneur();
      mockPrismaService.entrepreneur.findUnique.mockResolvedValue(
        mockEntrepreneur,
      );
      mockPrismaService.entrepreneur.delete.mockResolvedValue(mockEntrepreneur);

      const result = await service.deleteProfile(mockEntrepreneur.id);

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

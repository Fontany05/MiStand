import { Test, TestingModule } from '@nestjs/testing';
import { EntrepreneurService } from './entrepreneur.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
});

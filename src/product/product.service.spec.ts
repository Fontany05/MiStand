import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  product: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};

const mockProduct = {
  id: 'product-uuid-123',
  name: 'Taza artesanal',
  description: 'Taza hecha a mano',
  price: 1500,
  photo: 'https://ejemplo.com/taza.jpg',
  available: true,
  entrepreneurId: 'entrepreneur-uuid-123',
  createdAt: new Date(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      mockPrismaService.product.create.mockResolvedValue(mockProduct);

      const result = await service.createProduct('entrepreneur-uuid-123', {
        name: 'Taza artesanal',
        description: 'Taza hecha a mano',
        price: 1500,
        photo: 'https://ejemplo.com/taza.jpg',
      });

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.create).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.delete.mockResolvedValue(mockProduct);

      const result = await service.deleteProduct(
        'product-uuid-123',
        'entrepreneur-uuid-123',
      );

      expect(result).toEqual({ message: 'Product deleted successfully' });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(
        service.deleteProduct('uuid-invalido', 'entrepreneur-uuid-123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if product does not belong to entrepreneur', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue({
        ...mockProduct,
        entrepreneurId: 'otro-entrepreneur-uuid',
      });

      await expect(
        service.deleteProduct('product-uuid-123', 'entrepreneur-uuid-123'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

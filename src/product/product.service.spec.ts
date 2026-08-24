import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { createMockProduct } from '../test/helpers/product.helper';

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
      const mockProduct = createMockProduct();
      mockPrismaService.product.create.mockResolvedValue(mockProduct);

      const result = await service.createProduct(mockProduct.entrepreneurId, {
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        photo: mockProduct.photo,
      });

      expect(result).toEqual(mockProduct);
      expect(mockPrismaService.product.create).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const mockProduct = createMockProduct();
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.delete.mockResolvedValue(mockProduct);

      const result = await service.deleteProduct(
        mockProduct.id,
        mockProduct.entrepreneurId,
      );

      expect(result).toEqual({ message: 'Product deleted successfully' });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      const mockProduct = createMockProduct();
      await expect(
        service.deleteProduct(mockProduct.id, mockProduct.entrepreneurId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if product does not belong to entrepreneur', async () => {
      const mockProduct = createMockProduct();
      const otherEntrepreneurId = createMockProduct().entrepreneurId;

      mockPrismaService.product.findUnique.mockResolvedValue({
        ...mockProduct,
        entrepreneurId: otherEntrepreneurId,
      });

      await expect(
        service.deleteProduct(mockProduct.id, mockProduct.entrepreneurId),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

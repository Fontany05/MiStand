import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { createMockProduct } from '../test/helpers/product.helper';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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

const mockCloudinaryService = {
  uploadImage: jest.fn(),
  deleteImage: jest.fn(),
  extractPublicId: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should upload the photo and create a product', async () => {
      const mockProduct = createMockProduct();
      const file = { buffer: Buffer.from('fake-image') } as Express.Multer.File;

      mockCloudinaryService.uploadImage.mockResolvedValue({
        secure_url: mockProduct.photo,
      });
      mockPrismaService.product.create.mockResolvedValue(mockProduct);

      const result = await service.createProduct(
        mockProduct.entrepreneurId,
        {
          name: mockProduct.name,
          description: mockProduct.description,
          price: mockProduct.price,
        },
        file,
      );

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(file);
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: {
          name: mockProduct.name,
          description: mockProduct.description,
          price: mockProduct.price,
          photo: mockProduct.photo,
          entrepreneurId: mockProduct.entrepreneurId,
        },
      });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and its image', async () => {
      const mockProduct = createMockProduct();

      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
      mockPrismaService.product.delete.mockResolvedValue(mockProduct);
      mockCloudinaryService.extractPublicId.mockReturnValue(
        'mistand/products/abc123',
      );
      mockCloudinaryService.deleteImage.mockResolvedValue(undefined);

      const result = await service.deleteProduct(
        mockProduct.id,
        mockProduct.entrepreneurId,
      );

      expect(result).toEqual({ message: 'Product deleted successfully' });
      expect(mockCloudinaryService.extractPublicId).toHaveBeenCalledWith(
        mockProduct.photo,
      );
      expect(mockCloudinaryService.deleteImage).toHaveBeenCalledWith(
        'mistand/products/abc123',
      );
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      const mockProduct = createMockProduct();
      await expect(
        service.deleteProduct(mockProduct.id, mockProduct.entrepreneurId),
      ).rejects.toThrow(NotFoundException);
      expect(mockCloudinaryService.deleteImage).not.toHaveBeenCalled();
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
      expect(mockCloudinaryService.deleteImage).not.toHaveBeenCalled();
    });
  });
});

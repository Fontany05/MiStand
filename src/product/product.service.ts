import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponse } from './interface/product.interface';
import { FilterProductDto, ProductOrderBy } from './dto/filter-product.dto';
import { PaginatedProductResponse } from '../../dist/product/interface/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    entrepreneurId: string,
    createDto: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.prisma.product.create({
      data: {
        ...createDto,
        entrepreneurId,
      },
    });
  }

  async getProductsByStand(
    entrepreneurId: string,
    filters: FilterProductDto,
  ): Promise<PaginatedProductResponse> {
    const { search, available, orderBy, page = 1, limit = 10 } = filters;

    const skip = (page - 1) * limit;

    const where = {
      entrepreneurId,
      ...(available !== undefined && { available }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy:
          orderBy === ProductOrderBy.PRICE_ASC
            ? { price: 'asc' as const }
            : orderBy === ProductOrderBy.PRICE_DESC
              ? { price: 'desc' as const }
              : { createdAt: 'desc' as const },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async updateProduct(
    id: string,
    entrepreneurId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.entrepreneurId !== entrepreneurId) {
      throw new ForbiddenException('You can only update your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        photo: true,
        available: true,
        entrepreneurId: true,
        createdAt: true,
      },
    });
  }

  async deleteProduct(
    id: string,
    entrepreneurId: string,
  ): Promise<{ message: string }> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.entrepreneurId !== entrepreneurId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    await this.prisma.product.delete({
      where: { id, entrepreneurId },
    });
    return { message: 'Product deleted successfully' };
  }
}

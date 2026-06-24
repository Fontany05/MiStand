import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponse } from './interface/product.interface';

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

  async getProductsByStand(entrepreneurId: string): Promise<ProductResponse[]> {
    return this.prisma.product.findMany({
      where: { entrepreneurId, available: true },
    });
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

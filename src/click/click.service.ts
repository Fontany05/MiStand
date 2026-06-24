import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ClickResponse, ClickMetrics } from './interface/click.interface';

@Injectable()
export class ClickService {
  constructor(private readonly prisma: PrismaService) {}

  async registerClick(productId: string): Promise<ClickResponse> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.click.create({
      data: { productId },
    });
  }

  async getClickMetrics(productId: string): Promise<ClickMetrics> {
    const totalClicks = await this.prisma.click.count({
      where: { productId },
    });
    return {
      productId,
      totalClicks,
    };
  }
}

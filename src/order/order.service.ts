import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './interface/order.interface';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    entrepreneurId: string,
    createDto: CreateOrderDto,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...createDto,
        entrepreneurId,
      },
    });
  }

  async getOrders(entrepreneurId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { entrepreneurId },
    });
  }

  async updateOrderStatus(
    id: string,
    entrepreneurId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    if (order.entrepreneurId !== entrepreneurId) {
      throw new ForbiddenException('You can only update your own order');
    }

    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new ForbiddenException(
        'Cannot update a delivered or cancelled order',
      );
    }
    return this.prisma.order.update({
      where: { id },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async deleteOrder(
    id: string,
    entrepreneurId: string,
  ): Promise<{ message: string }> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    if (order.entrepreneurId !== entrepreneurId) {
      throw new ForbiddenException('You can only update your own order');
    }

    await this.prisma.order.delete({
      where: { id },
    });
    return { message: 'Order deleted successfully' };
  }
}

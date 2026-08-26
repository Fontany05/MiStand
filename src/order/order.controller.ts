import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { RequestWithUser } from 'src/auth/interface/request.interface';
import type { Order } from './interface/order.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
@ApiTags('Order')
@Controller('order')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear orden' })
  create(
    @Request() req: RequestWithUser,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(req.user.id, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mostrar pedido del emprendedor' })
  getOrders(@Request() req: RequestWithUser): Promise<Order[]> {
    return this.orderService.getOrders(req.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cambiar el estado de la orden(pedido)' })
  update(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(
      id,
      req.user.id,
      updateOrderStatusDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar pedido' })
  delete(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<{ message: string }> {
    return this.orderService.deleteOrder(id, req.user.id);
  }
}

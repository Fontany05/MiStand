import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { RequestWithUser } from 'src/auth/interface/request.interface';
import type {
  Order,
  PaginatedOrderResponse,
} from './interface/order.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { FilterOrderDto } from './dto/filter-order.dto';
@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Crear orden' })
  create(
    @Request() req: RequestWithUser,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(req.user.id, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mostrar pedidos del emprendedor' })
  getOrders(
    @Request() req: RequestWithUser,
    @Query() filters: FilterOrderDto,
  ): Promise<PaginatedOrderResponse> {
    return this.orderService.getOrders(req.user.id, filters);
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
  @ApiOperation({ summary: 'Eliminar pedido' })
  delete(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<{ message: string }> {
    return this.orderService.deleteOrder(id, req.user.id);
  }
}

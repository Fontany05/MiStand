import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

export class FilterOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus, description: 'filtrar por estado' })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({ example: 1, description: ' numero de pagina' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de pedidos por página',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  limit?: number;
}

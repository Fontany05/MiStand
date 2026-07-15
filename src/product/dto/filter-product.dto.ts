import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum ProductOrderBy {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NEWEST = 'newest',
}

export class FilterProductDto {
  @ApiPropertyOptional({
    example: 'taza',
    description: 'Buscar por nombre o descripcion',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar por disponibilidad',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({
    enum: ProductOrderBy,
    description: 'Ordenar por precio o fecha',
  })
  @IsEnum(ProductOrderBy)
  @IsOptional()
  orderBy?: ProductOrderBy;

  @ApiPropertyOptional({ example: 1, description: 'Número de página' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de productos por página',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  limit?: number;
}

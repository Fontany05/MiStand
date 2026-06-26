import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Taza artesanal',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Taza hecha a mano con arcilla natural',
    description: 'Descripción del producto',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1500, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: 'https://ejemplo.com/taza.jpg',
    description: 'URL de la foto del producto',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Disponibilidad del producto',
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}

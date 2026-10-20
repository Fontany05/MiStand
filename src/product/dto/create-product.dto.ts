import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    example: 'Taza artesanal',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Taza hecha a mano con arcilla natural',
    description: 'Descripción del producto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500, description: 'Precio del producto' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
}

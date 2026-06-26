import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsNumber()
  @IsPositive()
  price: number;
  @ApiProperty({
    example: 'https://ejemplo.com/taza.jpg',
    description: 'URL de la foto del producto',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;
}

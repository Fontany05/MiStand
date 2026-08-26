import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Karina garcia',
    description: 'nombre del cliente',
  })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({
    example: '555234',
    description: 'numero de telefono de cliente',
  })
  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @ApiProperty({
    example: '123',
    description: 'identificador de producto',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 'el cliente quedo en contactarme por la tarde',
    description: 'notas adicionales que puede dejar el emprendedor',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

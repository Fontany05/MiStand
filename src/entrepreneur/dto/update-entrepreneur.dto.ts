import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEntrepreneurDto {
  @ApiPropertyOptional({
    example: 'Ana García',
    description: 'Nombre del emprendedor',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'ana@gmail.com',
    description: 'Email del emprendedor',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '123456',
    description: 'Contraseña mínimo 6 caracteres',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: 'Stand de Ana',
    description: 'Nombre del stand',
  })
  @IsString()
  @IsOptional()
  standName?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'Teléfono de contacto',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Vendo bijouterie hecha a mano',
    description: 'Descripción del stand',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'Feria de Saladillo',
    description: 'Ubicación actual del stand',
  })
  @IsString()
  @IsOptional()
  currentLocation?: string;
}

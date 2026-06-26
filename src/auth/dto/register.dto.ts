import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Ana García', description: 'Nombre del emprendedor' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ana@gmail.com',
    description: 'Email del emprendedor',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña mínimo 6 caracteres',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Stand de Ana', description: 'Nombre del stand' })
  @IsString()
  standName: string;

  @ApiProperty({ example: '1234567890', description: 'Teléfono de contacto' })
  @IsString()
  phone: string;

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

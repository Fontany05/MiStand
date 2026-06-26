import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}

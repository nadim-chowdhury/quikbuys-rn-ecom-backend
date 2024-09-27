import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'User password (at least 6 characters)',
    example: 'password123',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "User's role, either 'admin' or 'customer'",
    example: 'customer',
  })
  role: string;
}

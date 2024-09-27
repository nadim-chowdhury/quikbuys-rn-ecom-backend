import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Updated password (at least 6 characters)',
    example: 'newpassword123',
    required: false,
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Updated profile information',
    example: 'Profile details...',
    required: false,
  })
  profile?: string;
}

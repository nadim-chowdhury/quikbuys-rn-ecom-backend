import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Updated name of the product',
    example: 'Updated Product Name',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Updated description of the product',
    example: 'Updated product description',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Updated price of the product',
    example: 99.99,
    required: false,
  })
  price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Updated SKU of the product',
    example: 'SKU12345',
    required: false,
  })
  sku?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Updated quantity of the product in stock',
    example: 50,
    required: false,
  })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Updated category ID of the product',
    example: 1,
    required: false,
  })
  categoryId?: number;
}

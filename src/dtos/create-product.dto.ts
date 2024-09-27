import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-performance laptop for gaming and work',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The price of the product',
    example: 1299.99,
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The SKU (Stock Keeping Unit) of the product',
    example: 'LPT-1234',
  })
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product available in stock',
    example: 50,
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 2,
  })
  categoryId: number;
}

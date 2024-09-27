import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

class OrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the product being ordered',
    example: 1,
  })
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product being ordered',
    example: 2,
  })
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the user placing the order',
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    description: 'The list of items being ordered',
    type: [OrderItemDto],
  })
  items: OrderItemDto[];
}

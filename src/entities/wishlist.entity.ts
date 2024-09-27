import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger'; // Import the ApiProperty decorator

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the wishlist item',
    example: 1,
  }) // Swagger property for the ID
  id: number;

  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who added the product to the wishlist',
  }) // Swagger property for the User relationship
  user: User;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  @ApiProperty({
    type: () => Product,
    description: 'The product added to the wishlist',
  }) // Swagger property for the Product relationship
  product: Product;
}

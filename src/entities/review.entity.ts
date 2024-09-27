import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger ApiProperty decorator
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the review' }) // Swagger property for ID
  id: number;

  @Column()
  @ApiProperty({ description: 'The rating for the product', example: 4 }) // Swagger property for rating
  rating: number;

  @Column()
  @ApiProperty({
    description: 'The review comment',
    example: 'Great product, highly recommend!',
  }) // Swagger property for comment
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who wrote the review',
  }) // Swagger property for user
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    type: () => Product,
    description: 'The product that was reviewed',
  }) // Swagger property for product
  product: Product;
}

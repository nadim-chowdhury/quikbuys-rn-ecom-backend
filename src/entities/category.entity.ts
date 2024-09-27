import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger ApiProperty decorator
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the category' }) // Swagger property for ID
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  }) // Swagger property for name
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({
    type: () => [Product],
    description: 'The list of products belonging to this category',
  }) // Swagger property for products
  products: Product[];
}

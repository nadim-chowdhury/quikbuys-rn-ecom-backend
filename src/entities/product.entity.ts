import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';
import { Review } from './review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the product' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @Column('text')
  @ApiProperty({ description: 'The description of the product' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @Column()
  @ApiProperty({ description: 'The stock-keeping unit (SKU) of the product' })
  sku: string;

  @Column()
  @ApiProperty({ description: 'The quantity of the product in stock' })
  quantity: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    type: () => Category,
    description: 'The category of the product',
  })
  category: Category;

  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  @ApiProperty({
    type: () => [Review],
    description: 'List of reviews for the product',
  })
  reviews: Review[];
}

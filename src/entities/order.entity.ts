import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger ApiProperty decorator
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the order' }) // Add Swagger docs
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who placed the order',
  }) // Add Swagger docs
  user: User;

  @Column({
    type: 'enum',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed',
  })
  @ApiProperty({
    description: 'The status of the order',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'], // Specify possible values
    default: 'placed',
  }) // Add Swagger docs
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: 'The total value of the order',
    example: 150.25, // Example value
  }) // Add Swagger docs
  total: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'The date when the order was created' }) // Add Swagger docs
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  @ApiProperty({
    type: () => [OrderItem], // Specify array of OrderItem
    description: 'List of items in the order',
  }) // Add Swagger docs
  items: OrderItem[];
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the order item' }) // Add Swagger docs
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => Order,
    description: 'The order this item belongs to',
  }) // Add Swagger docs
  order: Order;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  @ApiProperty({
    type: () => Product,
    description: 'The product being ordered',
  }) // Add Swagger docs
  product: Product;

  @Column('int')
  @ApiProperty({ description: 'The quantity of the product being ordered' }) // Add Swagger docs
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: 'The price of the product at the time of the order',
    example: 49.99, // Example value
  }) // Add Swagger docs
  price: number;
}

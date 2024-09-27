import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed',
  })
  status: string; // Order status options

  @Column('decimal', { precision: 10, scale: 2 })
  total: number; // Used for total order value

  @CreateDateColumn()
  createdAt: Date; // Automatically set the date when the order is created

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[]; // Relationship with OrderItem entity
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order; // Relationship with Order entity

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product; // Relationship with Product entity

  @Column('int')
  quantity: number; // Quantity of the product in this order

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Price of the product at the time of the order
}

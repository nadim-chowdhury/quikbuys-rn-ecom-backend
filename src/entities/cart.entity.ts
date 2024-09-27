import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the cart' })
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => User, description: 'The user who owns the cart' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @ApiProperty({
    type: () => [CartItem],
    description: 'List of items in the cart',
  })
  items: CartItem[];
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the cart item' })
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => Cart,
    description: 'The cart this item belongs to',
  })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  @ApiProperty({ type: () => Product, description: 'The product in the cart' })
  product: Product;

  @Column('int')
  @ApiProperty({ description: 'The quantity of the product' })
  quantity: number;
}

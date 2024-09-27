import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger ApiProperty decorator
import * as bcrypt from 'bcrypt';
import { Order } from './order.entity';
import { Notification } from './notifications.entity';
import { Wishlist } from './wishlist.entity';
import { Review } from './review.entity';
import { Cart } from './cart.entity';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user' }) // Swagger property for ID
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  }) // Swagger property for email
  email: string;

  @Column()
  @ApiProperty({ description: 'The password of the user (hashed)' }) // Swagger property for password
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  }) // Swagger property for role
  role: UserRole;

  @Column({ default: '' })
  @ApiProperty({ description: 'The profile information of the user' }) // Swagger property for profile
  profile: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date the user was created' }) // Swagger property for createdAt
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'The date the user was last updated' }) // Swagger property for updatedAt
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Relationships with other entities

  // Orders relationship
  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    type: () => [Order],
    description: 'List of orders made by the user',
  }) // Swagger property for orders
  orders: Order[];

  // Notifications relationship
  @OneToMany(() => Notification, (notification) => notification.user)
  @ApiProperty({
    type: () => [Notification],
    description: 'List of notifications received by the user',
  }) // Swagger property for notifications
  notifications: Notification[];

  // Wishlist relationship
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  @ApiProperty({
    type: () => [Wishlist],
    description: 'List of wishlist items for the user',
  }) // Swagger property for wishlist
  wishlists: Wishlist[];

  // Reviews relationship
  @OneToMany(() => Review, (review) => review.user)
  @ApiProperty({
    type: () => [Review],
    description: 'List of reviews written by the user',
  }) // Swagger property for reviews
  reviews: Review[];

  // Cart relationship
  @OneToMany(() => Cart, (cart) => cart.user)
  @ApiProperty({
    type: () => [Cart],
    description: 'List of carts belonging to the user',
  }) // Swagger property for carts
  carts: Cart[];
}

import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product;
}

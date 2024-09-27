import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  sku: string;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;
}

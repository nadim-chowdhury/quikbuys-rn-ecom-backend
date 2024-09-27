import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  shopName: string;

  @Column()
  mobileNumber: string;

  @Column({ nullable: true })
  gstin?: string;

  @Column({ nullable: true })
  udyamRegistrationNumber?: string;

  @Column({ nullable: true })
  shopPhotos: string[]; // URLs to shop photos (front, right, street view)

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}

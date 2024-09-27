import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DeliveryOrder } from './delivery-order.entity';

@Entity()
export class DeliveryPersonnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobileNumber: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  vehicleDetails?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  drivingLicense?: string; // Document upload URL

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DeliveryOrder, (order) => order.deliveryPersonnel)
  orders: DeliveryOrder[];
}

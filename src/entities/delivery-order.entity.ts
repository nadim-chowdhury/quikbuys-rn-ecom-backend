import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { DeliveryPersonnel } from './delivery-personnel.entity';
import { Order } from './order.entity'; // Reference to the order entity

@Entity()
export class DeliveryOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DeliveryPersonnel, (personnel) => personnel.orders, {
    onDelete: 'SET NULL',
  })
  deliveryPersonnel: DeliveryPersonnel;

  @ManyToOne(() => Order, (order) => order.deliveryAssignments, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column({
    type: 'enum',
    enum: ['picked_up', 'out_for_delivery', 'delivered', 'failed'],
    default: 'picked_up',
  })
  status: string;

  @CreateDateColumn()
  assignedAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

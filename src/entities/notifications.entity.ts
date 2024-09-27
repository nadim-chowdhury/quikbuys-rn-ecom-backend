import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger ApiProperty decorator
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the notification' }) // Swagger property for ID
  id: number;

  @Column()
  @ApiProperty({
    description: 'The content of the notification',
    example: 'Your order has been shipped',
  }) // Swagger property for message
  message: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @ApiProperty({
    type: () => User,
    description: 'The user who received the notification',
  }) // Swagger property for user
  user: User;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates whether the notification has been read',
    default: false,
  }) // Swagger property for read status
  read: boolean;
}

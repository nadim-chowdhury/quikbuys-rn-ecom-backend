import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderItem } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])], // Register the Order and OrderItem entities
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService, TypeOrmModule], // Export the TypeOrmModule to use OrderRepository in other modules
})
export class OrdersModule {}

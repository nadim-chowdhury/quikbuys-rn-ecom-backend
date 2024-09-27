import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderItem } from 'src/entities/order.entity';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { ProductsModule } from '../products/products.module'; // Import ProductsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UsersModule, // Import UsersModule to provide UsersService
    ProductsModule, // Import ProductsModule for ProductsService
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService, TypeOrmModule], // Export services and entities if needed in other modules
})
export class OrdersModule {}

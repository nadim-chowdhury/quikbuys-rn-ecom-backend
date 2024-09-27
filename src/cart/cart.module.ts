import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { Cart, CartItem } from 'src/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]), // Add Cart and CartItem entities
    UsersModule,
    ProductsModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

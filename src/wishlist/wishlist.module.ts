import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from 'src/entities/wishlist.entity'; // Import Wishlist entity
import { UsersModule } from '../users/users.module'; // Import UsersModule for UsersService
import { ProductsModule } from '../products/products.module'; // Import ProductsModule for ProductsService

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]), // Register Wishlist repository
    UsersModule, // Inject UsersService
    ProductsModule, // Inject ProductsService
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}

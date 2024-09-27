import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Order, OrderItem } from './entities/order.entity';
import { Review } from './entities/review.entity';
import { Wishlist } from './entities/wishlist.entity';
import { Notification } from './entities/notifications.entity';
import { Cart, CartItem } from './entities/cart.entity'; // Import Cart and CartItem

// Import your other modules here
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CartModule } from './cart/cart.module';
import { PaypalModule } from './paypal/paypal.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Product,
        Category,
        Order,
        OrderItem,
        Review,
        Wishlist,
        Notification,
        Cart, // Add Cart entity
        CartItem, // Add CartItem entity
      ],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // If SSL is required
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    InvoicesModule,
    CartModule,
    PaypalModule,
    ReviewsModule,
    WishlistModule,
    NotificationsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

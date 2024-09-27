import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';
import { ReportsController } from './reports/reports.controller';

// Services
import { AppService } from './app.service';
import { ReportsService } from './reports/reports.service';

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
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

// Entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Order, OrderItem } from './entities/order.entity';
import { Review } from './entities/review.entity';
import { Wishlist } from './entities/wishlist.entity';
import { Notification } from './entities/notifications.entity';

// Middleware
import { json } from 'body-parser';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [
        User,
        Product,
        Category,
        Order,
        OrderItem,
        Review,
        Wishlist,
        Notification,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }), // Load .env file globally
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    InvoicesModule,
    CartModule,
    PaypalModule,
    ReviewsModule,
    ReportsModule,
    WishlistModule,
    NotificationsModule,
  ],
  controllers: [AppController, ReportsController],
  providers: [AppService, ReportsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        json({
          verify: (req: any, res, buf) => {
            req.rawBody = buf;
          },
        }),
      )
      .forRoutes('payments/webhook');
  }
}

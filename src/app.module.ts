import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { OrdersModule } from './orders/orders.module';
import { Order, OrderItem } from './entities/order.entity';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsService } from './payments/payments.service';
import { InvoicesModule } from './invoices/invoices.module';
import { CartModule } from './cart/cart.module';
import { PaypalModule } from './paypal/paypal.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './entities/review.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Wishlist } from './entities/wishlist.entity';
import { Notification } from './entities/notifications.entity';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';

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
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    InvoicesModule,
    CartModule,
    PaypalModule,
    ReviewsModule,
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

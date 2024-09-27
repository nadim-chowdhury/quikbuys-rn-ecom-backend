// paypal.module.ts
import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule

@Module({
  imports: [OrdersModule], // Import OrdersModule to access OrdersService
  providers: [PaypalService],
  controllers: [PaypalController],
})
export class PaypalModule {}

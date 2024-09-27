import { Controller, Post, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  // Endpoint to create a PayPal order
  @Post('create-order/:orderId')
  createPaypalOrder(@Param('orderId') orderId: number) {
    return this.paypalService.createOrder(orderId);
  }

  // Endpoint to capture a PayPal order
  @Post('capture-order/:orderId')
  capturePaypalOrder(@Param('orderId') orderId: string) {
    return this.paypalService.captureOrder(orderId);
  }
}

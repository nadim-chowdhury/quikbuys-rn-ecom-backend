import {
  Controller,
  Post,
  Param,
  Req,
  BadRequestException,
  Body,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Endpoint to create a Stripe payment intent
  @Post('create-payment-intent/:orderId')
  createPaymentIntent(@Param('orderId') orderId: number) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  // Webhook endpoint to handle Stripe events
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() request: Request,
  ) {
    const body = request.body;

    // Delegate the webhook handling logic to the PaymentsService
    const stripeEvent = await this.paymentsService.handleStripeWebhook(
      sig,
      body,
    );
    await this.paymentsService.handleWebhook(stripeEvent);
  }
}

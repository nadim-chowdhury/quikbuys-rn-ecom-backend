import { Controller, Post, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('paypal') // Group under 'paypal' tag in Swagger UI
@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  // Endpoint to create a PayPal order
  @Post('create-order/:orderId')
  @ApiOperation({ summary: 'Create a PayPal order for a specific order ID' }) // Describe the endpoint
  @ApiParam({
    name: 'orderId',
    description: 'ID of the order to create a PayPal order for',
  }) // Describe the parameter
  createPaypalOrder(@Param('orderId') orderId: number) {
    return this.paypalService.createOrder(orderId);
  }

  // Endpoint to capture a PayPal order
  @Post('capture-order/:orderId')
  @ApiOperation({ summary: 'Capture a PayPal order using the order ID' }) // Describe the endpoint
  @ApiParam({ name: 'orderId', description: 'ID of the order to capture' }) // Describe the parameter
  capturePaypalOrder(@Param('orderId') orderId: string) {
    return this.paypalService.captureOrder(orderId);
  }
}

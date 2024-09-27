import { Controller, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('notifications') // Group under 'notifications' tag in Swagger UI
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email/order-confirmation')
  @ApiOperation({ summary: 'Send order confirmation email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        orderId: { type: 'number', example: 123 },
      },
    },
  })
  sendOrderConfirmationEmail(
    @Body('email') email: string,
    @Body('orderId') orderId: number,
  ) {
    return this.notificationsService.sendOrderConfirmationEmail(email, orderId);
  }

  @Post('sms/order-confirmation')
  @ApiOperation({ summary: 'Send order confirmation SMS' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', example: '+1234567890' },
        orderId: { type: 'number', example: 123 },
      },
    },
  })
  sendOrderConfirmationSMS(
    @Body('phone') phone: string,
    @Body('orderId') orderId: number,
  ) {
    return this.notificationsService.sendOrderConfirmationSMS(phone, orderId);
  }

  @Post('in-app/:userId')
  @ApiOperation({ summary: 'Create an in-app notification' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Your order has been shipped!' },
      },
    },
  })
  createInAppNotification(
    @Param('userId') userId: number,
    @Body('message') message: string,
  ) {
    return this.notificationsService.createInAppNotification(userId, message);
  }

  @Post('email/shipping-update')
  @ApiOperation({ summary: 'Send shipping update email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        orderId: { type: 'number', example: 123 },
        status: { type: 'string', example: 'shipped' },
      },
    },
  })
  sendShippingUpdateEmail(
    @Body('email') email: string,
    @Body('orderId') orderId: number,
    @Body('status') status: string,
  ) {
    return this.notificationsService.sendShippingUpdateEmail(
      email,
      orderId,
      status,
    );
  }

  @Post('sms/shipping-update')
  @ApiOperation({ summary: 'Send shipping update SMS' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', example: '+1234567890' },
        orderId: { type: 'number', example: 123 },
        status: { type: 'string', example: 'shipped' },
      },
    },
  })
  sendShippingUpdateSMS(
    @Body('phone') phone: string,
    @Body('orderId') orderId: number,
    @Body('status') status: string,
  ) {
    return this.notificationsService.sendShippingUpdateSMS(
      phone,
      orderId,
      status,
    );
  }

  @Post('in-app/mark-as-read/:notificationId')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiParam({ name: 'notificationId', description: 'ID of the notification' })
  markNotificationAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}

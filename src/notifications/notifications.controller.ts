import { Controller, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email/order-confirmation')
  sendOrderConfirmationEmail(
    @Body('email') email: string,
    @Body('orderId') orderId: number,
  ) {
    return this.notificationsService.sendOrderConfirmationEmail(email, orderId);
  }

  @Post('sms/order-confirmation')
  sendOrderConfirmationSMS(
    @Body('phone') phone: string,
    @Body('orderId') orderId: number,
  ) {
    return this.notificationsService.sendOrderConfirmationSMS(phone, orderId);
  }

  @Post('in-app/:userId')
  createInAppNotification(
    @Param('userId') userId: number,
    @Body('message') message: string,
  ) {
    return this.notificationsService.createInAppNotification(userId, message);
  }

  @Post('email/shipping-update')
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
  markNotificationAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}

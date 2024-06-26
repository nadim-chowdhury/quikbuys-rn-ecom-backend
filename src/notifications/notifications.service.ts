import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendOrderConfirmation(email: string, orderId: number) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Your order with ID ${orderId} has been confirmed.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendShippingUpdate(email: string, orderId: number, status: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Shipping Update',
      text: `Your order with ID ${orderId} is now ${status}.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

// import * as Twilio from 'twilio';

// @Injectable()
// export class NotificationsService {
//   private twilioClient: Twilio.Twilio;

//   constructor() {
//     this.twilioClient = Twilio('ACCOUNT_SID', 'AUTH_TOKEN');
//   }

//   async sendOrderConfirmationSMS(phone: string, orderId: number) {
//     await this.twilioClient.messages.create({
//       body: `Your order with ID ${orderId} has been confirmed.`,
//       from: '+1234567890',
//       to: phone,
//     });
//   }

//   async sendShippingUpdateSMS(phone: string, orderId: number, status: string) {
//     await this.twilioClient.messages.create({
//       body: `Your order with ID ${orderId} is now ${status}.`,
//       from: '+1234567890',
//       to: phone,
//     });
//   }
// }

// @Injectable()
// export class NotificationsService {
//   // Add necessary imports and constructor

//   async createInAppNotification(userId: number, message: string) {
//     const user = await this.usersService.findOneById(userId);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     const notification = this.notificationsRepository.create({ user, message });
//     return this.notificationsRepository.save(notification);
//   }

//   async getNotifications(userId: number): Promise<Notification[]> {
//     return this.notificationsRepository.find({
//       where: { user: { id: userId } },
//     });
//   }

//   async markAsRead(notificationId: number) {
//     const notification =
//       await this.notificationsRepository.findOne(notificationId);
//     if (!notification) {
//       throw new NotFoundException('Notification not found');
//     }

//     notification.read = true;
//     return this.notificationsRepository.save(notification);
//   }
// }

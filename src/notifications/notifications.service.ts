import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Twilio from 'twilio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Notification } from 'src/entities/notifications.entity';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;
  private twilioClient: Twilio.Twilio;

  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    private usersService: UsersService,
  ) {
    // Configure email transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // replace with your Gmail
        pass: 'your-app-password', // use App Password if 2FA is enabled
      },
    });

    // Configure Twilio client
    this.twilioClient = Twilio('ACCOUNT_SID', 'AUTH_TOKEN');
  }

  // Email Notification Methods
  async sendOrderConfirmationEmail(email: string, orderId: number) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Your order with ID ${orderId} has been confirmed.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendShippingUpdateEmail(
    email: string,
    orderId: number,
    status: string,
  ) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Shipping Update',
      text: `Your order with ID ${orderId} is now ${status}.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  // SMS Notification Methods
  async sendOrderConfirmationSMS(phone: string, orderId: number) {
    await this.twilioClient.messages.create({
      body: `Your order with ID ${orderId} has been confirmed.`,
      from: '+1234567890', // Your Twilio phone number
      to: phone,
    });
  }

  async sendShippingUpdateSMS(phone: string, orderId: number, status: string) {
    await this.twilioClient.messages.create({
      body: `Your order with ID ${orderId} is now ${status}.`,
      from: '+1234567890',
      to: phone,
    });
  }

  // In-App Notification Methods
  async createInAppNotification(userId: number, message: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationsRepository.create({ user, message });
    return this.notificationsRepository.save(notification);
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    return this.notificationsRepository.save(notification);
  }
}

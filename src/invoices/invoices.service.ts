import { Injectable } from '@nestjs/common';
import { Order } from '../orders/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createInvoice } from 'node-invoice-generator';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async generateInvoice(orderId: number): Promise<string> {
    const order = await this.ordersRepository.findOne(orderId, {
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const invoiceData = {
      orderId: order.id,
      customer: {
        name: order.user.name,
        email: order.user.email,
      },
      items: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      date: order.createdAt,
    };

    const invoicePath = `invoices/invoice_${order.id}.pdf`;
    createInvoice(invoiceData, invoicePath);

    return invoicePath;
  }
}

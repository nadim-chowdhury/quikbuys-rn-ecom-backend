import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async generateInvoice(orderId: number): Promise<string> {
    // Combine the conditions and relations into one object
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const invoicePath = `invoices/invoice_${order.id}.pdf`;

    // Generate PDF
    await this.createInvoicePDF(order, invoicePath);

    return invoicePath;
  }

  private async createInvoicePDF(
    order: Order,
    invoicePath: string,
  ): Promise<void> {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    // Add some sample content
    doc.fontSize(20).text(`Invoice for Order ID: ${order.id}`, {
      align: 'center',
    });

    doc.fontSize(12).text(`Customer Name: ${order.user}`);
    doc.text(`Customer Email: ${order.user.email}`);
    doc.text(`Order Date: ${order.createdAt}`);
    doc.moveDown();

    doc.text('Items:');
    order.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.product.name} - Quantity: ${item.quantity} - Price: ${item.price}`,
      );
    });

    doc.moveDown();
    doc.text(`Total: $${order.total}`, { align: 'right' });

    doc.end();

    // Wait until file is fully written
    await new Promise((resolve) => writeStream.on('finish', resolve));
  }
}

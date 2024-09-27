import { Controller, Get, Param, Res } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('invoices') // Group under 'invoices' tag in Swagger UI
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Get invoice by order ID' }) // Describe the endpoint
  @ApiParam({ name: 'orderId', description: 'ID of the order' }) // Describe the parameter
  async getInvoice(@Param('orderId') orderId: number, @Res() res: Response) {
    const invoicePath = await this.invoicesService.generateInvoice(orderId);
    res.sendFile(invoicePath, { root: '.' });
  }
}

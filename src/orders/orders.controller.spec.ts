import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { UpdateOrderStatusDto } from 'src/dtos/update-order-status.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('orders') // Group under 'orders' tag in Swagger UI
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: CreateOrderDto, // Use the DTO class for Swagger to auto-generate schema
  })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiBody({
    type: UpdateOrderStatusDto, // Use the DTO class for Swagger to auto-generate schema
  })
  updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an order' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  removeOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }
}

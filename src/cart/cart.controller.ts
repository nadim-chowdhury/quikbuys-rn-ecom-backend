import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';
import { CreateCartItemDto } from 'src/dtos/create-cart-item.dto';
import { UpdateCartItemDto } from 'src/dtos/update-cart-item.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cart') // Group the CartController endpoints under the 'cart' tag in Swagger UI
@ApiBearerAuth() // Indicates that JWT token is required for authorization
@Controller('cart')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller with JWT guard
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add an item to the cart' })
  async addItem(
    @Req() req: Request,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    const userId = req.user['id'];
    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Patch('update/:itemId')
  @ApiOperation({ summary: 'Update the quantity of an item in the cart' })
  async updateItem(
    @Req() req: Request,
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = req.user['id'];
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  async removeItem(@Req() req: Request, @Param('itemId') itemId: number) {
    const userId = req.user['id'];
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get the cart summary' })
  async getCartSummary(@Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout the items in the cart' })
  async checkout(@Req() req: Request) {
    const userId = req.user['id'];
    const cart = await this.cartService.getCartSummary(userId);
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}

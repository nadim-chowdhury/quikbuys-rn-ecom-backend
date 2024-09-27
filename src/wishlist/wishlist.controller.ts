import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('wishlist') // Group endpoints under "wishlist"
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Add a product to the wishlist' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to add',
  })
  addToWishlist(@Req() req: Request, @Param('productId') productId: number) {
    const userId = req.user.id;
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove a product from the wishlist' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to remove',
  })
  removeFromWishlist(
    @Req() req: Request,
    @Param('productId') productId: number,
  ) {
    const userId = req.user.id;
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get()
  @ApiOperation({ summary: 'View the wishlist' })
  viewWishlist(@Req() req: Request) {
    const userId = req.user.id;
    return this.wishlistService.viewWishlist(userId);
  }
}

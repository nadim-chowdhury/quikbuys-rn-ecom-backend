import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Request } from 'express';
import { CreateReviewDto } from 'src/dtos/create-review.dto';
import { UpdateReviewDto } from 'src/dtos/update-review.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('reviews') // Group under 'reviews' tag in Swagger UI
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Add a review for a product' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product to review',
  })
  addReview(
    @Req() req: Request,
    @Param('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const userId = req.user.id; // Extract user ID from request
    return this.reviewsService.addReview(userId, productId, createReviewDto);
  }

  @Patch(':reviewId')
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiParam({
    name: 'reviewId',
    required: true,
    description: 'ID of the review to update',
  })
  updateReview(
    @Req() req: Request,
    @Param('reviewId') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const userId = req.user.id;
    return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiParam({
    name: 'reviewId',
    required: true,
    description: 'ID of the review to delete',
  })
  deleteReview(@Req() req: Request, @Param('reviewId') reviewId: number) {
    const userId = req.user.id;
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all reviews for a specific product' })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of the product',
  })
  getProductReviews(@Param('productId') productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}

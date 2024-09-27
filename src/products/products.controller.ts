import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { UpdateProductDto } from 'src/dtos/update-product.dto';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Product endpoints
  @Post()
  @Roles(Role.Admin) // Restrict to admin
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin) // Restrict to admin
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // Restrict to admin
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  // Category endpoints
  @Post('categories')
  @Roles(Role.Admin) // Restrict to admin
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  findCategoryById(@Param('id') id: number) {
    return this.productsService.findCategoryById(id);
  }

  @Patch('categories/:id')
  @Roles(Role.Admin) // Restrict to admin
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @Roles(Role.Admin) // Restrict to admin
  removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }
}

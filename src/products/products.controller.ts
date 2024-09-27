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
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products') // Group under 'products' tag in Swagger UI
@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Product endpoints
  @Post()
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto }) // Expecting a body of type CreateProductDto
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product' })
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to update' })
  @ApiBody({ type: UpdateProductDto }) // Expecting a body of type UpdateProductDto
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Remove a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product to remove' })
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  // Category endpoints
  @Post('categories')
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto }) // Expecting a body of type CreateCategoryDto
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  findCategoryById(@Param('id') id: number) {
    return this.productsService.findCategoryById(id);
  }

  @Patch('categories/:id')
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category to update' })
  @ApiBody({ type: UpdateCategoryDto }) // Expecting a body of type UpdateCategoryDto
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @Roles(Role.Admin) // Restrict to admin
  @ApiOperation({ summary: 'Remove a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category to remove' })
  removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }
}

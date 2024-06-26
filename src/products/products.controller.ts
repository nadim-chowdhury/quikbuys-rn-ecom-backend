import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  @Post('categories')
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
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }
}

// import { Controller, Get, Query } from '@nestjs/common';
// import { ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Get('search')
//   searchProducts(@Query('query') query: string) {
//     return this.productsService.searchProducts(query);
//   }

//   @Get('filter')
//   filterProducts(
//     @Query('categoryId') categoryId?: number,
//     @Query('minPrice') minPrice?: number,
//     @Query('maxPrice') maxPrice?: number,
//     @Query('minRating') minRating?: number,
//   ) {
//     return this.productsService.filterProducts(
//       categoryId,
//       minPrice,
//       maxPrice,
//       minRating,
//     );
//   }
// }

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Patch,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { CreateProductDto, UpdateProductDto } from './dto';
// import { Roles } from '../auth/roles.decorator';
// import { Role } from '../auth/role.enum';
// import { RolesGuard } from '../auth/roles.guard';

// @Controller('products')
// @UseGuards(RolesGuard)
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @Roles(Role.Admin)
//   create(@Body() createProductDto: CreateProductDto) {
//     return this.productsService.create(createProductDto);
//   }

//   @Get()
//   findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.productsService.findProductById(id);
//   }

//   @Patch(':id')
//   @Roles(Role.Admin)
//   update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
//     return this.productsService.update(id, updateProductDto);
//   }

//   @Delete(':id')
//   @Roles(Role.Admin)
//   remove(@Param('id') id: number) {
//     return this.productsService.remove(id);
//   }
// }

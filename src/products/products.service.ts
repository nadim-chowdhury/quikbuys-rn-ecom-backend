import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = createProductDto;
    const category = await this.categoriesRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = this.productsRepository.create({ ...rest, category });
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne(id, {
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    const { categoryId, ...rest } = updateProductDto;
    if (categoryId) {
      const category = await this.categoriesRepository.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }
    Object.assign(product, rest);
    return this.productsRepository.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['products'] });
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private productsRepository: Repository<Product>,
//   ) {}

//   async searchProducts(query: string): Promise<Product[]> {
//     return this.productsRepository
//       .createQueryBuilder('product')
//       .where('product.name LIKE :query', { query: `%${query}%` })
//       .orWhere('product.description LIKE :query', { query: `%${query}%` })
//       .getMany();
//   }

//   async filterProducts(
//     categoryId?: number,
//     minPrice?: number,
//     maxPrice?: number,
//     minRating?: number,
//   ): Promise<Product[]> {
//     let queryBuilder = this.productsRepository.createQueryBuilder('product');

//     if (categoryId) {
//       queryBuilder = queryBuilder.andWhere(
//         'product.category.id = :categoryId',
//         { categoryId },
//       );
//     }

//     if (minPrice) {
//       queryBuilder = queryBuilder.andWhere('product.price >= :minPrice', {
//         minPrice,
//       });
//     }

//     if (maxPrice) {
//       queryBuilder = queryBuilder.andWhere('product.price <= :maxPrice', {
//         maxPrice,
//       });
//     }

//     if (minRating) {
//       queryBuilder = queryBuilder.andWhere('product.rating >= :minRating', {
//         minRating,
//       });
//     }

//     return queryBuilder.getMany();
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';
// import { CreateProductDto, UpdateProductDto } from './dto';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private productsRepository: Repository<Product>,
//   ) {}

//   create(createProductDto: CreateProductDto): Promise<Product> {
//     const product = this.productsRepository.create(createProductDto);
//     return this.productsRepository.save(product);
//   }

//   findAll(): Promise<Product[]> {
//     return this.productsRepository.find();
//   }

//   findProductById(id: number): Promise<Product> {
//     return this.productsRepository.findOne(id);
//   }

//   async update(
//     id: number,
//     updateProductDto: UpdateProductDto,
//   ): Promise<Product> {
//     await this.productsRepository.update(id, updateProductDto);
//     return this.productsRepository.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.productsRepository.delete(id);
//   }
// }

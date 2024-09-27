import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';
import { UpdateProductDto } from 'src/dtos/update-product.dto';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';

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
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
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
    const product = await this.productsRepository.findOne({
      where: { id },
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
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
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
    const category = await this.categoriesRepository.findOne({
      where: { id },
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Seller } from './seller.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  // Add new product by seller
  async createProduct(
    createProductDto: CreateProductDto,
    sellerId: number,
  ): Promise<Product> {
    const seller = await this.sellersRepository.findOne(sellerId);
    if (!seller) {
      throw new NotFoundException(`Seller not found`);
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      seller,
    });
    return this.productsRepository.save(product);
  }

  // Update a product by seller
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  // Find a product by ID
  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  // Find all products by seller
  async findProductsBySeller(sellerId: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: { seller: { id: sellerId } },
    });
  }

  // Delete a product by ID
  async deleteProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(product: Product): Promise<string> {
    try {
      await this.productRepository.save(product);
      return 'Product created successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, data);
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

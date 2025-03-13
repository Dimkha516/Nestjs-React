import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts() {
        const data = await this.productsService.getProducts();
        return data;
    }

    @Post()
    async createProduct(@Body() product: Product) {
        return await this.productsService.createProduct(product);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<Product>): Promise<Product> {
     return this.productsService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
      return this.productsService.delete(id);
    }
    
}

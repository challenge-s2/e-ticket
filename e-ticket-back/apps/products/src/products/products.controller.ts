import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductsDto } from './dto/create-products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProducts')
  async create(@Payload() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @MessagePattern('findAllProducts')
  async findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('findAllProductsByCompanyId')
  async findAllByCompanyId(@Payload() companyId: string) {
    return this.productsService.findAllByCompanyId(companyId);
  }

  @MessagePattern('findOneProductById')
  async findOneById(@Payload() id: string) {
    return this.productsService.findOneById(id);
  }
}

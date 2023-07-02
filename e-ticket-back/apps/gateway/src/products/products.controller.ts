import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('company/:companyId')
  async findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.productsService.findAllByCompanyId(companyId);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}

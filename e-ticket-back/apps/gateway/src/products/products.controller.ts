import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('company/:companyId')
  @UseGuards(JwtAuthGuard)
  async findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.productsService.findAllByCompanyId(companyId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { AccessControlInterceptor } from '@app/common/interceptors/acccess-control.interceptor';

@UseInterceptors(AccessControlInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('company/:companyId')
  @Roles('COMPANY', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  async findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.productsService.findAllByCompanyId(companyId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}

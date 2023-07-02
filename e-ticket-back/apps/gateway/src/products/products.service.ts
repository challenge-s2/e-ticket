import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductsDto } from './dto/create-products.dto';
import { map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  async create(createProductsDto: CreateProductsDto) {
    return this.productsClient
      .send('createProducts', createProductsDto)
      .pipe(map((message: string) => ({ message })));
  }

  async findAll() {
    return this.productsClient
      .send('findAllProducts', '')
      .pipe(map((message: string) => ({ message })));
  }

  async findAllByCompanyId(companyId: string) {
    return this.productsClient
      .send('findAllProductsByCompanyId', companyId)
      .pipe(map((message: string) => ({ message })));
  }

  async findOneById(id: string) {
    return this.productsClient
      .send('findOneProductById', id)
      .pipe(map((message: string) => ({ message })));
  }
}

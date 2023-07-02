import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductsDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductsDto: CreateProductsDto) {
    return this.productsRepository.create({ ...createProductsDto });
  }

  findAll() {
    return this.productsRepository.findAll({});
  }

  findAllByCompanyId(companyId: string) {
    return this.productsRepository.findAll({ companyId });
  }

  findOneById(id: string) {
    return this.productsRepository.findOne({ _id: id });
  }
}

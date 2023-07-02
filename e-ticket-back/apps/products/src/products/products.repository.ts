import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsDocument } from './entity/products.entity';

@Injectable()
export class ProductsRepository extends AbstractRepository<ProductsDocument> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(ProductsDocument.name) productsModel: Model<ProductsDocument>,
  ) {
    super(productsModel);
  }
}

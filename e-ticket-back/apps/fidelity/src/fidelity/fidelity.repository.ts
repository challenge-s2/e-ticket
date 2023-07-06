import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FidelityDocument } from './entities/fidelity.entity';

@Injectable()
export class FidelityRepository extends AbstractRepository<FidelityDocument> {
  protected readonly logger = new Logger(FidelityRepository.name);

  constructor(
    @InjectModel(FidelityDocument.name) fidelityModel: Model<FidelityDocument>,
  ) {
    super(fidelityModel);
  }
}

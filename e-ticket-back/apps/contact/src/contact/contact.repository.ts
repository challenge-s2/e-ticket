import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactRepository extends AbstractRepository<ContactDocument> {
  protected readonly logger = new Logger(ContactRepository.name);

  constructor(
    @InjectModel(ContactDocument.name) contactModel: Model<ContactDocument>,
  ) {
    super(contactModel);
  }
}

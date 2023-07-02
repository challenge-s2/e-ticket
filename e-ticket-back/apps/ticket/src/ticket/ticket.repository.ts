import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDocument } from './entity/ticket.entity';

@Injectable()
export class TicketRepository extends AbstractRepository<TicketDocument> {
  protected readonly logger = new Logger(TicketRepository.name);

  constructor(
    @InjectModel(TicketDocument.name) ticketModel: Model<TicketDocument>,
  ) {
    super(ticketModel);
  }
}

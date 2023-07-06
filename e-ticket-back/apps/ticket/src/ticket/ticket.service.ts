import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketRepository } from './ticket.repository';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}
  async create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.create({
      ...createTicketDto,
      creationDate: new Date(),
      scanned: false,
    });
  }

  async getAll() {
    return this.ticketRepository.findAll({});
  }

  async getOne(id: string) {
    return this.ticketRepository.findOne({ _id: id });
  }

  async getAllByCompanyId(companyId: string) {
    return this.ticketRepository.findAll({ companyId });
  }

  async getLastByCompanyId(companyId: string) {
    return this.ticketRepository.findLast({ companyId });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateTicketDto },
    );
  }

  async delete(ticketId: string) {
    return this.ticketRepository.findOneAndDelete({ _id: ticketId });
  }
}

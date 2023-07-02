import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { map } from 'rxjs';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientProxy,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.ticketClient
      .send('createTicket', createTicketDto)
      .pipe(map((message: string) => ({ message })));
  }

  async getAll() {
    return this.ticketClient
      .send('getAllTickets', '')
      .pipe(map((message: string) => ({ message })));
  }

  async getAllByCompanyId(companyId: string) {
    return this.ticketClient
      .send('getAllTicketsByCompanyId', companyId)
      .pipe(map((message: string) => ({ message })));
  }

  async getLastByCompanyId(companyId: string) {
    return this.ticketClient
      .send('getLastTicketByCompanyId', companyId)
      .pipe(map((message: string) => ({ message })));
  }
}

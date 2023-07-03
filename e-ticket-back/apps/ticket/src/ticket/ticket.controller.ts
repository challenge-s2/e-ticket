import { Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @MessagePattern('createTicket')
  create(@Payload() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @MessagePattern('getAllTickets')
  getAll() {
    return this.ticketService.getAll();
  }

  @MessagePattern('getOneTicket')
  getOne(@Payload() id: string) {
    return this.ticketService.getOne(id);
  }

  @MessagePattern('getAllTicketsByCompanyId')
  getAllByCompanyId(@Payload() companyId: string) {
    return this.ticketService.getAllByCompanyId(companyId);
  }

  @MessagePattern('getLastTicketByCompanyId')
  getLastByCompanyId(@Payload() companyId: string) {
    return this.ticketService.getLastByCompanyId(companyId);
  }

  @MessagePattern('deleteTicket')
  delete(@Payload() ticketId: string) {
    return this.ticketService.delete(ticketId);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  async getAll() {
    return this.ticketService.getAll();
  }

  @Get('company/:companyId')
  async getAllByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getAllByCompanyId(companyId);
  }

  @Get(':companyId')
  async getLastByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getLastByCompanyId(companyId);
  }
}

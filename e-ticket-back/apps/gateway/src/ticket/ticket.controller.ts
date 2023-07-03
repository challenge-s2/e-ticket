import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.ticketService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string) {
    return this.ticketService.getOne(id);
  }

  @Get('company/:companyId')
  @UseGuards(JwtAuthGuard)
  async getAllByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getAllByCompanyId(companyId);
  }

  @Get(':companyId')
  @UseGuards(JwtAuthGuard)
  async getLastByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getLastByCompanyId(companyId);
  }
}

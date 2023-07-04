import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { AccessControlInterceptor } from '@app/common/interceptors/acccess-control.interceptor';
import { UpdateCompanyDto } from '../company/dto/update-company.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@UseInterceptors(AccessControlInterceptor)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async getAll() {
    return this.ticketService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async getOne(@Param('id') id: string) {
    return this.ticketService.getOne(id);
  }

  @Get('company/:companyId')
  @UseGuards(JwtAuthGuard)
  async getAllByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getAllByCompanyId(companyId);
  }

  @Get('last/:companyId')
  @UseGuards(JwtAuthGuard) //TODO doit être modifier pour pouvoir être affiché si on est pas connecté
  async getLastByCompanyId(@Param('companyId') companyId: string) {
    return this.ticketService.getLastByCompanyId(companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  //TODO route pour scanner=true le ticket sans jwt

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async delete(@Param('ticketId') ticketId: string) {
    return this.ticketService.delete(ticketId);
  }
}

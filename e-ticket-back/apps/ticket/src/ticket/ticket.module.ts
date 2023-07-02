import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { DatabaseModule } from '@app/common';
import { TicketDocument, TicketSchema } from './entity/ticket.entity';
import { TicketRepository } from './ticket.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: TicketDocument.name, schema: TicketSchema },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
  exports: [TicketService, TicketRepository],
})
export class TicketModule {}

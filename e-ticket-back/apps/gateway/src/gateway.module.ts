import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { FidelityController } from './fidelity/fidelity.controller';
import { FidelityService } from './fidelity/fidelity.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 3002,
        },
      },
      {
        name: 'COMPANY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'company',
          port: 3004,
        },
      },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'products',
          port: 3005,
        },
      },
      {
        name: 'TICKET_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'ticket',
          port: 3006,
        },
      },
      {
        name: 'FIDELITY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'fidelity',
          port: 3007,
        },
      },
      {
        name: 'CONTACT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'contact',
          port: 3008,
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    UsersController,
    CompanyController,
    ProductsController,
    TicketController,
    FidelityController,
  ],
  providers: [
    AuthService,
    UsersService,
    CompanyService,
    ProductsService,
    TicketService,
    FidelityService,
  ],
})
export class GatewayModule {}

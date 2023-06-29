import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { UsersModule } from './users/users.module';
import {CompanyController} from "./company/company.controller";
import {CompanyService} from "./company/company.service";

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
    ]),
  ],
  controllers: [AuthController, UsersController, CompanyController],
  providers: [AuthService, UsersService, CompanyService],
})
export class GatewayModule {}

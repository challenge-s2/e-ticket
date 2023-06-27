import {Module} from '@nestjs/common';
import {UsersService} from "./users/users.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {UsersController} from "./users/users.controller";
import {AuthenticationService} from "./auth/auth.service";
import {AuthenticationController} from "./auth/auth.controller";

@Module({
  imports: [ClientsModule.register([
    {
      name: 'SERVICE_USER',
      transport: Transport.TCP,
      options: {
        host: 'users-service',
        port: 3001,
      },
    },
    {
      name: 'AUTH_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'auth-service',
        port: 3002
      }
    }
  ])],
  providers: [UsersService, AuthenticationService],
  controllers: [UsersController, AuthenticationController]
})
export class AppModule {}

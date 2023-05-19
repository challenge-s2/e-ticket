import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import {ClientsModule} from "@nestjs/microservices";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {AuthenticationController} from "./authentication.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        options: {
          host: 'users-service',
          port: 3001
        }
      }
    ]),
    JwtModule.register({
      global: true,
      secret: "I SWEAR TO GOD IF I SEE THIS IN A REAL PROJECT I WILL KILL YOU DO YOU UNDERSTAND???",
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule { }

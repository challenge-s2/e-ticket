import {Module} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthModule} from "./auth/auth.module";
import {AuthController} from "./auth/auth.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [ClientsModule.register([
    {
      name: 'SERVICE_AUTH',
      transport: Transport.TCP,
      options: {
        host: 'auth-back',
        port: 3001,
      },
    }
  ])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AppModule {}

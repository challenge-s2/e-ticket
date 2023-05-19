import { Module } from '@nestjs/common';
import {AuthenticationModule} from "./auth/authentication.module";
import {AuthenticationController} from "./auth/authentication.controller";
import {AuthenticationService} from "./auth/authentication.service";

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

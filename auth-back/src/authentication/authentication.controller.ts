import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { LoginRequest } from "./authentication.request";
import { AuthenticationService } from "./authentication.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller("authentication")
export class AuthenticationController {
  public constructor(private readonly authenticationService: AuthenticationService) { }

  @MessagePattern({cmd: 'login'})
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    return this.authenticationService.login(loginRequest);
  }
}

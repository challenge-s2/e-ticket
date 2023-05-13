import {Body, Catch, Controller, Get, Post, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import {createUserRequest} from "./user.request";
import {AppFilter} from "../filters/exceptions.filter";
import {LoginRequest} from "./login.request";

@Controller('users')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @Get('findAll')
  public getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseFilters(new AppFilter())
  @Post('create')
  public createUser(@Body() createUserRequest: createUserRequest) {
    return this.authService.createUser(createUserRequest);
  }
}

import {Body, Controller, Get, Post, UseFilters} from '@nestjs/common';
import { UsersService } from './users.service';
import {createUserRequest} from "./user.request";
import {AppFilter} from "../filters/exceptions.filter";

@Controller('users')
export class UsersController {
  constructor(public readonly authService: UsersService) {}

  @UseFilters(new AppFilter())
  @Get('getUsers')
  public getUsers() {
    return this.authService.getUsers();
  }

  @UseFilters(new AppFilter())
  @Post('createUser')
  public createUser(@Body() createUserRequest: createUserRequest) {
    return this.authService.createUser(createUserRequest);
  }
}

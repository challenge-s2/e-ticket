import {Body, Controller, Get, HttpCode, Post, UseFilters, UseInterceptors} from "@nestjs/common";
import { Role } from "src/authentication/authentication.enum";
import { AuthenticationRequired, HasRole } from "../authentication/authentication.decorator";
import { UsersService } from "./users.service";
import {UsersRequest} from "./users.request";
import {EventPattern, MessagePattern} from "@nestjs/microservices";
import {AppFilter} from "../filters/exceptions.filter";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /*@AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  @HttpCode(200)
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  public registerUser(@Body() usersRequest: UsersRequest) {
    return this.usersService.registerUser(usersRequest);
  }

  @EventPattern('getMicroUsers')
  createUser() {
    return this.usersService.getUsers();
  }*/
  @UseFilters(new AppFilter())
  @MessagePattern({cmd: 'register'})
  createUser(@Body() usersRequest: UsersRequest) {
    return this.usersService.registerUser(usersRequest)
  }

  @MessagePattern({cmd: 'all'})
  getAllUsers() {
    return this.usersService.getUsers()
  }
}

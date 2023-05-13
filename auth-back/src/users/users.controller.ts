import {Body, Controller, Get, HttpCode, Post} from "@nestjs/common";
import { Role } from "src/authentication/authentication.enum";
import { AuthenticationRequired, HasRole } from "../authentication/authentication.decorator";
import { UsersService } from "./users.service";
import {UsersRequest} from "./users.request";

@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) { }

  @AuthenticationRequired()
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
}

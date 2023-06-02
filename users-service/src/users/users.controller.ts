import {Body, Controller, UseFilters} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {UsersService} from "./users.service";
import {UsersRequest} from "./users.request";
import {AppFilter} from "../filters/exceptions.filter";
import {User} from "./users.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseFilters(new AppFilter())
    @MessagePattern({ cmd: 'getUsers' })
    getUsers() {
        return this.userService.getUsers();
    }

    @UseFilters(new AppFilter())
    @MessagePattern({ cmd: 'createUser' })
    createUser(@Body() usersRequest: UsersRequest) {
        return this.userService.createUser(usersRequest);
    }
}

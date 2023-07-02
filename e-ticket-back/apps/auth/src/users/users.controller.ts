import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(id) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}

import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'createUserCompany' })
  async createUserCompany(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUserCompany(createUserDto);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(id) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @MessagePattern('verifyUser')
  async verifyUser(email: string, password: string) {
    console.log('ça passe par là');
    return this.usersService.verifyUser(email, password);
  }
}

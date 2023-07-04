import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard, Roles } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('company')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async createUserCompany(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUserCompany(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById({ _id: id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUsersDto: UpdateUserDto) {
    return this.usersService.update(id, updateUsersDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard, Roles } from '@app/common';
import { AccessControlInterceptor } from '@app/common/interceptors/acccess-control.interceptor';

@UseInterceptors(AccessControlInterceptor)
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
}

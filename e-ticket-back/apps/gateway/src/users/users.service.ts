import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('COMPANY_SERVICE') private readonly companyClient: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.authClient
      .send({ cmd: 'createUser' }, createUserDto)
      .pipe(map((message: string) => ({ message })));
  }

  async createUserCompany(createUserDto: CreateUserDto) {
    return this.authClient
      .send({ cmd: 'createUserCompany' }, createUserDto)
      .pipe(map((message: string) => ({ message })));
  }

  async getUserById(getUserDto: GetUserDto) {
    return this.authClient
      .send({ cmd: 'getUserById' }, getUserDto)
      .pipe(map((message: string) => ({ message })));
  }

  async getAllUsers() {
    const pattern = { cmd: 'getAllUsers' };
    return this.authClient
      .send(pattern, '')
      .pipe(map((message: string) => ({ message })));
  }

  async delete(id: string) {
    return this.authClient
      .send('deleteUser', id)
      .pipe(map((message: string) => ({ message })));
  }
}

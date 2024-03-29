import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { compare, hash } from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      roles: ['USER'],
      ticketsScanned: [],
    });
  }

  async createUserCompany(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      roles: ['COMPANY'],
      ticketsScanned: [],
    });
  }

  async validateCreateUserDto(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
    return;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  async getUserById(id: string) {
    return this.usersRepository.findOne({ _id: id });
  }

  async getAllUsers() {
    return this.usersRepository.findAll({});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    return this.usersRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
    );
  }

  async delete(id: string) {
    return this.usersRepository.findOneAndDelete({ _id: id });
  }
}

import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { hash } from "bcryptjs";
import { Role } from 'src/authentication/authentication.enum';
import {UsersRequest} from "./users.request";

@Injectable()
export class UsersService {
  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  public async seed() {
    const userPassword = await hash("password", 10);
    const administratorPassword = await hash("password", 10);

    await this.userRepository.delete({});

    await this.userRepository.insert({
      role: Role.ADMINISTRATOR,
      email: "administrator@domain.com",
      password: administratorPassword
    })

    return this.userRepository.insert({
      role: Role.USER,
      email: "user@domain.com",
      password: userPassword
    })
  }

  public getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  public getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  public getUsers() {
    return this.userRepository.find();
  }

  public async registerUser(usersRequest: UsersRequest) {
    const { email } = usersRequest;
    if (await this.getUserByEmail(email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    usersRequest.password = await hash(usersRequest.password, 10);
    usersRequest.role = Role.USER;
    return this.userRepository.insert(usersRequest)
  }
}

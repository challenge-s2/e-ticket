import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersRepository } from './users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}
  async login(user: UserDocument) {
    const userInDb = await this.usersRepository.findOne({ email: user.email });
    if (!userInDb) {
      return new UnprocessableEntityException('User not found');
    }
    const passwordIsValid = await compare(user.password, userInDb.password);
    if (!passwordIsValid) {
      return new UnauthorizedException('Incorrect password');
    }
    const tokenPayload = {
      userId: userInDb._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const jwt = this.jwtService.sign(tokenPayload);
    return {
      user: userInDb,
      jwt: jwt,
    };
  }
  getHello(): string {
    return 'Hello World!';
  }
}

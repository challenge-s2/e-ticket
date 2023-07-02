import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UserDocument } from '../users/models/user.schema';
import { CurrentUser } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuth: ClientProxy,
  ) {}

  public login(@CurrentUser() user: UserDocument) {
    const pattern = { cmd: 'login' };
    return this.clientAuth
      .send(pattern, user)
      .pipe(map((message: string) => ({ message })));
  }
}

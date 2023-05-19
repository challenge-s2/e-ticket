import {BadRequestException, Inject, Injectable, RequestTimeoutException} from "@nestjs/common";
import {LoginRequest} from "./authentication.request";
import {compare} from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, throwError, timeout, TimeoutError} from "rxjs";

@Injectable()
export class AuthenticationService {
  public constructor(
      @Inject('USER_SERVICE')
      private readonly client: ClientProxy,
      private readonly jwtService: JwtService
  ) { }

  public async validateUser(loginRequest: LoginRequest) {
    //const user = await this.client.getUserByEmail(loginRequest.email);
    try {
      const { email, password } = loginRequest;
      const user = await this.client.send({ role: 'user', cmd: 'get' }, email)
          .pipe(
              timeout(5000),
              catchError(err => {
                if (err instanceof TimeoutError) {
                  return throwError(new RequestTimeoutException());
                }
                return throwError(err);
              }),)
          .toPromise();
      if(compare(password, user.password)) {
        return user;
      }

      return null;
    } catch (e) {
      throw e;
    }
  }

  async login(user) {
    const payload = { user, sub: user.id};

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }
}

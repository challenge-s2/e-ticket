import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = this.extractTokenFromHeader(request);
    if (!jwt) {
      return false;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const id = this.authClient
      .send('validate', jwt)
      .pipe(map((message: string) => ({ message })));
    const user = this.authClient
      .send({ cmd: 'getUserById' }, id)
      .pipe(map((message: string) => ({ message })));
    if (!user) {
      throw new BadRequestException('Invalid user');
    }
    return true;
    /* return this.authClient
      .send<UserDto>('verifyUser', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('this user does not have valid role');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      ); */
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

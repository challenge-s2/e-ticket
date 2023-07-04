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
    @Inject('COMPANY_SERVICE') private readonly companyClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = this.extractTokenFromHeader(request);
    if (!jwt) {
      return false;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    const validateJwt = await this.authClient
      .send('validate', jwt)
      .pipe(map((message: any) => ({ message })))
      .toPromise();
    const userId = validateJwt.message.userId;

    const getUserById = await this.authClient
      .send({ cmd: 'getUserById' }, userId)
      .pipe(map((message: any) => ({ message })))
      .toPromise();

    const user = getUserById.message;
    if (!user) {
      throw new UnauthorizedException('User is not valid');
    }

    request.user = user;

    const getCompanyByUserId = await this.companyClient
      .send('findCompanyByUserId', userId)
      .pipe(map((message: any) => ({ message })))
      .toPromise();

    if (getCompanyByUserId) {
      request.user.company = getCompanyByUserId.message;
    }

    if (roles) {
      if (!user.roles?.some((role) => roles.includes(role))) {
        this.logger.error('The user does not have valid roles.');
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

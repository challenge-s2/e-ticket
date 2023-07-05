import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccessControlInterceptor implements NestInterceptor {
  constructor(
    @Inject('COMPANY_SERVICE') private readonly companyClient: ClientProxy,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const currentUser: any = request.user;
    console.log(currentUser);
    if (currentUser && currentUser.roles.includes('COMPANY')) {
      const requestedCompanyId = request.params.companyId;

      if (
        requestedCompanyId &&
        currentUser.company._id !== requestedCompanyId
      ) {
        throw new ForbiddenException('Forbidden access');
      }
    }

    return next.handle();
  }
}

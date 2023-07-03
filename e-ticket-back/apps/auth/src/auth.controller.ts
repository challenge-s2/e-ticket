import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from './users/models/user.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Body() user: UserDocument) {
    return await this.authService.login(user);
  }

  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    console.log(data);
    return data.user;
  }

  @MessagePattern('validate')
  async validate(@Payload() token: string) {
    return this.authService.validate(token);
  }
}

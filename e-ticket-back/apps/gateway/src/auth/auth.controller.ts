import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from '../users/models/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() @CurrentUser() user: UserDocument) {
    return this.authService.login(user);
  }
}

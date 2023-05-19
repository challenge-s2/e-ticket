import {Body, Controller, Post} from "@nestjs/common";
import {AuthenticationService} from "./auth.service";
import {LoginRequest} from "../users/login.request";

@Controller('auth')
export class AuthenticationController {
    constructor(public readonly authService: AuthenticationService) { }

    @Post('login')
    public login(@Body() loginRequest: LoginRequest) {
        return this.authService.login(loginRequest);
    }
}
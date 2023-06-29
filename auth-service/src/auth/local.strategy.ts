import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthenticationService} from "./authentication.service";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {LoginRequest} from "./authentication.request";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        super();
    }

    async validate(loginRequest: LoginRequest): Promise<any> {
        const user = await this.authService.validateUser(loginRequest);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
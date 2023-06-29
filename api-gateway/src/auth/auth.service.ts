import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {LoginRequest} from "../users/login.request";
import {map} from "rxjs";

@Injectable()
export class AuthenticationService {
    constructor(@Inject("AUTH_SERVICE") private readonly clientAuthApp: ClientProxy) {}

    public login(loginRequest: LoginRequest) {
        const pattern = {cmd: 'login'}
        return this.clientAuthApp.send(pattern, loginRequest).pipe(map((message: string) => ({message})))
    }
}
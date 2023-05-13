import {Inject, Injectable} from '@nestjs/common';
import {map} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {createUserRequest} from "./user.request";
import {LoginRequest} from "./login.request";

@Injectable()
export class AuthService {
    constructor(@Inject("SERVICE_AUTH") private readonly clientAuthApp: ClientProxy) {}

    public login(loginRequest: LoginRequest) {
        const pattern = {cmd: 'login'}
        return this.clientAuthApp.send(pattern, loginRequest).pipe(map((message: string) => ({message})))
    }

    public getAllUsers() {
        const pattern = {cmd: 'all'};
        const payload = {};
        return this.clientAuthApp.send(pattern, payload).pipe(map((message: string) => ({message})))
    }

    public async createUser(createUserRequest: createUserRequest) {
        const pattern = {cmd: 'register'};
        return this.clientAuthApp.send(pattern, createUserRequest).pipe(map((message: string) => ({message})))
    }
}
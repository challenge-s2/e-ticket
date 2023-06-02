import {Inject, Injectable} from '@nestjs/common';
import {map} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {createUserRequest} from "./user.request";

@Injectable()
export class UsersService {
    constructor(@Inject("SERVICE_USER") private readonly clientAuthApp: ClientProxy) {}

    public getUsers() {
        const pattern = {cmd: 'getUsers'};
        const payload = {};
        return this.clientAuthApp.send(pattern, payload).pipe(map((message: string) => ({message})))
    }

    public async createUser(createUserRequest: createUserRequest) {
        const pattern = {cmd: 'createUser'};
        return this.clientAuthApp.send(pattern, createUserRequest).pipe(map((message: string) => ({message})))
    }
}
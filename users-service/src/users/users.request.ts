import {IsDefined, IsEmail, IsString} from "class-validator";
import {Role} from "./role.enum";

export class UsersRequest {
    email: string;

    password: string;

    role: Role;
}
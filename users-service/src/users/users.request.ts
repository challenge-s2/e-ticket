import {IsDefined, IsEmail, IsString} from "class-validator";
import {Role} from "./role.enum";

export class UsersRequest {
    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    password: string;

    role: Role;
}
import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {Role} from "./role.enum";
import {UsersRequest} from "./users.request";
import {hash} from "bcryptjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UsersService {
    public constructor(@InjectModel(User.name, 'user') private userModel: Model<User>) {
    }

    public getUsers() {
        return this.userModel.find().exec();
    }

    public async createUser(usersRequest: UsersRequest) {
        const { email } = usersRequest;
        if (await this.getUserByEmail(email)) {
            throw new BadRequestException('User already exists')
        }
        usersRequest.password = await hash(usersRequest.password, 10);
        usersRequest.role = Role.USER;
        return this.userModel.create(usersRequest)
    }

    public getUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
}

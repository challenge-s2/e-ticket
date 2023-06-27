import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {Role} from "./role.enum";
import {UsersRequest} from "./users.request";
import {hash} from "bcryptjs";

@Injectable()
export class UsersService {

    public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    public getUsers() {
        return this.userRepository.find();
    }

    public async createUser(usersRequest: UsersRequest) {
        const { email } = usersRequest;
        if (await this.getUserByEmail(email)) {
            throw new BadRequestException('User already exists')
        }
        usersRequest.password = await hash(usersRequest.password, 10);
        usersRequest.role = Role.USER;
        return this.userRepository.insert(usersRequest)
    }

    public getUserByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }
}

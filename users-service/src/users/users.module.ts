import {User} from "./users.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: User}])
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
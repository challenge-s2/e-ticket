import { Role } from "./role.enum";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4();
    }
    })
    _id;

    @Prop({ length: 50, isRequired: true, unique: true })
    email: string;

    @Prop({ length: 60, isRequired: false })
    password: string;

    @Prop({ isRequired: true,})
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User)

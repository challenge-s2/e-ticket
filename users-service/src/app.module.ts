import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "auth-mysql",
      port: 3306,
      username: "user",
      password: "password",
      database: "auth",
      autoLoadEntities: true,
      synchronize: true
    }),
      UsersModule
  ],
})
export class AppModule {}

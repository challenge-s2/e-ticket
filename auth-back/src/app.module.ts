import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SeedService } from "./seed/seed.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "auth-mysql",
      port: 3306,
      username: "user",
      password: "password",
      database: "auth",
    }),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService]
})
export class AppModule { }

import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShopService} from "./shop/shop.service";
import {ShopController} from "./shop/shop.controller";
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: "mysql",
          host: "shop-mysql",
          port: 3306,
          username: "user",
          password: "password",
          database: "shop",
          autoLoadEntities: true,
          synchronize: true
      }),
      ShopModule
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class AppModule {}

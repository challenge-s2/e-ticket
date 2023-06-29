import { NestFactory } from '@nestjs/core';
import { CompanyModule } from './company/company.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CompanyModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3004
    }
  });
  await app.listen();
}
bootstrap();

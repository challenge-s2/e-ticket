import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductsModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3005,
    },
  });
  await app.listen();
}
bootstrap();

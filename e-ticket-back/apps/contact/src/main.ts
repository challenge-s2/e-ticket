import { NestFactory } from '@nestjs/core';
import { ContactModule } from './contact/contact.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ContactModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3008,
    },
  });
  await app.listen();
}
bootstrap();
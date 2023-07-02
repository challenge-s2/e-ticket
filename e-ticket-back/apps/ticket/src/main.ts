import { NestFactory } from '@nestjs/core';
import { TicketModule } from './ticket/ticket.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TicketModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3006,
    },
  });
  await app.listen();
}
bootstrap();

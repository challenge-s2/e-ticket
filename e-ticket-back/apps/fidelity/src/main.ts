import { NestFactory } from '@nestjs/core';
import { FidelityModule } from './fidelity/fidelity.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(FidelityModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3007,
    },
  });
  await app.listen();
}
bootstrap();

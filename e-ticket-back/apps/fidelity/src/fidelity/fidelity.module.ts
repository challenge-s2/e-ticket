import { Module } from '@nestjs/common';
import { FidelityController } from './fidelity.controller';
import { FidelityService } from './fidelity.service';
import { DatabaseModule } from '@app/common';
import { FidelityDocument, FidelitySchema } from './entities/fidelity.entity';
import { FidelityRepository } from './fidelity.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: FidelityDocument.name, schema: FidelitySchema },
    ]),
  ],
  controllers: [FidelityController, FidelityRepository],
  providers: [FidelityService, FidelityRepository],
})
export class FidelityModule {}

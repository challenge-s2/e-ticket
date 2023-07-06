import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { DatabaseModule } from '@app/common';
import { ContactDocument, ContactSchema } from './entities/contact.entity';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ContactDocument.name, schema: ContactSchema },
    ]),
  ],
  controllers: [ContactController, ContactRepository],
  providers: [ContactService, ContactRepository],
})
export class ContactModule {}

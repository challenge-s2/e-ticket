import { Controller, Get } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern('createContact')
  create(@Payload() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @MessagePattern('findAllContacts')
  findAll() {
    return this.contactService.findAll();
  }

  @MessagePattern('findOneContact')
  findOne(@Payload() id: string) {
    return this.contactService.findOne(id);
  }

  @MessagePattern('updateContact')
  update(@Payload() data) {
    const id = data.id;
    const updateContactDto: UpdateContactDto = data.update;
    return this.contactService.update(id, updateContactDto);
  }

  @MessagePattern('deleteContact')
  delete(@Payload() id: string) {
    return this.contactService.delete(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateContactDto } from './dto/create-contact.dto';
import { map } from 'rxjs';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_SERVICE') private readonly contactClient: ClientProxy,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return this.contactClient
      .send('createContact', createContactDto)
      .pipe(map((message: string) => ({ message })));
  }

  async findAll() {
    return this.contactClient
      .send('findAllContacts', '')
      .pipe(map((message: string) => ({ message })));
  }

  async findOne(id: string) {
    return this.contactClient
      .send('findOneContact', id)
      .pipe(map((message: string) => ({ message })));
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactClient
      .send('updateContact', { id, update: updateContactDto })
      .pipe(map((message: string) => ({ message })));
  }

  async delete(id: string) {
    return this.contactClient
      .send('deleteContact', id)
      .pipe(map((message: string) => ({ message })));
  }
}

import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactRepository } from './contact.repository';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  create(createContactDto: CreateContactDto) {
    return this.contactRepository.create({
      ...createContactDto,
      status: 'pending',
    });
  }

  findAll() {
    return this.contactRepository.findAll({});
  }

  findOne(id: string) {
    return this.contactRepository.findOne({ _id: id });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateContactDto },
    );
  }

  delete(id: string) {
    return this.contactRepository.findOneAndDelete({ _id: id });
  }
}

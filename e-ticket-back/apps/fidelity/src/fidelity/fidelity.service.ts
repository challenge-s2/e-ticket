import { Injectable } from '@nestjs/common';
import { FidelityRepository } from './fidelity.repository';
import { CreateFidelityDto } from './dto/create-fidelity.dto';
import { UpdateFidelityDto } from './dto/update-fidelity.dto';

@Injectable()
export class FidelityService {
  constructor(private readonly fidelityRepository: FidelityRepository) {}

  create(creatFidelityDto: CreateFidelityDto) {
    return this.fidelityRepository.create({ ...creatFidelityDto });
  }

  findAll() {
    return this.fidelityRepository.findAll({});
  }

  findOneByUserMailAndCompanyId(userMail: string, companyId: string) {
    return this.fidelityRepository.findOne({ userMail, companyId });
  }

  findAllByUserId(userId: string) {
    return this.fidelityRepository.findAll({ userId: userId });
  }

  update(id: string, updateFidelityDto: UpdateFidelityDto) {
    return this.fidelityRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateFidelityDto },
    );
  }

  delete(id: string) {
    return this.fidelityRepository.findOneAndDelete({ _id: id });
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FidelityRepository } from './fidelity.repository';
import { CreateFidelityDto } from './dto/create-fidelity.dto';
import { UpdateFidelityDto } from './dto/update-fidelity.dto';

@Injectable()
export class FidelityService {
  constructor(private readonly fidelityRepository: FidelityRepository) {}

  async create(creatFidelityDto: CreateFidelityDto) {
    await this.validateFidelity(creatFidelityDto);
    return this.fidelityRepository.create({ ...creatFidelityDto });
  }

  async validateFidelity(createFidelityDto: CreateFidelityDto) {
    const fidelity = await this.fidelityRepository.findOne({
      userId: createFidelityDto.userId,
      companyId: createFidelityDto.companyId,
    });
    console.log(fidelity)
    if (fidelity) {
      throw new UnprocessableEntityException(
        'Fidelity for this user/company already exists',
      );
    }
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

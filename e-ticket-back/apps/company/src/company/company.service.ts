import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.create({
      ...createCompanyDto,
      registerDate: new Date(),
      qrCode: null,
    });
  }

  findAll() {
    return this.companyRepository.findAll({});
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ _id: id });
  }

  findCompanyByUserId(userId: string) {
    return this.companyRepository.findOne({ userId: userId });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateCompanyDto },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

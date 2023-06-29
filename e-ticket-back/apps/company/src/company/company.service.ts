import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {CompanyRepository} from "./company.repository";

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {
  }
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.create({...createCompanyDto, registerDate: new Date()});
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
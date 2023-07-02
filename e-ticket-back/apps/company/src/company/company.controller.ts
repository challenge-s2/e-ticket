import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern('createCompany')
  create(@Payload() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @MessagePattern('findAllCompany')
  findAll() {
    return this.companyService.findAll();
  }

  @MessagePattern('findOneCompany')
  findOne(@Payload() id: string) {
    return this.companyService.findOne(id);
  }

  @MessagePattern('findCompanyByUserId')
  findCompanyByUserId(@Payload() userId: string) {
    return this.companyService.findCompanyByUserId(userId);
  }

  @MessagePattern('updateCompany')
  update(@Payload() data) {
    const id = data.id;
    const updateCompanyDto = data.update;
    return this.companyService.update(id, updateCompanyDto);
  }

  @MessagePattern('deleteCompany')
  delete(@Payload() id: string) {
    return this.companyService.delete(id);
  }
}

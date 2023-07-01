import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @Get(':id')
  async findCompanyById(@Param('id') id: string) {
    return this.companyService.findCompanyById(id);
  }

  @Get('/user/:userId')
  async findCompanyByUserId(@Param('userId') userId: string) {
    return this.companyService.findCompanyByUserId(userId);
  }
}

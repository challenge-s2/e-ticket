import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findCompanyById(@Param('id') id: string) {
    return this.companyService.findCompanyById(id);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  async findCompanyByUserId(@Param('userId') userId: string) {
    return this.companyService.findCompanyByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}

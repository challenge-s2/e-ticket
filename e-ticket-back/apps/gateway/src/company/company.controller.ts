import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { AccessControlInterceptor } from '@app/common/interceptors/acccess-control.interceptor';

@UseInterceptors(AccessControlInterceptor)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async findCompanyById(@Param('id') id: string) {
    return this.companyService.findCompanyById(id);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async findCompanyByUserId(@Param('userId') userId: string) {
    return this.companyService.findCompanyByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}

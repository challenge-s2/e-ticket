import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {CompanyRepository} from "./company.repository";
import {DatabaseModule} from "@app/common";
import {CompanyDocument, CompanySchema} from "./entities/company.entity";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: CompanyDocument.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService, CompanyRepository],
})
export class CompanyModule {}

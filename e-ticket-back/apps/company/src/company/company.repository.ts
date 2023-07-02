import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { CompanyDocument } from "./entities/company.entity";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompanyRepository extends AbstractRepository<CompanyDocument> {
    protected readonly logger = new Logger(CompanyRepository.name);

    constructor(@InjectModel(CompanyDocument.name) companyModel: Model<CompanyDocument>) {
        super(companyModel);
    }
}

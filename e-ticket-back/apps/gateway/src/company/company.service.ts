import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {map} from "rxjs";

@Injectable()
export class CompanyService {
    constructor(@Inject('COMPANY_SERVICE') private readonly companyClient: ClientProxy) {
    }

    async createCompany(createCompanyDto: CreateCompanyDto) {
        return this.companyClient
            .send('createCompany', createCompanyDto)
            .pipe(map((message: string) => ({message})));
    }
}
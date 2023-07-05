import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFidelityDto } from './dto/create-fidelity.dto';
import { map } from 'rxjs';
import { UpdateFidelityDto } from './dto/update-fidelity.dto';

@Injectable()
export class FidelityService {
  constructor(
    @Inject('FIDELITY_SERVICE') private readonly fidelityClient: ClientProxy,
  ) {}

  async create(createFidelityDto: CreateFidelityDto) {
    return this.fidelityClient
      .send('createFidelity', createFidelityDto)
      .pipe(map((message: string) => ({ message })));
  }

  async findAll() {
    return this.fidelityClient
      .send('findAllFidelity', '')
      .pipe(map((message: string) => ({ message })));
  }

  async findOneByUserIdAndCompanyId(userId: string, companyId: string) {
    return this.fidelityClient
      .send('findOneFidelityByUserIdAndCompanyId', {
        userId: userId,
        companyId: companyId,
      })
      .pipe(map((message: string) => ({ message })));
  }

  async findAllByUserId(userId: string) {
    return this.fidelityClient
      .send('findAllFidelitiesByUserId', userId)
      .pipe(map((message: string) => ({ message })));
  }

  async update(id: string, updateFidelityDto: UpdateFidelityDto) {
    return this.fidelityClient
      .send('updateFidelity', { id: id, update: updateFidelityDto })
      .pipe(map((message: string) => ({ message })));
  }

  async delete(id: string) {
    return this.fidelityClient
      .send('deleteFidelity', id)
      .pipe(map((message: string) => ({ message })));
  }
}

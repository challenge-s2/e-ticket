import { Controller } from '@nestjs/common';
import { FidelityService } from './fidelity.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFidelityDto } from './dto/create-fidelity.dto';

@Controller()
export class FidelityController {
  constructor(private readonly fidelityService: FidelityService) {}

  @MessagePattern('createFidelity')
  async create(@Payload() createFidelityDto: CreateFidelityDto) {
    return this.fidelityService.create(createFidelityDto);
  }

  @MessagePattern('findAllFidelity')
  async findAll() {
    return this.fidelityService.findAll();
  }

  @MessagePattern('findAllFidelityByUserIdAndCompanyId')
  async findOneByUserIdAndCompanyId(@Payload() data: any) {
    return this.fidelityService.findOneByUserIdAndCompanyId(
      data.userId,
      data.companyId,
    );
  }

  @MessagePattern('findAllFidelitiesByUserId')
  async findAllByUserId(@Payload() userId: string) {
    return this.fidelityService.findAllByUserId(userId);
  }

  @MessagePattern('updateFidelity')
  async update(@Payload() data: any) {
    const id = data.id;
    const updateFidelityDto = data.update;
    return this.fidelityService.update(id, updateFidelityDto);
  }

  @MessagePattern('deleteCompany')
  async delete(@Payload() id: string) {
    return this.fidelityService.delete(id);
  }
}

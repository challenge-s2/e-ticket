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
import { FidelityService } from './fidelity.service';
import { CreateFidelityDto } from './dto/create-fidelity.dto';
import { UpdateFidelityDto } from './dto/update-fidelity.dto';
import { AccessControlInterceptor } from '@app/common/interceptors/acccess-control.interceptor';
import { JwtAuthGuard, Roles } from '@app/common';

@UseInterceptors(AccessControlInterceptor)
@Controller('fidelity')
export class FidelityController {
  constructor(private readonly fidelityService: FidelityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFidelityDto: CreateFidelityDto) {
    return this.fidelityService.create(createFidelityDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  findAll() {
    return this.fidelityService.findAll();
  }

  @Get('one/:companyId/:userMail')
  @UseGuards(JwtAuthGuard)
  findOneByUserIdAndCompanyId(
    @Param('companyId') companyId: string,
    @Param('userMail') userMail: string,
  ) {
    return this.fidelityService.findOneByUserMailAndCompanyId(
      userMail,
      companyId,
    );
  }

  @Get('byUser/:userId')
  @UseGuards(JwtAuthGuard)
  // @Roles('ADMIN')
  findAllByUserId(@Param('userId') userId: string) {
    return this.fidelityService.findAllByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateFidelityDto: UpdateFidelityDto,
  ) {
    return this.fidelityService.update(id, updateFidelityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('COMPANY', 'ADMIN')
  delete(@Param('id') id: string) {
    return this.fidelityService.delete(id);
  }
}

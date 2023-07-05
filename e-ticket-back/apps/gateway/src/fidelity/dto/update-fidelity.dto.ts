import { PartialType } from '@nestjs/mapped-types';
import { CreateFidelityDto } from './create-fidelity.dto';

export class UpdateFidelityDto extends PartialType(CreateFidelityDto) {}

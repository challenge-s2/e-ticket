import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsArray()
  @IsNotEmpty()
  listProducts: [];

  @IsString()
  @IsNotEmpty()
  companyInformations: string;

  @IsNumber()
  @IsOptional()
  promo: number;
}

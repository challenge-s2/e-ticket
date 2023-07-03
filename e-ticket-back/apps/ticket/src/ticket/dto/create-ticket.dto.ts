import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsArray()
  @IsNotEmpty()
  listProducts: [];
}

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsObject()
  @IsNotEmpty()
  listProducts: [];
}

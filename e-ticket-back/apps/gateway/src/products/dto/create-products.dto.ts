import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}

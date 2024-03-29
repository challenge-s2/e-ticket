import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFidelityDto {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userMail: string;

  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsNotEmpty()
  companyInformations: string;
}

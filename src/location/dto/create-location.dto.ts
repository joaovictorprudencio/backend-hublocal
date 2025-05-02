import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
  
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

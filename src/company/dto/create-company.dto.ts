import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    @IsNotEmpty()
    website: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

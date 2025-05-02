import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards,Request, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() createCompanyDto: CreateCompanyDto) {
   
    return this.companyService.create(createCompanyDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.companyService.findAllForUser(+id);
  }


  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}

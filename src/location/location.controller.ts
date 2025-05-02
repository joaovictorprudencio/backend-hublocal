import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get(':companyId')
  findAllForCompany(@Param('companyId') companyId: string) {
    return this.locationService.findAllForCompany(Number(companyId));
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(Number(id));
  }
}

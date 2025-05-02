import { Controller, Get, Post, Body, HttpStatus,HttpCode, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  @HttpCode(HttpStatus.OK)
  GetByEmail(@Param('email') email: string){
   return this.userService.findByEmail(email);
  }
  


}

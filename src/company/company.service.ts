import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CompanyService {

  constructor(private readonly prisma: PrismaService){}


   async create(createCompanyDto: CreateCompanyDto) {
    const { userId } = createCompanyDto;

    const userExists = await this.prisma.user.findUnique({
      where:{ id: userId},
    });

    if(!userExists){
      throw new NotFoundException('User NotFound');
    };
    const data = {
      ...createCompanyDto,
    };

    const createCompany = await this.prisma.company.create({data});
    
    return {
      createCompany
    };
  };

  async findAllForUser(userId: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }
  
    
    return this.prisma.company.findMany({
      where: { userId },
      include: {
        locations: true, 
      },
    });
  }


  async update(id: number, updateCompanyDto: UpdateCompanyDto) {

    const existingCompany = await this.prisma.company.findUnique({
      where: { id },
    });
  
    if (!existingCompany) {
      throw new Error(`Company with ID ${id} not found.`);
    }
  

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  
    return updatedCompany;
  }

async remove(id: number) {
  const existingCompany = await this.prisma.company.findUnique({
    where: { id },
  });

  if (!existingCompany) {
    throw new Error(`Company with ID ${id} not found.`);
  }

  await this.prisma.company.delete({
    where: { id },
  });

  return { message: `Company with ID ${id} has been deleted.` };
}

}

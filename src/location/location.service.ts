import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForCompany(companyId: number) {
    return this.prisma.location.findMany({
      where: { companyId },
    });
  }

  async create(createLocationDto: CreateLocationDto) {
    const { companyId, ...rest } = createLocationDto;

    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found.`);
    }

    return this.prisma.location.create({
      data: {
        ...rest,
        companyId,
      },
    });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const existingLocation = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new Error(`Location with ID ${id} not found.`);
    }

    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: number) {
    const existingLocation = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new Error(`Location with ID ${id} not found.`);
    }

    await this.prisma.location.delete({
      where: { id },
    });

    return { message: `Location with ID ${id} has been deleted.` };
  }
}
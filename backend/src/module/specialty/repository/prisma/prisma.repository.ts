import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISpecialtyRepository } from '../specialty.repository';
import { CreateSpecialtyDto } from '../../dto/create-specialty.dto';
import { Specialty } from '../../entity/specialty.entity';

@Injectable()
export class SpecialtyPrismaRepository implements ISpecialtyRepository {
  constructor(private prisma: PrismaService) {}

  async create(createSpecialty: CreateSpecialtyDto): Promise<Specialty> {
    const specialty = await this.prisma.specialty.create({
      data: createSpecialty,
      include: { demands: true },
    });
    return specialty;
  }

  async findAll(): Promise<Specialty[]> {
    const specialties = await this.prisma.specialty.findMany({
      include: { demands: true },
    });
    return specialties;
  }

  async findByName(name: string): Promise<Specialty | null> {
    const specialty = await this.prisma.specialty.findFirst({
      where: { name },
      include: { demands: true },
    });
    return specialty;
  }
}

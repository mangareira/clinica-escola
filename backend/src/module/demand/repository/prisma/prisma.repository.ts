import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDemandRepository } from '../demand.repository';
import { CreateDemandDto } from '../../dto/create-demand.dto';
import { UpdateDemandDto } from '../../dto/update-demand.dto';
import { Demand } from '../../entity/demand.entity';

@Injectable()
export class DemandPrismaRepository implements IDemandRepository {
  constructor(private prisma: PrismaService) {}

  async create(createDemand: CreateDemandDto): Promise<Demand> {
    const demand = await this.prisma.demand.create({
      data: createDemand,
    });
    return demand;
  }

  async findAll(): Promise<Demand[]> {
    const demands = await this.prisma.demand.findMany();
    return demands;
  }

  async findByName(name: string): Promise<Demand | null> {
    const demand = await this.prisma.demand.findFirst({
      where: { name },
    });
    return demand;
  }

  async findById(id: string): Promise<Demand | null> {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
    });
    return demand;
  }

  async update(id: string, updateDemand: UpdateDemandDto): Promise<Demand> {
    const demand = await this.prisma.demand.update({
      where: { id },
      data: updateDemand,
    });
    return demand;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.demand.delete({
      where: { id },
    });
  }
}

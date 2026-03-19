import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDemandRepository } from '../demand.repository';
import { CreateDemandDto } from '../../dto/create-demand.dto';
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
}

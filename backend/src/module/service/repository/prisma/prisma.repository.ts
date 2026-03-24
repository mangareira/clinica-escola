import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IServiceRepository } from '../service.repository';
import { CreateServiceDto } from '../../dto/create-service.dto';
import { UpdateServiceDto } from '../../dto/update-service.dto';
import { Service } from '../../entity/service.entity';

@Injectable()
export class ServicePrismaRepository implements IServiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(createService: CreateServiceDto): Promise<Service> {
    const service = await this.prisma.service.create({
      data: createService,
      include: { specialties: { include: { demands: true } } },
    });
    return service;
  }

  async findAll(): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
      include: { specialties: { include: { demands: true } } },
    });
    return services;
  }

  async findByType(type: string): Promise<Service | null> {
    const service = await this.prisma.service.findFirst({
      where: { type },
      include: { specialties: { include: { demands: true } } },
    });
    return service;
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { specialties: { include: { demands: true } } },
    });
    return service;
  }

  async update(id: string, updateService: UpdateServiceDto): Promise<Service> {
    const service = await this.prisma.service.update({
      where: { id },
      data: updateService,
      include: { specialties: { include: { demands: true } } },
    });
    return service;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({
      where: { id },
    });
  }
}

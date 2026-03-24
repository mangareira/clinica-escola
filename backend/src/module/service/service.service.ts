import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IServiceRepository } from './repository/service.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entity/service.entity';

@Injectable()
export class ServiceService {
  constructor(private serviceRepository: IServiceRepository) {}

  async create(createService: CreateServiceDto): Promise<Service> {
    const existsService = await this.serviceRepository.findByType(createService.type);

    if (existsService) {
      throw new HttpException('Serviço já existe', HttpStatus.BAD_REQUEST);
    }

    const service = await this.serviceRepository.create(createService);
    return service;
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }

  async update(id: string, updateService: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new HttpException('Serviço não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.serviceRepository.update(id, updateService);
  }

  async delete(id: string): Promise<void> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new HttpException('Serviço não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.serviceRepository.delete(id);
  }
}

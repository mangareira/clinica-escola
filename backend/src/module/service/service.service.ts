import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IServiceRepository } from './repository/service.repository';
import { CreateServiceDto } from './dto/create-service.dto';
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
}

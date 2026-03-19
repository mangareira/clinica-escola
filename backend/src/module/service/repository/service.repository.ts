import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entity/service.entity';

export abstract class IServiceRepository {
  abstract create(createService: CreateServiceDto): Promise<Service>;
  abstract findAll(): Promise<Service[]>;
  abstract findByType(type: string): Promise<Service | null>;
}

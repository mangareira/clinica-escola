import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entity/service.entity';

export abstract class IServiceRepository {
  abstract create(createService: CreateServiceDto): Promise<Service>;
  abstract findAll(): Promise<Service[]>;
  abstract findByType(type: string): Promise<Service | null>;
  abstract findById(id: string): Promise<Service | null>;
  abstract update(id: string, updateService: UpdateServiceDto): Promise<Service>;
  abstract delete(id: string): Promise<void>;
}

import { CreateDemandDto } from '../dto/create-demand.dto';
import { UpdateDemandDto } from '../dto/update-demand.dto';
import { Demand } from '../entity/demand.entity';

export abstract class IDemandRepository {
  abstract create(createDemand: CreateDemandDto): Promise<Demand>;
  abstract findAll(): Promise<Demand[]>;
  abstract findByName(name: string): Promise<Demand | null>;
  abstract findById(id: string): Promise<Demand | null>;
  abstract update(id: string, updateDemand: UpdateDemandDto): Promise<Demand>;
  abstract delete(id: string): Promise<void>;
}

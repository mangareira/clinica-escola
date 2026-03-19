import { CreateDemandDto } from '../dto/create-demand.dto';
import { Demand } from '../entity/demand.entity';

export abstract class IDemandRepository {
  abstract create(createDemand: CreateDemandDto): Promise<Demand>;
  abstract findAll(): Promise<Demand[]>;
  abstract findByName(name: string): Promise<Demand | null>;
}

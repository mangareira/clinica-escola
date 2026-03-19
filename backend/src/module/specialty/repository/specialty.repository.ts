import { CreateSpecialtyDto } from '../dto/create-specialty.dto';
import { Specialty } from '../entity/specialty.entity';

export abstract class ISpecialtyRepository {
  abstract create(createSpecialty: CreateSpecialtyDto): Promise<Specialty>;
  abstract findAll(): Promise<Specialty[]>;
  abstract findByName(name: string): Promise<Specialty | null>;
}

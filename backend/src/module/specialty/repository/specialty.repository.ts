import { CreateSpecialtyDto } from '../dto/create-specialty.dto';
import { UpdateSpecialtyDto } from '../dto/update-specialty.dto';
import { Specialty } from '../entity/specialty.entity';

export abstract class ISpecialtyRepository {
  abstract create(createSpecialty: CreateSpecialtyDto): Promise<Specialty>;
  abstract findAll(): Promise<Specialty[]>;
  abstract findByName(name: string): Promise<Specialty | null>;
  abstract findById(id: string): Promise<Specialty | null>;
  abstract update(id: string, updateSpecialty: UpdateSpecialtyDto): Promise<Specialty>;
  abstract delete(id: string): Promise<void>;
}

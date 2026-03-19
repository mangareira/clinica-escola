import { Specialty } from '../../specialty/entity/specialty.entity';

export class Service {
  id: string;
  type: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  specialties?: Specialty[];
}

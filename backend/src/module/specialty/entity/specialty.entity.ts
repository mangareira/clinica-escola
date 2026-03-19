import { Demand } from '../../demand/entity/demand.entity';

export class Specialty {
  id: string;
  name: string;
  serviceId: string | null;
  demands?: Demand[];
}

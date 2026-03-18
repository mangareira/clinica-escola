export type PatientType = 'Employee' | 'External' | 'Exempt';

export class Patient {
  id: string;
  name: string;
  phone: string | null;
  type: PatientType;
  createdAt: Date;
  updatedAt: Date;
}

import { CreatePatientDto } from '../dto/create-patient.dto';
import { Patient } from '../entities/patient.entity';

export abstract class IPatientRepository {
  abstract create(createPatient: CreatePatientDto): Promise<Patient>;
  abstract findByName(name: string): Promise<Patient | null>;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { IPatientRepository } from './repository/patient.repository';

@Injectable()
export class PatientService {
  constructor(private patientRepository: IPatientRepository) {}

  async create(createPatientDto: CreatePatientDto) {
    const isExist = await this.patientRepository.findByName(createPatientDto.name);

    if (isExist) throw new HttpException('O Paciente já existe', HttpStatus.BAD_REQUEST);

    const patient = await this.patientRepository.create(createPatientDto);

    return patient;
  }

  async findAll() {
    return this.patientRepository.findAll();
  }
}

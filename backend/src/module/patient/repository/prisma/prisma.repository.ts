import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { Patient } from '../../entities/patient.entity';
import { IPatientRepository } from '../patient.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientPrismaRepository implements IPatientRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPatient: CreatePatientDto): Promise<Patient> {
    return this.prisma.patient.create({ data: createPatient });
  }

  async findByName(name: string): Promise<Patient | null> {
    return this.prisma.patient.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      include: {
        appointments: {
          include: {
            service: true,
            specialty: true,
            demand: true,
            sessionHistory: true,
            payments: true,
            cashTransactions: true,
          },
        },
      },
    });
  }
}

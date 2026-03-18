import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientPrismaRepository } from './repository/prisma/prisma.repository';
import { IPatientRepository } from './repository/patient.repository';

@Module({
  controllers: [PatientController],
  providers: [
    PatientService,
    PrismaService,
    {
      useClass: PatientPrismaRepository,
      provide: IPatientRepository,
    },
  ],
})
export class PatientModule {}

import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { IAppointmentRepository } from './repository/appointment.repository';
import { AppointmentPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    PrismaService,
    {
      provide: IAppointmentRepository,
      useClass: AppointmentPrismaRepository,
    },
  ],
  exports: [AppointmentService, IAppointmentRepository],
})
export class AppointmentModule {}

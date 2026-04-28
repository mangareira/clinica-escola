import { Module } from '@nestjs/common';
import { AppointmentSessionController } from './appointment-session.controller';
import { AppointmentSessionService } from './appointment-session.service';
import { IAppointmentSessionRepository } from './repository/appointment-session.repository';
import { AppointmentSessionPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { AppointmentPaymentModule } from '../appointment-payment/appointment-payment.module';

@Module({
  imports: [AppointmentModule, AppointmentPaymentModule],
  controllers: [AppointmentSessionController],
  providers: [
    AppointmentSessionService,
    PrismaService,
    {
      provide: IAppointmentSessionRepository,
      useClass: AppointmentSessionPrismaRepository,
    },
  ],
})
export class AppointmentSessionModule {}

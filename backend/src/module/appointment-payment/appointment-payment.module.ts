import { Module } from '@nestjs/common';
import { AppointmentPaymentController } from './appointment-payment.controller';
import { AppointmentPaymentService } from './appointment-payment.service';
import { IAppointmentPaymentRepository } from './repository/appointment-payment.repository';
import { AppointmentPaymentPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { CashRegisterModule } from '../cash-register/cash-register.module';
import { CashTransactionModule } from '../cash-transaction/cash-transaction.module';

@Module({
  imports: [AppointmentModule, CashRegisterModule, CashTransactionModule],
  controllers: [AppointmentPaymentController],
  providers: [
    AppointmentPaymentService,
    PrismaService,
    {
      provide: IAppointmentPaymentRepository,
      useClass: AppointmentPaymentPrismaRepository,
    },
  ],
})
export class AppointmentPaymentModule {}

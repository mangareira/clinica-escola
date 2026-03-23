import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAppointmentPaymentRepository } from '../appointment-payment.repository';
import { CreateAppointmentPaymentDto } from '../../dto/create-appointment-payment.dto';
import { AppointmentPayment } from '../../entity/appointment-payment.entity';

@Injectable()
export class AppointmentPaymentPrismaRepository implements IAppointmentPaymentRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPayment: CreateAppointmentPaymentDto, appointmentId: string): Promise<AppointmentPayment> {
    const payment = await this.prisma.appointmentPayment.create({
      data: {
        ...createPayment,
        appointmentId,
      },
    });
    return payment as AppointmentPayment;
  }
}

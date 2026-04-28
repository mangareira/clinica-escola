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

  async updateStatus(paymentId: string, status: 'Pending' | 'Confirmed' | 'Canceled'): Promise<AppointmentPayment> {
    const payment = await this.prisma.appointmentPayment.update({
      where: { id: paymentId },
      data: { payemntsStatus: status },
    });
    return payment as AppointmentPayment;
  }

  async findPendingByAppointment(appointmentId: string): Promise<AppointmentPayment | null> {
    const payment = await this.prisma.appointmentPayment.findFirst({
      where: {
        appointmentId,
        payemntsStatus: 'Pending',
      },
    });
    return payment as AppointmentPayment | null;
  }

  async findByAppointment(appointmentId: string): Promise<AppointmentPayment | null> {
    const payment = await this.prisma.appointmentPayment.findFirst({
      where: { appointmentId },
      orderBy: { createdAt: 'desc' },
    });
    return payment as AppointmentPayment | null;
  }
}

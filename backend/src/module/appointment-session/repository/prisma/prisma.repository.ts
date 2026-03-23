import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAppointmentSessionRepository } from '../appointment-session.repository';
import { AppointmentSession } from '../../entity/appointment-session.entity';

@Injectable()
export class AppointmentSessionPrismaRepository implements IAppointmentSessionRepository {
  constructor(private prisma: PrismaService) {}

  async findActiveSession(appointmentId: string): Promise<AppointmentSession | null> {
    const session = await this.prisma.appointmentSession.findFirst({
      where: {
        appointmentId,
        checkOutTime: null,
      },
    });
    return session as AppointmentSession | null;
  }

  async createCheckIn(appointmentId: string): Promise<AppointmentSession> {
    const session = await this.prisma.appointmentSession.create({
      data: {
        appointmentId,
        checkInTime: new Date(),
      },
    });
    return session as AppointmentSession;
  }

  async updateCheckOut(sessionId: string): Promise<AppointmentSession> {
    const session = await this.prisma.appointmentSession.update({
      where: { id: sessionId },
      data: {
        checkOutTime: new Date(),
      },
    });
    return session as AppointmentSession;
  }
}

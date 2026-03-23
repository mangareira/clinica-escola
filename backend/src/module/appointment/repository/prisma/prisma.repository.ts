import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAppointmentRepository } from '../appointment.repository';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from '../../dto/create-appointment.dto';
import { Appointment } from '../../entity/appointment.entity';
import { AppointmentSession } from 'src/module/appointment-session/entity/appointment-session.entity';

@Injectable()
export class AppointmentPrismaRepository implements IAppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAppointment: CreateAppointmentDto): Promise<Appointment> {
    const appointment = await this.prisma.appointment.create({
      data: createAppointment,
    });
    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      include: {
        patient: true,
        service: true,
        specialty: true,
        demand: true,
      },
    });
    return appointments;
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    return appointment;
  }

  async updateStatus(id: string, status: UpdateAppointmentStatusDto['status']): Promise<Appointment> {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return appointment;
  }

  async updateCheckInOut(id: string, checkInTime?: Date | null, checkOutTime?: Date | null): Promise<Appointment> {
    const updateData: any = {};
    if (checkInTime !== undefined) updateData.checkInTime = checkInTime;
    if (checkOutTime !== undefined) updateData.checkOutTime = checkOutTime;
    
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: updateData,
    });
    return appointment;
  }
}

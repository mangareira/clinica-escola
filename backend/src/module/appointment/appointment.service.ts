import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IAppointmentRepository } from './repository/appointment.repository';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/create-appointment.dto';
import { Appointment } from './entity/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async create(createAppointment: CreateAppointmentDto): Promise<Appointment> {
    try {
      return await this.appointmentRepository.create(createAppointment);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao criar agendamento. Verifique se os IDs (paciente, serviço, especialidade, demanda) informados realmente existem.', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }

  async updateStatus(id: string, statusDto: UpdateAppointmentStatusDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.appointmentRepository.updateStatus(id, statusDto.status);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao atualizar status do agendamento.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async updateCheckInOut(id: string, checkInTime?: Date | null, checkOutTime?: Date | null): Promise<Appointment> {
    return this.appointmentRepository.updateCheckInOut(id, checkInTime, checkOutTime);
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IAppointmentSessionRepository } from './repository/appointment-session.repository';
import { AppointmentService } from '../appointment/appointment.service';
import { AppointmentSession } from './entity/appointment-session.entity';

@Injectable()
export class AppointmentSessionService {
  constructor(
    private sessionRepository: IAppointmentSessionRepository,
    private appointmentService: AppointmentService,
  ) {}

  async checkIn(appointmentId: string): Promise<AppointmentSession> {
    const appointment = await this.appointmentService.getById(appointmentId);
    
    if (!appointment) {
      throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
    }

    if (appointment.status === 'Canceled') {
      throw new HttpException('Não é possível fazer check-in de um agendamento cancelado', HttpStatus.BAD_REQUEST);
    }

    const activeSession = await this.sessionRepository.findActiveSession(appointmentId);
    if (activeSession) {
      throw new HttpException('Já existe um check-in ativo para este agendamento', HttpStatus.BAD_REQUEST);
    }

    try {
      const session = await this.sessionRepository.createCheckIn(appointmentId);
      await this.appointmentService.updateCheckInOut(appointmentId, session.checkInTime, undefined);
      await this.appointmentService.updateStatus(appointmentId, { status: 'CheckIn' });
      return session;
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao realizar o check-in.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkOut(appointmentId: string): Promise<AppointmentSession> {
    const activeSession = await this.sessionRepository.findActiveSession(appointmentId);
    
    if (!activeSession) {
      throw new HttpException('Não há check-in ativo para este agendamento', HttpStatus.BAD_REQUEST);
    }

    try {
      const session = await this.sessionRepository.updateCheckOut(activeSession.id);
      await this.appointmentService.updateCheckInOut(appointmentId, undefined, session.checkOutTime);
      await this.appointmentService.updateStatus(appointmentId, { status: 'Completed' });
      return session;
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao realizar o check-out.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

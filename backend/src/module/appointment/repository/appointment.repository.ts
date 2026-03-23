import { CreateAppointmentDto, UpdateAppointmentStatusDto } from '../dto/create-appointment.dto';
import { Appointment } from '../entity/appointment.entity';

export abstract class IAppointmentRepository {
  abstract create(createAppointment: CreateAppointmentDto): Promise<Appointment>;
  abstract findAll(): Promise<Appointment[]>;
  abstract findById(id: string): Promise<Appointment | null>;
  abstract updateStatus(id: string, status: UpdateAppointmentStatusDto['status']): Promise<Appointment>;
  abstract updateCheckInOut(id: string, checkInTime?: Date | null, checkOutTime?: Date | null): Promise<Appointment>;
}

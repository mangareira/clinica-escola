import { AppointmentSession } from '../entity/appointment-session.entity';

export abstract class IAppointmentSessionRepository {
  abstract createCheckIn(appointmentId: string): Promise<AppointmentSession>;
  abstract findActiveSession(appointmentId: string): Promise<AppointmentSession | null>;
  abstract updateCheckOut(sessionId: string): Promise<AppointmentSession>;
}

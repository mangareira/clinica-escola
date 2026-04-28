import { CreateAppointmentPaymentDto } from '../dto/create-appointment-payment.dto';
import { AppointmentPayment } from '../entity/appointment-payment.entity';

export abstract class IAppointmentPaymentRepository {
  abstract create(createPayment: CreateAppointmentPaymentDto, appointmentId: string): Promise<AppointmentPayment>;
  abstract updateStatus(paymentId: string, status: 'Pending' | 'Confirmed' | 'Canceled'): Promise<AppointmentPayment>;
  abstract findPendingByAppointment(appointmentId: string): Promise<AppointmentPayment | null>;
  abstract findByAppointment(appointmentId: string): Promise<AppointmentPayment | null>;
}

import { CreateAppointmentPaymentDto } from '../dto/create-appointment-payment.dto';
import { AppointmentPayment } from '../entity/appointment-payment.entity';

export abstract class IAppointmentPaymentRepository {
  abstract create(createPayment: CreateAppointmentPaymentDto, appointmentId: string): Promise<AppointmentPayment>;
}

import { AppointmentPayment } from "src/module/appointment-payment/entity/appointment-payment.entity";
import { AppointmentSession } from "src/module/appointment-session/entity/appointment-session.entity";
import { CashTransaction } from "src/module/cash-transaction/entity/cash-transaction.entity";
import { Demand } from "src/module/demand/entity/demand.entity";
import { Service } from "src/module/service/entity/service.entity";
import { Specialty } from "src/module/specialty/entity/specialty.entity";

export class Appointment {
  id: string;
  patientId: string | null;
  serviceId: string;
  specialtyId: string | null;
  demandId: string | null;
  dateTime: Date;
  status: 'Waiting' | 'Confirmed' | 'CheckIn' | 'Completed' | 'Canceled';
  recurringDays: any | null;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  patientTypeJustification: string | null;
  sessionHistory: AppointmentSession[];
  payments: AppointmentPayment[];
  cashTransactions: CashTransaction[];
  service: Service;
  specialty: Specialty | null;
  demand: Demand | null;
  createdAt: Date;
  updatedAt: Date;
}

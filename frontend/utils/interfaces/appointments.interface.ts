import { AppointmentPayment, AppointmentSession, CashTransaction, Demand, PatientHistory, Service, Specialty } from "./history-type.interface";

export interface Appointment {
  id: string;
  patientId: string | null;
  patient: Omit<PatientHistory, "appointments">
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

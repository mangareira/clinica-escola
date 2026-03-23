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
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  type: string;
  price: number;
}

export interface Specialty {
  id: string;
  name: string;
}

export interface Demand {
  id: string;
  name: string;
}

export interface AppointmentSession {
  id: string;
  checkInTime: string | Date;
  checkOutTime: string | Date;
}

export interface AppointmentPayment {
  id: string;
  paymentType: string;
  payemntsStatus: "Pending" | "Confirmed" | "Canceled"
  amount: number;
}

export interface CashTransaction {
  id: string;
  type: string;
  paymentType: string;
  amount: number;
}

export interface Appointment {
  id: string;
  dateTime: string | Date;
  status: 'Waiting' | 'Confirmed' | 'CheckIn' | 'Completed' | 'Canceled';
  service: Service;
  specialty?: Specialty | null;
  demand?: Demand | null;
  sessionHistory: AppointmentSession[];
  payments: AppointmentPayment[];
  cashTransactions: CashTransaction[];
}

export interface PatientHistory {
  id: string;
  name: string;
  phone?: string | null;
  type: 'Employee' | 'External' | 'Exempt';
  createdAt: string | Date;
  updatedAt: string | Date;
  appointments: Appointment[];
}

export class AppointmentPayment {
  id: string;
  paymentType: 'Cash' | 'Card' | 'Pix';
  amount: number;
  payemntsStatus: 'Pending' | 'Confirmed' | 'Canceled' | null;
  appointmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

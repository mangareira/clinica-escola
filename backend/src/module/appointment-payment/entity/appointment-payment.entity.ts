export class AppointmentPayment {
  id: string;
  paymentType: 'Cash' | 'Card' | 'Pix';
  amount: number;
  appointmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

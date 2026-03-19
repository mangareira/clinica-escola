export class CashTransaction {
  id: string;
  type: 'Payment' | 'Withdrawal' | 'Adjustment';
  paymentType: 'Cash' | 'Card' | 'Pix';
  amount: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  cashRegisterId: string | null;
}

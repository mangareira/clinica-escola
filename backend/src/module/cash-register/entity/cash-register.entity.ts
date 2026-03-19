export class CashRegister {
  id: string;
  openAt: Date;
  closeAt: Date | null;
  openBalance: number;
  closeBalance: number | null;
  status: 'Open' | 'Closed';
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

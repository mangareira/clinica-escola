import { CreateCashTransactionDto } from '../dto/create-cash-transaction.dto';
import { CashTransaction } from '../entity/cash-transaction.entity';

export abstract class ICashTransactionRepository {
  abstract create(createCashTransaction: CreateCashTransactionDto, cashRegisterId: string): Promise<CashTransaction>;
  abstract findAllByCashRegister(cashRegisterId: string): Promise<CashTransaction[]>;
}

import { CreateCashRegisterDto, CloseCashRegisterDto } from '../dto/create-cash-register.dto';
import { CashRegister } from '../entity/cash-register.entity';

export abstract class ICashRegisterRepository {
  abstract create(createCashRegister: CreateCashRegisterDto): Promise<CashRegister>;
  abstract findOpenRegister(): Promise<CashRegister | null>;
  abstract findRegisterForToday(): Promise<CashRegister | null>;
  abstract closeRegister(id: string, closeCashRegister: CloseCashRegisterDto): Promise<CashRegister>;
  abstract findById(id: string): Promise<CashRegister | null>;
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ICashTransactionRepository } from './repository/cash-transaction.repository';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { CashTransaction } from './entity/cash-transaction.entity';
import { CashRegisterService } from '../cash-register/cash-register.service';

@Injectable()
export class CashTransactionService {
  constructor(
    private cashTransactionRepository: ICashTransactionRepository,
    private cashRegisterService: CashRegisterService,
  ) {}

  async create(createCashTransaction: CreateCashTransactionDto): Promise<CashTransaction> {
    const openRegister = await this.cashRegisterService.getOpenRegister();

    if (!openRegister) {
      throw new HttpException('Não há nenhum caixa aberto no momento para registrar as transações', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.cashTransactionRepository.create(createCashTransaction, openRegister.id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao criar transação do caixa.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByCashRegister(cashRegisterId: string): Promise<CashTransaction[]> {
    return this.cashTransactionRepository.findAllByCashRegister(cashRegisterId);
  }
}

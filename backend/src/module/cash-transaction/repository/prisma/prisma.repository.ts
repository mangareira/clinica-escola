import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICashTransactionRepository } from '../cash-transaction.repository';
import { CreateCashTransactionDto } from '../../dto/create-cash-transaction.dto';
import { CashTransaction } from '../../entity/cash-transaction.entity';

@Injectable()
export class CashTransactionPrismaRepository implements ICashTransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCashTransaction: CreateCashTransactionDto, cashRegisterId: string): Promise<CashTransaction> {
    const cashTransaction = await this.prisma.cashTransaction.create({
      data: {
        ...createCashTransaction,
        cashRegisterId,
      },
    });
    return cashTransaction;
  }

  async findAllByCashRegister(cashRegisterId: string): Promise<CashTransaction[]> {
    const transactions = await this.prisma.cashTransaction.findMany({
      where: { cashRegisterId }
    });
    return transactions;
  }
}

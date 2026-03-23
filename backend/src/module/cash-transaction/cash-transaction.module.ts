import { Module } from '@nestjs/common';
import { CashTransactionController } from './cash-transaction.controller';
import { CashTransactionService } from './cash-transaction.service';
import { ICashTransactionRepository } from './repository/cash-transaction.repository';
import { CashTransactionPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CashRegisterModule } from '../cash-register/cash-register.module';

@Module({
  imports: [CashRegisterModule],
  controllers: [CashTransactionController],
  providers: [
    CashTransactionService,
    PrismaService,
    {
      provide: ICashTransactionRepository,
      useClass: CashTransactionPrismaRepository,
    },
  ],
  exports: [CashTransactionService],
})
export class CashTransactionModule {}

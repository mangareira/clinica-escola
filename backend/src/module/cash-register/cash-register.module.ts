import { Module } from '@nestjs/common';
import { CashRegisterController } from './cash-register.controller';
import { CashRegisterService } from './cash-register.service';
import { ICashRegisterRepository } from './repository/cash-register.repository';
import { CashRegisterPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CashRegisterController],
  providers: [
    CashRegisterService,
    PrismaService,
    {
      provide: ICashRegisterRepository,
      useClass: CashRegisterPrismaRepository,
    },
  ],
  exports: [CashRegisterService, ICashRegisterRepository],
})
export class CashRegisterModule {}

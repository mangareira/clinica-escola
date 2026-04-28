import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICashRegisterRepository } from '../cash-register.repository';
import { CreateCashRegisterDto, CloseCashRegisterDto } from '../../dto/create-cash-register.dto';
import { CashRegister } from '../../entity/cash-register.entity';

@Injectable()
export class CashRegisterPrismaRepository implements ICashRegisterRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCashRegister: CreateCashRegisterDto): Promise<CashRegister> {
    const cashRegister = await this.prisma.cashRegister.create({
      data: createCashRegister,
    });
    return cashRegister;
  }

  async findOpenRegister(): Promise<CashRegister | null> {
    const cashRegister = await this.prisma.cashRegister.findFirst({
      where: { status: 'Open' },
      include: { transactions: true },
    });
    return cashRegister;
  }

  async findRegisterForToday(): Promise<CashRegister | null> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const cashRegister = await this.prisma.cashRegister.findFirst({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return cashRegister;
  }

  async closeRegister(id: string, closeCashRegister: CloseCashRegisterDto): Promise<CashRegister> {
    const cashRegister = await this.prisma.cashRegister.update({
      where: { id },
      data: {
        ...closeCashRegister,
        status: 'Closed',
        closeAt: new Date(),
      },
    });
    return cashRegister;
  }

  async findById(id: string): Promise<CashRegister | null> {
    const cashRegister = await this.prisma.cashRegister.findUnique({
      where: { id },
    });
    return cashRegister;
  }
}

import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CreateCashTransactionDto, createCashTransactionSchema } from './dto/create-cash-transaction.dto';
import { CashTransaction } from './entity/cash-transaction.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('cash-transactions')
@UseGuards(RolesGuard)
export class CashTransactionController {
  constructor(private readonly cashTransactionService: CashTransactionService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createCashTransactionSchema))
  async create(@Body() createCashTransaction: CreateCashTransactionDto): Promise<CashTransaction> {
    return this.cashTransactionService.create(createCashTransaction);
  }

  @Get('/register/:id')
  @Roles('Admin', 'User')
  async findAllByCashRegister(@Param('id') id: string): Promise<CashTransaction[]> {
    return this.cashTransactionService.findAllByCashRegister(id);
  }
}

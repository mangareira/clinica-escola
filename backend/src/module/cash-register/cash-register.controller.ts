import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto, closeCashRegisterSchema, createCashRegisterSchema, CloseCashRegisterDto } from './dto/create-cash-register.dto';
import { CashRegister } from './entity/cash-register.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('cash-registers')
@UseGuards(RolesGuard)
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Post('/open')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createCashRegisterSchema))
  async openRegister(@Body() createCashRegister: CreateCashRegisterDto): Promise<CashRegister> {
    return this.cashRegisterService.openRegister(createCashRegister);
  }

  @Post('/:id/close')
  @Roles('Admin')
  async closeRegister(@Param('id') id: string, @Body(new ZodPipe(closeCashRegisterSchema)) closeCashRegister: CloseCashRegisterDto): Promise<CashRegister> {
    return this.cashRegisterService.closeRegister(id, closeCashRegister);
  }

  @Get('/open')
  async getOpenRegister(): Promise<CashRegister | null> {
    return this.cashRegisterService.getOpenRegister();
  }
}

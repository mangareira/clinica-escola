import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ICashRegisterRepository } from './repository/cash-register.repository';
import { CreateCashRegisterDto, CloseCashRegisterDto } from './dto/create-cash-register.dto';
import { CashRegister } from './entity/cash-register.entity';

@Injectable()
export class CashRegisterService {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async openRegister(createCashRegister: CreateCashRegisterDto): Promise<CashRegister> {
    const registerToday = await this.cashRegisterRepository.findRegisterForToday();

    if (registerToday) {
      throw new HttpException('Já existe um caixa aberto ou fechado para a data de hoje', HttpStatus.BAD_REQUEST);
    }

    const openRegister = await this.cashRegisterRepository.findOpenRegister();

    if (openRegister) {
      throw new HttpException('Ainda existe um caixa aberto pendente de fechamento', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.cashRegisterRepository.create(createCashRegister);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao tentar abrir o caixa.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async closeRegister(id: string, closeCashRegister: CloseCashRegisterDto): Promise<CashRegister> {
    const register = await this.cashRegisterRepository.findById(id);

    if (!register) {
      throw new HttpException('Caixa não encontrado', HttpStatus.NOT_FOUND);
    }

    if (register.status === 'Closed') {
      throw new HttpException('Esse caixa já se encontra fechado', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.cashRegisterRepository.closeRegister(id, closeCashRegister);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao fechar o caixa.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOpenRegister(): Promise<CashRegister | null> {
    return this.cashRegisterRepository.findOpenRegister();
  }
}

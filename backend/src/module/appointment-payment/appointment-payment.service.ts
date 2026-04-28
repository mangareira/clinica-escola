import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IAppointmentPaymentRepository } from './repository/appointment-payment.repository';
import { CreateAppointmentPaymentDto } from './dto/create-appointment-payment.dto';
import { AppointmentPayment } from './entity/appointment-payment.entity';
import { CashRegisterService } from '../cash-register/cash-register.service';
import { CashTransactionService } from '../cash-transaction/cash-transaction.service';
import { AppointmentService } from '../appointment/appointment.service';

@Injectable()
export class AppointmentPaymentService {
  constructor(
    private paymentRepository: IAppointmentPaymentRepository,
    private cashRegisterService: CashRegisterService,
    private cashTransactionService: CashTransactionService,
    private appointmentService: AppointmentService,
  ) {}

  async createPending(
    createPayment: Omit<CreateAppointmentPaymentDto, 'payemntsStatus'>,
    appointmentId: string,
  ): Promise<AppointmentPayment> {
    const appointment = await this.appointmentService.getById(appointmentId);

    if (!appointment) {
      throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      const payment = await this.paymentRepository.create(
        { ...createPayment, payemntsStatus: 'Pending' },
        appointmentId,
      );
      return payment;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao criar pagamento pendente do agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createPayment: CreateAppointmentPaymentDto,
    appointmentId: string,
  ): Promise<AppointmentPayment | null> {
    const appointment = await this.appointmentService.getById(appointmentId);

    if (!appointment) {
      throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
    }

    const openRegister = await this.cashRegisterService.getOpenRegister();

    if (!openRegister) {
      throw new HttpException(
        'Não há nenhum caixa aberto no momento para receber pagamentos',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Atualizar pagamento pendente para confirmado
      const existingPendingPayment =
        await this.paymentRepository.findPendingByAppointment(appointmentId);
      if (existingPendingPayment) {
        await this.paymentRepository.updateStatus(existingPendingPayment.id, 'Confirmed');
      } else {
        // Se não houver pagamento pendente, criar um novo com status Confirmed
        await this.paymentRepository.create(
          { ...createPayment, payemntsStatus: 'Confirmed' },
          appointmentId,
        );
      }

      // Criar transação de caixa
      await this.cashTransactionService.create({
        type: 'Payment',
        paymentType: createPayment.paymentType,
        amount: createPayment.amount,
        notes: `Pagamento de Agendamento - ID: ${appointmentId}`,
        appointmentId,
      });

      const payment = await this.paymentRepository.findByAppointment(appointmentId);
      return payment;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao processar pagamento do agendamento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

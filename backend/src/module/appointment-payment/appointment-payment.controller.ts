import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AppointmentPaymentService } from './appointment-payment.service';
import {
  createAppointmentPaymentSchema,
  CreateAppointmentPaymentDto,
  appointmentPaymentParamSchema,
  AppointmentPaymentParamDto,
} from './dto/create-appointment-payment.dto';
import { AppointmentPayment } from './entity/appointment-payment.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('appointment-payments')
@UseGuards(RolesGuard)
export class AppointmentPaymentController {
  constructor(private readonly paymentService: AppointmentPaymentService) {}

  @Post('/:appointmentId/pay')
  @Roles('Admin', 'User')
  async pay(
    @Param(new ZodPipe(appointmentPaymentParamSchema)) params: AppointmentPaymentParamDto,
    @Body(new ZodPipe(createAppointmentPaymentSchema)) createPayment: CreateAppointmentPaymentDto,
  ): Promise<AppointmentPayment | null> {
    return this.paymentService.create(createPayment, params.appointmentId);
  }
}

import { Controller, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppointmentSessionService } from './appointment-session.service';
import { appointmentSessionParamSchema, AppointmentSessionParamDto } from './dto/create-appointment-session.dto';
import { AppointmentSession } from './entity/appointment-session.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('appointment-sessions')
@UseGuards(RolesGuard)
export class AppointmentSessionController {
  constructor(private readonly sessionService: AppointmentSessionService) {}

  @Post('/:appointmentId/check-in')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(appointmentSessionParamSchema))
  async checkIn(@Param() params: AppointmentSessionParamDto): Promise<AppointmentSession> {
    return this.sessionService.checkIn(params.appointmentId);
  }

  @Post('/:appointmentId/check-out')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(appointmentSessionParamSchema))
  async checkOut(@Param() params: AppointmentSessionParamDto): Promise<AppointmentSession> {
    return this.sessionService.checkOut(params.appointmentId);
  }
}

import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, createAppointmentSchema, UpdateAppointmentStatusDto, updateAppointmentStatusSchema } from './dto/create-appointment.dto';
import { Appointment } from './entity/appointment.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('appointments')
@UseGuards(RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createAppointmentSchema))
  async create(@Body() createAppointment: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentService.create(createAppointment);
  }

  @Get('/get-all')
  @Roles('Admin', 'User')
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Put('/:id/status')
  @Roles('Admin', 'User')
  async updateStatus(
    @Param('id') id: string,
    @Body(new ZodPipe(updateAppointmentStatusSchema)) statusDto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    return this.appointmentService.updateStatus(id, statusDto);
  }
}

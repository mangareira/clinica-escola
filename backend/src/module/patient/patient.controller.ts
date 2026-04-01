import { Controller, Post, Body, UseGuards, UsePipes, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, createPatientSchema } from './dto/create-patient.dto';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('patient')
@UseGuards(RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createPatientSchema))
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get('/get-all')
  @Roles('Admin', 'User')
  findAll() {
    return this.patientService.findAll();
  }
}

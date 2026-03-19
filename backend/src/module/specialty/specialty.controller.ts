import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto, createSpecialtySchema } from './dto/create-specialty.dto';
import { Specialty } from './entity/specialty.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('specialties')
@UseGuards(RolesGuard)
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post('/create')
  @Roles('Admin')
  @UsePipes(new ZodPipe(createSpecialtySchema))
  async create(@Body() createSpecialty: CreateSpecialtyDto): Promise<Specialty> {
    return this.specialtyService.create(createSpecialty);
  }

  @Get('/get-all')
  async findAll(): Promise<Specialty[]> {
    return this.specialtyService.findAll();
  }
}

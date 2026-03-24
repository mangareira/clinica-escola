import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto, createSpecialtySchema } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto, updateSpecialtySchema } from './dto/update-specialty.dto';
import { Specialty } from './entity/specialty.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('specialties')
@UseGuards(RolesGuard)
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createSpecialtySchema))
  async create(@Body() createSpecialty: CreateSpecialtyDto): Promise<Specialty> {
    return this.specialtyService.create(createSpecialty);
  }

  @Get('/get-all')
  @Roles('Admin', 'User')
  async findAll(): Promise<Specialty[]> {
    return this.specialtyService.findAll();
  }

  @Put('/update/:id')
  @Roles('Admin', 'User')
  async update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateSpecialtySchema)) updateSpecialty: UpdateSpecialtyDto,
  ): Promise<Specialty> {
    return this.specialtyService.update(id, updateSpecialty);
  }

  @Delete('/delete/:id')
  @Roles('Admin', 'User')
  async delete(@Param('id') id: string): Promise<void> {
    return this.specialtyService.delete(id);
  }
}

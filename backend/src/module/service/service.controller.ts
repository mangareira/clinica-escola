import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, createServiceSchema } from './dto/create-service.dto';
import { UpdateServiceDto, updateServiceSchema } from './dto/update-service.dto';
import { Service } from './entity/service.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('services')
@UseGuards(RolesGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createServiceSchema))
  async create(@Body() createService: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createService);
  }

  @Get('/get-all')
  @Roles('Admin', 'User')
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Put('/update/:id')
  @Roles('Admin', 'User')
  async update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateServiceSchema)) updateService: UpdateServiceDto,
  ): Promise<Service> {
    return this.serviceService.update(id, updateService);
  }

  @Delete('/delete/:id')
  @Roles('Admin', 'User')
  async delete(@Param('id') id: string): Promise<void> {
    return this.serviceService.delete(id);
  }
}

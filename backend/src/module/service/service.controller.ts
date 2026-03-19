import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, createServiceSchema } from './dto/create-service.dto';
import { Service } from './entity/service.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('services')
@UseGuards(RolesGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/create')
  @Roles('Admin')
  @UsePipes(new ZodPipe(createServiceSchema))
  async create(@Body() createService: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createService);
  }

  @Get('/get-all')
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }
}

import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemandDto, createDemandSchema } from './dto/create-demand.dto';
import { Demand } from './entity/demand.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('demands')
@UseGuards(RolesGuard)
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post('/create')
  @Roles('Admin')
  @UsePipes(new ZodPipe(createDemandSchema))
  async create(@Body() createDemand: CreateDemandDto): Promise<Demand> {
    return this.demandService.create(createDemand);
  }

  @Get('/get-all')
  async findAll(): Promise<Demand[]> {
    return this.demandService.findAll();
  }
}

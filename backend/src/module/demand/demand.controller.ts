import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemandDto, createDemandSchema } from './dto/create-demand.dto';
import { UpdateDemandDto, updateDemandSchema } from './dto/update-demand.dto';
import { Demand } from './entity/demand.entity';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('demands')
@UseGuards(RolesGuard)
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post('/create')
  @Roles('Admin', 'User')
  @UsePipes(new ZodPipe(createDemandSchema))
  async create(@Body() createDemand: CreateDemandDto): Promise<Demand> {
    return this.demandService.create(createDemand);
  }

  @Get('/get-all')
  @Roles('Admin', 'User')
  async findAll(): Promise<Demand[]> {
    return this.demandService.findAll();
  }

  @Put('/update/:id')
  @Roles('Admin', 'User')
  async update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateDemandSchema)) updateDemand: UpdateDemandDto,
  ): Promise<Demand> {
    return this.demandService.update(id, updateDemand);
  }

  @Delete('/delete/:id')
  @Roles('Admin', 'User')
  async delete(@Param('id') id: string): Promise<void> {
    return this.demandService.delete(id);
  }
}

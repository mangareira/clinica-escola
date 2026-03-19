import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { IDemandRepository } from './repository/demand.repository';
import { DemandPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DemandController],
  providers: [
    DemandService,
    PrismaService,
    {
      provide: IDemandRepository,
      useClass: DemandPrismaRepository,
    },
  ],
})
export class DemandModule {}

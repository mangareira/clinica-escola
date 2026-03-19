import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { IServiceRepository } from './repository/service.repository';
import { ServicePrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ServiceController],
  providers: [
    ServiceService,
    PrismaService,
    {
      provide: IServiceRepository,
      useClass: ServicePrismaRepository,
    },
  ],
})
export class ServiceModule {}

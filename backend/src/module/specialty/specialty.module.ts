import { Module } from '@nestjs/common';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';
import { ISpecialtyRepository } from './repository/specialty.repository';
import { SpecialtyPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SpecialtyController],
  providers: [
    SpecialtyService,
    PrismaService,
    {
      provide: ISpecialtyRepository,
      useClass: SpecialtyPrismaRepository,
    },
  ],
})
export class SpecialtyModule {}

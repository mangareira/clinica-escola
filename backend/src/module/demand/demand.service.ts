import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IDemandRepository } from './repository/demand.repository';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { Demand } from './entity/demand.entity';

@Injectable()
export class DemandService {
  constructor(private demandRepository: IDemandRepository) {}

  async create(createDemand: CreateDemandDto): Promise<Demand> {
    const existsDemand = await this.demandRepository.findByName(createDemand.name);

    if (existsDemand) {
      throw new HttpException('Demanda já existe', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.demandRepository.create(createDemand);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao criar demanda. Verifique os dados e tente novamente.', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Demand[]> {
    return this.demandRepository.findAll();
  }

  async update(id: string, updateDemand: UpdateDemandDto): Promise<Demand> {
    const demand = await this.demandRepository.findById(id);

    if (!demand) {
      throw new HttpException('Demanda não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.demandRepository.update(id, updateDemand);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao atualizar demanda. Verifique os dados e tente novamente.', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    const demand = await this.demandRepository.findById(id);

    if (!demand) {
      throw new HttpException('Demanda não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.demandRepository.delete(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao deletar demanda.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

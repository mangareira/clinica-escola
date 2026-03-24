import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ISpecialtyRepository } from './repository/specialty.repository';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entity/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(private specialtyRepository: ISpecialtyRepository) {}

  async create(createSpecialty: CreateSpecialtyDto): Promise<Specialty> {
    const existsSpecialty = await this.specialtyRepository.findByName(createSpecialty.name);

    if (existsSpecialty) {
      throw new HttpException('Especialidade já existe', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.specialtyRepository.create(createSpecialty);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Erro ao criar especialidade. Verifique os dados e tente novamente.', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepository.findAll();
  }

  async update(id: string, updateSpecialty: UpdateSpecialtyDto): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findById(id);

    if (!specialty) {
      throw new HttpException('Especialidade não encontrada', HttpStatus.NOT_FOUND);
    }

    return this.specialtyRepository.update(id, updateSpecialty);
  }

  async delete(id: string): Promise<void> {
    const specialty = await this.specialtyRepository.findById(id);

    if (!specialty) {
      throw new HttpException('Especialidade não encontrada', HttpStatus.NOT_FOUND);
    }

    await this.specialtyRepository.delete(id);
  }
}

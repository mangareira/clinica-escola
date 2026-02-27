// src/common/pipes/zod.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

@Injectable()
export class ZodPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Erro de validação',
          errors: this.formatErrors(error),
        });
      }
      throw new BadRequestException('Erro de validação');
    }
  }

  private formatErrors(error: ZodError) {
    return error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
  }
}

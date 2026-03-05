import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './common/filters/zod/zod.filter';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser(process.env.SECRET_KEY));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();

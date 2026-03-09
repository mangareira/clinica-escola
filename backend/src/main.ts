import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './common/filters/zod/zod.filter';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });
  app.use(cookieParser(process.env.SECRET_KEY));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();

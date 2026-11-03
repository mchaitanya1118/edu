import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { AppContextSingleton } from './common/context/app.context';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseEntity } from './common/response/response.entity';
import { TenantResolverInterceptor } from './common/interceptors/tenant-resolver.interceptor';
import { PrismaService } from './common/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  // ---- Security headers ----
  app.use(helmet());

  // ---- CORS (allowlisted origins only) ----
  const corsOrigins = config.get<string>('CORS_ORIGINS', 'http://localhost:5173,https://localhost:5173');
  app.enableCors({
    origin: corsOrigins.split(',').map((o) => o.trim()),
    credentials: true,
  });

  // ---- Request rate limiting (per IP) ----
  const rl = config.get<string>('RATE_LIMIT_ENABLED', 'true') === 'true';
  if (rl) {
    const limiter = rateLimit({
      windowMs: Number(config.get('RATE_LIMIT_WINDOW_MS', 60000)),
      max: Number(config.get('RATE_LIMIT_MAX_REQUESTS', 100)),
      standardHeaders: true,
      legacyHeaders: false,
      message: { statusCode: 429, message: 'Too many requests. Please slow down.' } as ResponseEntity,
    });
    app.use(limiter);
  }

  // ---- Global validation pipe ----
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 400,
    }),
  );

  // ---- Global exception filter (no stack traces leaked) ----
  app.useGlobalFilters(new HttpExceptionFilter(new Logger('Core')));

  // ---- Global tenant resolver interceptor (sets tenant/role/email for every request) ----
  app.useGlobalInterceptors(new TenantResolverInterceptor(app.get(PrismaService)));

  // ---- Set a safe, empty context for unauthenticated requests ----
  AppContextSingleton.get().set({ tenantId: undefined, userId: undefined, role: undefined, email: undefined });

  const port = config.get<number>('PORT', 4000);
  await app.listen(port);
  Logger.log(`🍕 AusEdu Connect API running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();

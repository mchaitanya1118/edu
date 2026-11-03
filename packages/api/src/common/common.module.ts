import { Module, Global } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { TenantResolverInterceptor } from './interceptors/tenant-resolver.interceptor';

@Global()
@Module({
  providers: [PrismaService, TenantResolverInterceptor],
  exports: [PrismaService, TenantResolverInterceptor],
})
export class CommonModule {}

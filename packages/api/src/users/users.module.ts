import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../common/database/prisma.service';
import { JwtAuthGuard } from '../common/guards';
import { AppContextSingleton } from '../common/context/app.context';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UserService, PrismaService, JwtAuthGuard, AppContextSingleton],
  exports: [UserService],
})
export class UsersModule {}

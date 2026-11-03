import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppContextModule } from './common/context/app-context.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { CourseIntakesModule } from './courses/course-intakes.module';
import { CourseFeesModule } from './courses/course-fees.module';
import { CoursesModule } from './courses/courses.module';
import { PromotionModule } from './promotions/promotion.module';
import { CommissionModule } from './commissions/commission.module';
import { QuotesModule } from './quotes/quote.module';
import { StudentsModule } from './students/students.module';
import { DocumentsModule } from './documents/documents.module';
import { AuditModule } from './audit/audit.module';
import { PlatformModule } from './platform/platform.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '../../.env', '../../.env.local'],
      validate: () => ({}),
    }),
    AppContextModule,
    CommonModule,
    AuthModule,
    UsersModule,
    SchoolsModule,
    CoursesModule,
    CourseIntakesModule,
    CourseFeesModule,
    PromotionModule,
    CommissionModule,
    QuotesModule,
    StudentsModule,
    DocumentsModule,
    AuditModule,
    PlatformModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

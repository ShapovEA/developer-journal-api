import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalModule } from './dal/dal.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConstructionJournalModule } from './construction-journal/construction-journal.module';
import { EmployeeModule } from './employee/employee.module';
import { WorkTypeModule } from './work-type/work-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DalModule,
    ConstructionJournalModule,
    EmployeeModule,
    WorkTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

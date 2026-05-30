import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalModule } from './dal/dal.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConstructionJournalModule } from './construction-journal/construction-journal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DalModule,
    ConstructionJournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DalModule } from '../dal/dal.module';
import { ConstructionJournalController } from './construction-journal.controller';
import { ConstructionJournalService } from './construction-journal.service';

@Module({
  imports: [DalModule],
  providers: [ConstructionJournalService],
  controllers: [ConstructionJournalController],
})
export class ConstructionJournalModule {}

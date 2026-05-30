import { Module } from '@nestjs/common';
import { ConstructionJournalService } from './construction-journal.service';
import { ConstructionJournalController } from './construction-journal.controller';

@Module({
  providers: [ConstructionJournalService],
  controllers: [ConstructionJournalController]
})
export class ConstructionJournalModule {}

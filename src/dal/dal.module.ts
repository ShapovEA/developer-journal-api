import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConstructionJournalDal } from './construction-journal/construction-journal.dal';
import { EmployeeDal } from './employee/employee.dal';
import { WorkTypeDal } from './work-type/work-type.dal';

@Module({
  imports: [PrismaModule],
  providers: [ConstructionJournalDal, WorkTypeDal, EmployeeDal],
  exports: [ConstructionJournalDal, WorkTypeDal, EmployeeDal],
})
export class DalModule {}

import { Module } from '@nestjs/common';
import { DalModule } from '../dal/dal.module';
import { WorkTypeController } from './work-type.controller';
import { WorkTypeService } from './work-type.service';

@Module({
  imports: [DalModule],
  controllers: [WorkTypeController],
  providers: [WorkTypeService],
})
export class WorkTypeModule {}

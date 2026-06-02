import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateConstructionJournalDto {
  @IsUUID()
  workTypeId: string;

  @IsUUID()
  employeeId: string;

  @IsDateString()
  completedAt: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  volume: number;
}

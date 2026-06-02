import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateConstructionJournalDto {
  @IsOptional()
  @IsUUID()
  workTypeId?: string;

  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  volume?: number;
}

import { MeasurementUnit } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWorkTypeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnum(MeasurementUnit)
  unit?: MeasurementUnit;
}

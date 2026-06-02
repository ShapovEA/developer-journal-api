import { MeasurementUnit } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MeasurementUnit)
  unit: MeasurementUnit;
}

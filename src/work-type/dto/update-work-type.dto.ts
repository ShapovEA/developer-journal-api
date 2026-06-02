import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const measurementUnits = ['M', 'SQM', 'CBM', 'PCS'] as const;

export class UpdateWorkTypeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsIn(measurementUnits)
  unit?: (typeof measurementUnits)[number];
}

import { IsIn, IsNotEmpty, IsString } from 'class-validator';

const measurementUnits = ['M', 'SQM', 'CBM', 'PCS'] as const;

export class CreateWorkTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(measurementUnits)
  unit: (typeof measurementUnits)[number];
}

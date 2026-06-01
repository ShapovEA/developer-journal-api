import { MeasurementUnit } from '@prisma/client';

export class CreateWorkTypeDto {
  name: string;
  unit: MeasurementUnit;
}

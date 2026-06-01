import { MeasurementUnit } from '@prisma/client';

export class UpdateWorkTypeDto {
  name?: string;
  unit?: MeasurementUnit;
}

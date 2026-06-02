import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}

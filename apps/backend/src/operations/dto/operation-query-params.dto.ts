import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class OperationQueryParams {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  count?: number;
}

import { IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetOpDto {
  @Type(() => Number)
  @IsPositive()
  page = 1;

  @Type(() => Number)
  @IsPositive()
  count = 1;
}

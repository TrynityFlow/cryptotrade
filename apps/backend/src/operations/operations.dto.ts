import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateOpDto {
  @IsString()
  @IsNotEmpty()
  currency_id: string;

  @IsBoolean()
  sell: boolean;

  @IsPositive()
  amount: number;

  @IsPositive()
  price: number;
}

export class GetOpDto {
  @Type(() => Number)
  @IsPositive()
  page = 1;

  @Type(() => Number)
  @IsPositive()
  count = 1;
}

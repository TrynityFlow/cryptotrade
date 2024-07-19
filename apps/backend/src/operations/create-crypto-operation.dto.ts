import {
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CurrencyInfo {
  @IsString()
  id: string;

  @IsPositive()
  amount: number;
}

export class CreateCryptoOpDto {
  @IsBoolean()
  buy: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CurrencyInfo)
  currency_info: CurrencyInfo;
}

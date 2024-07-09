import {
  IsBoolean,
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

  @ValidateNested()
  @Type(() => CurrencyInfo)
  currency_info?: CurrencyInfo;
}

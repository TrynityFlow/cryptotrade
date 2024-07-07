import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsRequiredIf } from './custom.validator';

enum OperationType {
  BUY = 'buy',
  SELL = 'sell',
  TOPUP = 'topup',
}

class CurrencyInfo {
  @IsString()
  currency_id: string;

  @IsPositive()
  currency_buy: number;

  @IsPositive()
  currency_sell: number;

  @IsPositive()
  currency_amount: number;
}

export class CreateOpDto {
  @IsEnum(OperationType)
  type: string;

  @IsPositive()
  @IsRequiredIf('type', OperationType.TOPUP, {
    message: 'amount is required when type is topup',
  })
  amount?: number;

  @ValidateNested()
  @Type(() => CurrencyInfo)
  @IsOptional()
  @IsRequiredIf('type', OperationType.BUY, {
    message: 'currency_info is required when type is buy or sell',
  })
  @IsRequiredIf('type', OperationType.SELL, {
    message: 'currency_info is required when type is buy or sell',
  })
  currency_info?: CurrencyInfo;
}

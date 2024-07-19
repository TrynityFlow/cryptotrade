import {
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CurrencyInfo {
  @IsString()
  id: string;

  @IsPositive()
  amount: number;
}

export class CreateCryptoOpDto {
  @IsBoolean()
  @ApiProperty({ example: true })
  buy: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CurrencyInfo)
  @ApiProperty({
    properties: {
      id: {
        type: 'string',
      },
      amount: {
        type: 'number',
      },
    },
    example: {
      id: '1',
      amount: 0.1,
    },
  })
  currency_info: CurrencyInfo;
}

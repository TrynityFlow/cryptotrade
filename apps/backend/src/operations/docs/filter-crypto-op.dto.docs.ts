import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class FilterCryptoBodyDto {
  @ApiProperty({ example: 1, required: false })
  id: number;

  @ApiProperty({ example: 1, required: false })
  user_id: number;

  @ApiProperty({ example: true, required: false })
  buy: boolean;

  @ApiProperty({ example: 1, required: false })
  cash_operation_id: number;

  @ApiProperty({ example: 'BTC', required: false })
  currency_id: string;

  @ApiProperty({
    example: '50000.00',
    description: 'Currency buy price',
    type: String,
    required: false
  })
  currency_buy_price: Decimal;

  @ApiProperty({
    example: '55000.00',
    description: 'Currency sell price',
    type: String,
    required: false
  })
  currency_sell_price: Decimal;

  @ApiProperty({ example: '1.5', description: 'Currency amount', type: String, required: false })
  currency_amount: Decimal;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  createdAt: Date;
}

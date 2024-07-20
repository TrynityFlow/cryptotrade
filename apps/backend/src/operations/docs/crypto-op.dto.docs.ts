import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CryptoOpDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: true })
  buy: boolean;

  @ApiProperty({ example: 1 })
  cash_operation_id: number;

  @ApiProperty({ example: 'BTC' })
  currency_id: string;

  @ApiProperty({
    example: '50000.00',
    description: 'Currency buy price',
    type: String,
  })
  currency_buy_price: Decimal;

  @ApiProperty({
    example: '55000.00',
    description: 'Currency sell price',
    type: String,
  })
  currency_sell_price: Decimal;

  @ApiProperty({ example: '1.5', description: 'Currency amount', type: String })
  currency_amount: Decimal;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}

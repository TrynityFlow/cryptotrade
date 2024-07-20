import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CashOpDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({
    example: '100.00',
    description: 'Amount of the cash operation',
    type: String,
  })
  amount: Decimal;

  @ApiProperty({ example: true })
  positive: boolean;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}

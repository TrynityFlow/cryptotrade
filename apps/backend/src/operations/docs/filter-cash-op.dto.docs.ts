import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class FilterCashBodyDto {
  @ApiProperty({ example: 1, required: false })
  id: number;

  @ApiProperty({ example: 1, required: false })
  user_id: number;

  @ApiProperty({
    example: '100.00',
    description: 'Amount of the cash operation',
    type: String,
    required: false
  })
  amount: Decimal;

  @ApiProperty({ example: true, required: false })
  positive: boolean;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  createdAt: Date;
}

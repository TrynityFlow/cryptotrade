import { IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashOpDto {
  @IsPositive()
  @ApiProperty({ example: '1000' })
  amount: number;
}

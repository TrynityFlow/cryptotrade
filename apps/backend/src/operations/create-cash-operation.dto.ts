import { IsPositive } from 'class-validator';

export class CreateCashOpDto {
  @IsPositive()
  amount: number;
}

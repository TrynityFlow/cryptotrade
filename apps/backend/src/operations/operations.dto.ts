import {
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOpDto {
  @IsString()
  @IsNotEmpty()
  currency_id: string;

  @IsBoolean()
  sell: boolean;

  @IsPositive()
  amount: number;

  @IsPositive()
  price: number;
}

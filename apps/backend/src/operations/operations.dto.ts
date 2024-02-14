import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOpDto {
  @IsString()
  @IsNotEmpty()
  currency_id: string;

  @IsBoolean()
  sell: boolean;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

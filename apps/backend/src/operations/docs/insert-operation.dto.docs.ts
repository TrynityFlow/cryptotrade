import { ApiProperty } from '@nestjs/swagger';
import { CryptoOpDto } from './crypto-op.dto.docs';
import { CashOpDto } from './cash-op.dto.docs';

export class InsertOpDto {
  @ApiProperty({ type: () => CashOpDto })
  cashResult: CashOpDto;

  @ApiProperty({ type: () => CryptoOpDto })
  currencyResult: CryptoOpDto;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoOpDto } from './create-crypto-operation.dto';
import { CreateCashOpDto } from './create-cash-operation.dto';

export class CryptoOperationFilter extends PartialType(CreateCryptoOpDto) {}
export class CashOperationFilter extends PartialType(CreateCashOpDto) {}
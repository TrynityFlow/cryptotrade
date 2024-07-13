import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCryptoOpDto } from './create-crypto-operation.dto';
import { WalletService } from '../wallet/wallet.service';
import { CreateCashOpDto } from './create-cash-operation.dto';
import { getBuyPrice, getSellPrice } from './getMockCurrencyPrices';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
  ) {}

  private readonly logger: Logger = new Logger(OperationsService.name);

  async getAllCashOfUser(id: number, page: number, count: number) {
    return this.prisma.cash_operation.findMany({
      where: {
        user_id: id,
      },
      skip: (page - 1) * count,
      take: +count,
    });
  }

  async getAllCryptoOfUser(id: number, page: number, count: number) {
    return this.prisma.crypto_operation.findMany({
      where: {
        user_id: id,
      },
      skip: (page - 1) * count,
      take: +count,
    });
  }

  async addBalance(userId: number, createCashOp: CreateCashOpDto) {
    try {
      const topupResult = await this.prisma.cash_operation.create({
        data: {
          user_id: userId,
          amount: createCashOp.amount,
          positive: true,
        },
      });
      this.logger.log('Successful topup operation', topupResult);
      return topupResult;
    } catch (err) {
      this.logger.error('Error during topup operation', err);
      throw new InternalServerErrorException('Transaction failed');
    }
  }

  async insertCryptoOp(userId: number, createCryptoOpDto: CreateCryptoOpDto) {
    const price = createCryptoOpDto.buy ? getBuyPrice() : getSellPrice();
    const transactionAmount = price * createCryptoOpDto.currency_info.amount;

    if (createCryptoOpDto.buy) {
      const isBuyPossible = await this.walletService.isBuyPossible(
        userId,
        transactionAmount,
      );
      if (!isBuyPossible) throw new BadRequestException('Too low balance');
    }

    if (!createCryptoOpDto.buy) {
      const isSellPossible = await this.walletService.isSellPossible(
        userId,
        createCryptoOpDto.currency_info.id,
        createCryptoOpDto.currency_info.amount,
      );
      if (!isSellPossible)
        throw new BadRequestException('Insufficient amount of currency');
    }

    return this.prisma
      .$transaction(async () => {
        const cashResult = await this.prisma.cash_operation.create({
          data: {
            user_id: userId,
            amount: transactionAmount,
            positive: !createCryptoOpDto.buy,
          },
        });
        const currencyResult = await this.prisma.crypto_operation.create({
          data: {
            user_id: userId,
            buy: createCryptoOpDto.buy,
            cash_operation_id: cashResult.id,
            currency_id: createCryptoOpDto.currency_info.id,
            currency_buy_price: getBuyPrice(),
            currency_sell_price: getSellPrice(),
            currency_amount: createCryptoOpDto.currency_info.amount,
          },
        });
        return { cashResult, currencyResult };
      })
      .then((result) => {
        this.logger.log('New successful insert crypto operation', result);
        return result;
      })
      .catch((err) => {
        this.logger.error('Error during insert crypto operation', err);
        throw new InternalServerErrorException('Transaction failed');
      });
  }

  async delCashOp(userId: number, opId: number) {
    try {
      return await this.prisma.cash_operation.delete({
        where: {
          user_id: userId,
          id: opId,
        },
      });
    } catch (err) {
      this.logger.warn('Record not found in delete cash operation', err);
      throw new NotFoundException('Record not found');
    }
  }

  async delCryptoOp(userId: number, opId: number) {
    try {
      return await this.prisma.crypto_operation.delete({
        where: {
          user_id: userId,
          id: opId,
        },
      });
    } catch (err) {
      this.logger.warn('Record not found in delete crypto operation', err);
      throw new NotFoundException('Record not found');
    }
  }
}

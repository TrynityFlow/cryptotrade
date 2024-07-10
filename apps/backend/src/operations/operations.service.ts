import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCryptoOpDto } from './create-crypto-operation.dto';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
  ) {}

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

  async insertCashOp(userId: number, createCryptoOpDto: CreateCryptoOpDto) {
    const transactionAmount = 1 * createCryptoOpDto.currency_info.amount;

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
      .$transaction(async (prisma) => {
        const cashResult = await this.prisma.cash_operation.create({
          data: {
            user_id: userId,
            amount: transactionAmount,
            positive: !createCryptoOpDto.buy,
          },
        });
        const buyCurrencyResult = await this.prisma.crypto_operation.create({
          data: {
            user_id: userId,
            buy: createCryptoOpDto.buy,
            currency_id: createCryptoOpDto.currency_info.id,
            currency_buy_price: 1,
            currency_sell_price: 1,
            currency_amount: createCryptoOpDto.currency_info.amount,
          },
        });
        return { cashResult, buyCurrencyResult };
      })
      .then((result) => {
        console.log('Successful transaction', result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('Transaction failed');
      });
  }

  async insertCryptoOp(userId: number, createCryptoOpDto: CreateCryptoOpDto) {
    const transactionAmount = 1 * createCryptoOpDto.currency_info.amount;

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
      .$transaction(async (prisma) => {
        const cashResult = await this.prisma.cash_operation.create({
          data: {
            user_id: userId,
            amount: transactionAmount,
            positive: !createCryptoOpDto.buy,
          },
        });
        const buyCurrencyResult = await this.prisma.crypto_operation.create({
          data: {
            user_id: userId,
            buy: createCryptoOpDto.buy,
            currency_id: createCryptoOpDto.currency_info.id,
            currency_buy_price: 1,
            currency_sell_price: 1,
            currency_amount: createCryptoOpDto.currency_info.amount,
          },
        });
        return { cashResult, buyCurrencyResult };
      })
      .then((result) => {
        console.log('Successful transaction', result);
        return result;
      })
      .catch((err) => {
        console.log(err);
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
      throw new NotFoundException('Record not found');
    }
  }
}

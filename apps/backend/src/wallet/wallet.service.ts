import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type CurrencyTotals = {
  [currency_id: string]: number;
};

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId) {
    const operations = await this.prisma.cash_operation.findMany({
      where: {
        user_id: userId,
      },
    });

    let balance = 0;
    for (const op of operations) {
      if (op.positive) {
        balance += op.amount;
      } else {
        balance -= op.amount;
      }
    }

    return balance;
  }

  async isBuyPossible(userId: number, price: number): Promise<boolean> {
    const balance = await this.getBalance(userId);
    return !!(price <= balance);
  }

  async isSellPossible(
    userId,
    currencyId: string,
    amount: number,
  ): Promise<boolean> {
    const userCurrencies = await this.getUserCurrencies(userId);
    return !!(userCurrencies[currencyId] >= amount);
  }

  async getUserCurrencies(userId) {
    const operations = await this.prisma.crypto_operation.findMany({
      where: {
        user_id: userId,
      },
      select: {
        buy: true,
        currency_id: true,
        currency_amount: true,
      },
    });

    const currencyTotals: CurrencyTotals = operations.reduce((acc, op) => {
      if (op.currency_id) {
        if (!acc[op.currency_id]) {
          acc[op.currency_id] = 0;
        }

        if (op.buy) {
          acc[op.currency_id] += op.currency_amount ?? 0;
        } else {
          acc[op.currency_id] -= op.currency_amount ?? 0;
        }
      }
      return acc;
    }, {} as CurrencyTotals);

    return currencyTotals;
  }
}

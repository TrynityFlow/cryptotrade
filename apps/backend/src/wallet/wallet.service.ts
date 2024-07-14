import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Decimal from 'decimal.js';

type CurrencyTotals = {
  [currency_id: string]: Decimal;
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
  
    let balance = new Decimal(0);
    for (const op of operations) {
      const opAmount = new Decimal(op.amount);
      if (op.positive) {
        balance = balance.plus(opAmount);
      } else {
        balance = balance.minus(opAmount);
      }
    }
  
    return balance.toFixed();
  }

  async isBuyPossible(userId: number, price: string): Promise<boolean> {
    const balance = await this.getBalance(userId);
    const decimalBalance = new Decimal(balance);
    const decimalPrice = new Decimal(price);
  
    return decimalBalance.greaterThanOrEqualTo(decimalPrice);
  }

  async isSellPossible(
    userId: number,
    currencyId: string,
    amount: string,
  ): Promise<boolean> {
    const userCurrencies = await this.getUserCurrencies(userId);
    
    if (!userCurrencies[currencyId]) {
      return false;
    }
    
    const userCurrencyAmount = new Decimal(userCurrencies[currencyId]);
    const decimalAmount = new Decimal(amount);
  
    return userCurrencyAmount.greaterThanOrEqualTo(decimalAmount);
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
          acc[op.currency_id] = new Decimal(0);
        }
    
        if (op.buy) {
          acc[op.currency_id] = acc[op.currency_id].plus(new Decimal(op.currency_amount ?? 0));
        } else {
          acc[op.currency_id] = acc[op.currency_id].minus(new Decimal(op.currency_amount ?? 0));
        }
      }
      return acc;
    }, {} as CurrencyTotals);
    
    const result = Object.fromEntries(
      Object.entries(currencyTotals).map(([currency_id, total]) => [currency_id, total.toFixed()])
    );

    return result;
  }
}

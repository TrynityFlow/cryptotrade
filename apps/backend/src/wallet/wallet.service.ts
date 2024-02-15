import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Balance } from '../types';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId: number) {
    const group = await this.prisma.operation.groupBy({
      by: ['currency_id', 'sell'],
      where: {
        user_id: userId,
      },
      _sum: {
        price: true,
        amount: true
      },
      _avg: {
        price: true
      },
    });

    if(!group) return {}

    const cryptoMap = new Map<string, Balance>()
    group.map(current => {
      const id = current.currency_id
      if(!cryptoMap.has(id)) cryptoMap.set(id, {balance: 0, amount: 0, avg_sell: 0, avg_buy: 0})

      cryptoMap.get(id).balance += (current._sum.price * (current.sell ? -1 : 1))
      cryptoMap.get(id).amount += (current._sum.amount * (current.sell ? -1 : 1))

      if(current.sell) {
        cryptoMap.get(id).avg_sell = current._avg.price
        return
      }
      cryptoMap.get(id).avg_buy = current._avg.price
    })
    return Object.fromEntries(cryptoMap)
  }

  async getBalanceById(userId: number, currId: string) {
    const group = await this.prisma.operation.groupBy({
      by: ['sell'],
      where: {
        user_id: userId,
        currency_id: currId
      },
      _sum: {
        price: true,
      },
    });

    if(!group) return 0
    return group.reduce((acc, current) => {
      return acc + (current._sum.price * (current.sell ? -1 : 1))
    }, 0)
  }

  async checkSell(userId: number, currId: string, price: number): Promise<boolean> {
    const res = await this.getBalanceById(userId, currId)
    return (res - price) > 0
  }
}

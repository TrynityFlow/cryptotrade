import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId: number) {
    const group = await this.prisma.operation.groupBy({
      by: ['sell'],
      where: {
        user_id: userId,
      },
      _sum: {
        price: true,
      },
    });

    return group[0]._sum;
  }

  // async getBalanceById(userId: number, currId: string) {

  // }
}

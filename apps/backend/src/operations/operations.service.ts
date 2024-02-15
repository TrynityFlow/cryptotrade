import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpDto } from './operations.dto';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
  ) {}

  async getAllOpsOfUser(id: number, page: number, count: number) {
    return this.prisma.operation.findMany({
      where: {
        user_id: id,
      },
      skip: (page - 1) * count,
      take: +count,
    });
  }

  async insertOp(
    userId: number,
    { amount, currency_id, price, sell }: CreateOpDto,
  ) {
    const total = amount * price;
    const isPossible = await this.walletService.checkSell(
      userId,
      currency_id,
      total,
    );

    if (sell && !isPossible) {
      throw new BadRequestException('Action will cause negative balance');
    }

    return await this.prisma.operation.create({
      data: {
        user_id: userId,
        amount: amount,
        sell: sell,
        currency_id: currency_id,
        price: total,
        partial_price: price,
      },
    });
  }
}

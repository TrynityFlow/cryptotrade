import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpDto } from './operations.dto';
import { operation } from '@prisma/client';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOpsOfUser(id: number) {
    return this.prisma.operation.findMany({
      where: {
        user_id: id,
      },
    });
  }

  async insertOp(
    userId: number,
    { amount, currency_id, price, sell }: CreateOpDto,
  ): Promise<operation> {
    return await this.prisma.operation.create({
      data: {
        user_id: userId,
        amount: amount,
        sell: sell,
        currency_id: currency_id,
        price: price,
      },
    });
  }
}

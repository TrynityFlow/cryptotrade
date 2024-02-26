import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      this.logger.warn('Unable to connect to the database');
      this.logger.warn('Retrying...');
      setTimeout(async () => {
        await this.onModuleInit();
      }, 5000);
    }
  }
}

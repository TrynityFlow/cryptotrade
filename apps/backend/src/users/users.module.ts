import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [UsersService],
})
export class UsersModule {}

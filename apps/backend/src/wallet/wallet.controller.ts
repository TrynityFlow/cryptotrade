/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { WalletService } from './wallet.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  InternalServerError,
  Unauthorized,
} from '../docs/common/responses.docs';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({
    status: 200,
    description: 'Successfull get balance',
    schema: {
      properties: {
        balance: {
          type: 'string',
          example: '1.00000000001'
        },
      },
    },
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async getBalance(@Req() req: any) {
    const balance = await this.walletService.getBalance(req.user.id as number);
    return { balance };
  }
}

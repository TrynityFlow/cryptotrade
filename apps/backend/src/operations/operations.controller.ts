/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OperationsService } from './operations.service';
import { CreateCryptoOpDto } from './create-crypto-operation.dto';
import { GetOpDto } from './get-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly opService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('crypto')
  async getCryptoOps(@Req() req: any, @Query() query: GetOpDto) {
    return this.opService.getAllCryptoOfUser(
      req.user.id as number,
      query.page,
      query.count,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('crypto')
  async createCryptoOp(@Req() req: any, @Body() payload: CreateCryptoOpDto) {
    return await this.opService.insertCryptoOp(req.user.id as number, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('crypto/:id')
  async deleteCryptoOp(
    @Param('id', ParseIntPipe) opId: number,
    @Req() req: any,
  ) {
    return await this.opService.delCryptoOp(req.user.id as number, opId);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OperationsService } from './operations.service';
import { CreateCryptoOpDto } from './create-crypto-operation.dto';
import { GetOpDto } from './get-operation.dto';
import { CreateCashOpDto } from './create-cash-operation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CryptoOpDto } from './docs/crypto-op.dto.docs';
import { CashOpDto } from './docs/cash-op.dto.docs';
import { InsertOpDto } from './docs/insert-operation.dto.docs';
import {
  InternalServerError,
  Unauthorized,
  BadRequestException,
} from '../docs/common/responses.docs';

@ApiTags('Operations')
@Controller('operations')
export class OperationsController {
  constructor(private readonly opService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('crypto')
  @ApiOperation({ summary: 'Get crypto operations' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'count', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of crypto operations',
    type: [CryptoOpDto],
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async getCryptoOps(@Req() req: any, @Query() query: GetOpDto) {
    return this.opService.getAllCryptoOfUser(
      req.user.id as number,
      query.page,
      query.count,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('crypto')
  @ApiOperation({ summary: 'Create a new crypto operation' })
  @ApiBody({ type: CreateCryptoOpDto })
  @ApiResponse({
    status: 201,
    description: 'The created crypto operation',
    type: InsertOpDto,
  })
  @ApiResponse(BadRequestException)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async createCryptoOp(@Req() req: any, @Body() payload: CreateCryptoOpDto) {
    return await this.opService.insertCryptoOp(req.user.id as number, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cash')
  @ApiOperation({ summary: 'Get cash operations' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'count', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of cash operations',
    type: [CashOpDto],
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async getCashOps(@Req() req: any, @Query() query: GetOpDto) {
    return this.opService.getAllCashOfUser(
      req.user.id as number,
      query.page,
      query.count,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('cash')
  @ApiOperation({ summary: 'Add balance to user account' })
  @ApiBody({ type: CreateCashOpDto })
  @ApiResponse({
    status: 201,
    description: 'The created cash operation',
    type: CashOpDto,
  })
  @ApiResponse(BadRequestException)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async addBalance(@Req() req: any, @Body() createCashOp: CreateCashOpDto) {
    return await this.opService.addBalance(req.user.id as number, createCashOp);
  }
}

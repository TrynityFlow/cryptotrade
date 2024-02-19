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
import { CreateOpDto, GetOpDto } from './operations.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly opService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOps(@Req() req: any, @Query() query: GetOpDto) {
    return this.opService.getAllOpsOfUser(
      req.user.id as number,
      query.page,
      query.count,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOp(@Req() req: any, @Body() payload: CreateOpDto) {
    return await this.opService.insertOp(req.user.id as number, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOp(@Param('id', ParseIntPipe) opId: number, @Req() req: any) {
    return await this.opService.delOp(req.user.id as number, opId);
  }
}

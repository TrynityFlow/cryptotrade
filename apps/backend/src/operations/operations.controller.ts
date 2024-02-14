/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OperationsService } from './operations.service';
import { CreateOpDto } from './operations.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly opService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOps(@Req() req: any) {
    if (!req.user.id) throw new InternalServerErrorException();
    return this.opService.getAllOpsOfUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOp(@Req() req:any, @Body() payload: CreateOpDto) {
    if (!req.user.id) throw new InternalServerErrorException();

    return await this.opService.insertOp(req.user.id, payload)
  }
}

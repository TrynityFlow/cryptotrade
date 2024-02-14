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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOps(@Req() req: any) {
    if (!req.user.id) throw new InternalServerErrorException();
    return this.opService.getAllOpsOfUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOp(@Body() payload: CreateOpDto) {
    payload
  }
}

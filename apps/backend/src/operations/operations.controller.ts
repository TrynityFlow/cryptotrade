import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
    constructor(private readonly opService: OperationsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOps(@Req() req: Request) {
        req.user
    }
}

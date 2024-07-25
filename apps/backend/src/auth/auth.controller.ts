import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as Req, Response } from 'express';
import { User } from '../types';
import { LocalAuthGuard } from './auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthRequestBody } from './auth.docs';
import {
  InternalServerError,
  Unauthorized,
} from '../docs/common/responses.docs';
import { ResponseUserDto } from '../docs/common/response-user.dto.docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate' })
  @ApiBody(AuthRequestBody)
  @ApiResponse({
    status: 201,
    description: 'Successfully authenticated',
    type: ResponseUserDto,
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async login(@Request() req: Req, @Res() res: Response) {
    const token = await this.authService.login(req.user as User);

    res.cookie('Authorization', token.access_token, { httpOnly: true });
    res.send({ id: token.id, username: token.username });
    return;
  }
}

import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as Req, Response } from 'express';
import { User } from '../types';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req, @Res() res: Response) {
    const token = await this.authService.login(req.user as User);

    res.cookie('Authorization', token.access_token, { httpOnly: true });
    res.send({ isLogged: true });
    return;
  }
}

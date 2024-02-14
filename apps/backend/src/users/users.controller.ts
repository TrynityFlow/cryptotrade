/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PatchPasswordDto, PatchUsernameDto } from './patchUser.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    if (!req.user?.id) throw new InternalServerErrorException();

    return await this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/username')
  async patchUsername(@Req() req: any, @Body() payload: PatchUsernameDto) {
    if (!req.user?.id) throw new InternalServerErrorException();

    return await this.usersService.patchUsername(req.user.id, payload.username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async patchPassword(@Req() req: any, @Body() payload: PatchPasswordDto) {
    if (!req.user?.id) throw new InternalServerErrorException();

    return await this.usersService.patchPassword(req.user.id, payload.password);
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(
      payload.username,
      payload.password,
    );
  }
}

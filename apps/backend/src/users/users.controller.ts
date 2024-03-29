/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PatchPasswordDto, PatchUsernameDto } from './patchUser.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUser.dto';
import { DeleteUserDto } from './delUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    return await this.usersService.findById(req.user.id as number);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/username')
  async patchUsername(@Req() req: any, @Body() payload: PatchUsernameDto) {
    return await this.usersService.patchUsername(
      req.user.id as number,
      payload.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async patchPassword(@Req() req: any, @Body() payload: PatchPasswordDto) {
    return await this.usersService.patchPassword(
      req.user.id as number,
      payload.password,
    );
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(
      payload.username,
      payload.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() req: any, @Body() payload: DeleteUserDto) {
    return await this.usersService.delUser(
      req.user.id as number,
      payload.password,
    );
  }
}

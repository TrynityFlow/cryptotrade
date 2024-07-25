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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  Unauthorized,
  BadRequestException,
  InternalServerError,
} from '../docs/common/responses.docs';
import { PatchPasswordDto, PatchUsernameDto } from './patchUser.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUser.dto';
import { DeleteUserDto } from './delUser.dto';
import { ResponseUserDto } from './response-user.dto.docs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get details of logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get user',
    type: ResponseUserDto,
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async getProfile(@Req() req: any) {
    return await this.usersService.findById(req.user.id as number);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update username of logged in user' })
  @ApiBody({ type: PatchUsernameDto })
  @Patch('me/username')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated username',
    type: ResponseUserDto,
  })
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async patchUsername(@Req() req: any, @Body() payload: PatchUsernameDto) {
    return await this.usersService.patchUsername(
      req.user.id as number,
      payload.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  @ApiOperation({ summary: 'Update password of logged in user' })
  @ApiBody({ type: PatchPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated password',
    type: ResponseUserDto,
  })
  @ApiResponse(BadRequestException)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async patchPassword(@Req() req: any, @Body() payload: PatchPasswordDto) {
    return await this.usersService.patchPassword(
      req.user.id as number,
      payload.password,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new user',
    type: ResponseUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse(BadRequestException)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async createUser(@Body() payload: CreateUserDto) {
    return await this.usersService.createUser(
      payload.username,
      payload.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Delete account of logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed account',
    schema: {
      properties: {
        count: {
          type: 'number',
          example: 0,
        },
      },
    },
  })
  @ApiBody({ type: DeleteUserDto })
  @ApiResponse(BadRequestException)
  @ApiResponse(Unauthorized)
  @ApiResponse(InternalServerError)
  async deleteUser(@Req() req: any, @Body() payload: DeleteUserDto) {
    return await this.usersService.delUser(
      req.user.id as number,
      payload.password,
    );
  }
}

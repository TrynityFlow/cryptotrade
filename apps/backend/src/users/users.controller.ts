import { Controller, Get, Request } from '@nestjs/common';
import { Request as Req} from 'express';

@Controller('users')
export class UsersController {
    
    @Get('me')
    getProfile(@Request() req: Req) {
        return req.user
    }
}

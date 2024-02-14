import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../types';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['Authorization'];
  }
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'NotSafeSecret',
    });
  }

  async validate(payload: User): Promise<User> {
    const user = this.usersService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../types';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  if (req && req.cookies)
  {
      return req.cookies['Authorization'];
  }
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'NotSafeSecret',
    });
  }

  async validate(payload: User) {
    return { userId: payload.id, username: payload.username };
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../types';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.password.toString() == pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

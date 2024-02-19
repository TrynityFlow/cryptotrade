import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUserName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: name,
      },
    });

    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  }

  async patchUsername(id: number, username: string) {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: {
          username: username,
        },
        select: {
          id: true,
          username: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }

  async patchPassword(id: number, password: string) {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: {
          password: bcrypt.hashSync(password, 12),
        },
        select: {
          id: true,
          username: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createUser(username: string, password: string) {
    try {
      return await this.prisma.user.create({
        data: {
          username: username,
          password: bcrypt.hashSync(password, 12),
        },
        select: {
          id: true,
          username: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }

  async delUser(userId: number, pass: string) {
    const dbPass = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    if (!dbPass) throw new NotFoundException('user not found');

    if (!bcrypt.compareSync(pass, dbPass.password)) {
      throw new UnauthorizedException();
    }

    try {
      const [, user] = await this.prisma.$transaction([
        this.prisma.operation.deleteMany({
          where: {
            user_id: userId,
          },
        }),
        this.prisma.user.delete({
          where: {
            id: userId,
          },
          select: {
            id: true,
            username: true,
          },
        }),
      ]);

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}

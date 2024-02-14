import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findByUserName(name: string) {
        const user = await this.prisma.user.findUnique({where: {
            username: name
        }})

        return user
    }

    async findById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperationsService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getAllOpsOfUser(id: number) {
        return this.prisma.operation.findMany({
            where: {
                user_id: id
            }
        })
    }
}

import { prismaClient } from '../../../shared/database/prisma.service';
import { IUsersRepository } from './interface/IUsers.repository';

export class UsersRepository implements IUsersRepository {
    async findByEmail(email: string) {
        return await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
    }
}

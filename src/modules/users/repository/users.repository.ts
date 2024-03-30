import { prismaClient } from '../../../shared/database/prisma.service';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { IUsersRepository } from './interface/IUsers.repository';

export class UsersRepository implements IUsersRepository {
    async findByEmail(email: string) {
        return await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
    }

    async create(data: CreateUserDTO) {
        return await prismaClient.user.create({
            data,
        });
    }
}

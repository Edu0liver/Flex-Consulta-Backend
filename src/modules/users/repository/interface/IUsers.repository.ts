import { User } from '@prisma/client';

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>;
    // create(data: CreateUserDTO): Promise<User>;
}

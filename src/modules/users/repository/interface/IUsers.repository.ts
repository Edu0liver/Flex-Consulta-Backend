import { User } from '@prisma/client';
import { CreateUserDTO } from '../../dtos/createUser.dto';

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserDTO): Promise<User>;
}

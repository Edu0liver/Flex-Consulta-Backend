import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { AuthenticateUserService } from '../authenticateUser.service';
import { CreateUserService } from '../../createUser/createUser.service';

let authenticateUserService: AuthenticateUserService;
const usersRepositoryMock = new UsersRepository();
vi.spyOn(usersRepositoryMock, 'findByEmail').mockResolvedValue({
    id: '1',
    email: 'user@email.com',
    password: '$2b$10$ZV.Wl3axJqsyFQO6QiiHfOEJ7/AY7LDzS/KJdtVemLo6P6mw6Ym6C',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
});

describe('AuthenticateUserService', () => {
    beforeEach(() => {
        authenticateUserService = new AuthenticateUserService(
            usersRepositoryMock,
        );
    });

    it('should validate a user', async () => {
        const response = await authenticateUserService.execute({
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
        });

        expect(response.data).toHaveProperty('token');
        expect(response.statusCode).toEqual(200);
    });

    it('should throw a validation error', async () => {
        const response = await authenticateUserService.execute({
            email: '',
            password: '',
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a user not found error', async () => {
        vi.spyOn(usersRepositoryMock, 'findByEmail').mockResolvedValueOnce(
            null,
        );

        const response = await authenticateUserService.execute({
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(404);
    });

    it('should throw a incorrect password error', async () => {
        const response = await authenticateUserService.execute({
            email: 'user@email.com',
            password: '17avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(401);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(usersRepositoryMock, 'findByEmail').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await authenticateUserService.execute({
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual('Internal error');
    });
});

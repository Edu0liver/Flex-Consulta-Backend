import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { CreateUserService } from '../createUser.service';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { ZodError } from 'zod';

let createUserService: CreateUserService;
const usersRepositoryMock = new UsersRepository();
vi.spyOn(usersRepositoryMock, 'findByEmail').mockResolvedValue(null);
vi.spyOn(usersRepositoryMock, 'createUser').mockResolvedValue({
    id: '1',
    email: 'user@email.com',
    password: '7avfh90g78yhff7843',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
});

describe('CreateUserService', () => {
    beforeEach(() => {
        createUserService = new CreateUserService(usersRepositoryMock);
    });

    it('should create a new product', async () => {
        const response = await createUserService.execute({
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
        });

        expect(response.data).toHaveProperty('id');
        expect(response.statusCode).toEqual(201);
    });

    it('should throw a validation error', async () => {
        const response = await createUserService.execute({
            email: '',
            password: '7avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a duplicated email error', async () => {
        vi.spyOn(usersRepositoryMock, 'findByEmail').mockResolvedValueOnce({
            id: '1',
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        });

        const response = await createUserService.execute({
            email: '',
            password: '7avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(usersRepositoryMock, 'findByEmail').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await createUserService.execute({
            email: 'user@email.com',
            password: '7avfh90g78yhff7843',
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual('Internal error');
    });
});

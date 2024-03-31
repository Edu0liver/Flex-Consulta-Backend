import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('AuthenticateUserController', () => {
    it('should authenticate a user', async () => {
        await request(app)
            .post('/users')
            .send({
                email: `${Math.floor(Math.random() * 100000000)}-teste2e@email.com`,
                password: '123456',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
    });

    it('should send a bad request', async () => {
        await request(app)
            .post('/users')
            .send({
                email: 'user@email.com',
                password: '',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it('should send a bad request, duplicated email', async () => {
        await request(app)
            .post('/users')
            .send({
                email: `user@email.com`,
                password: '123456',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

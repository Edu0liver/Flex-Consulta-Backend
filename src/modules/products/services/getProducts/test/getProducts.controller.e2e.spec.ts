import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('GetProductsService', () => {
    it('should list products', async () => {
        await request(app)
            .get('/products?page=1&size=10')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should send a bad request', async () => {
        await request(app)
            .get('/products?page=1')
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

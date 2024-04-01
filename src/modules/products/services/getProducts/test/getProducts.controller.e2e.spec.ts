import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('GetProductsService', () => {
    it('should list products', async () => {
        await request(app)
            .get('/products?page=1&size=10')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should send a bad request', async () => {
        await request(app)
            .get('/products?page=1')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

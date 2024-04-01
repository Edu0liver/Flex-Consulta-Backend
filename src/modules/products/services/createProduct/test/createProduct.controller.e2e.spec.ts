import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('CreateProductController', () => {
    it('should create a product', async () => {
        await request(app)
            .post('/products')
            .send({
                name: 'Product Test',
                description: 'Product Test Description',
                price: 10,
            })
            .set('Accept', 'application/json')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .expect('Content-Type', /json/)
            .expect(201);
    });

    it('should send a bad request', async () => {
        await request(app)
            .post('/products')
            .send({
                name: 'Product Test',
                description: 1,
                price: -10,
            })
            .set('Accept', 'application/json')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

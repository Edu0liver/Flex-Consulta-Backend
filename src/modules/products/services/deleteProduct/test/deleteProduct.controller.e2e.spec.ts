import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('DeleteProductController', () => {
    it('should delete a product', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                name: 'Product Test',
                description: 'Product Test Description',
                price: 10,
            })
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .set('Accept', 'application/json');

        await request(app)
            .delete(`/products/${res.body.id}`)
            .set('Accept', 'application/json')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzAwMzYsImV4cCI6MTcxMzEzOTYzNiwic3ViIjoiZGMxMDM4ZTMtMDJjNi00OGU4LWJlNmUtYmUyNjY4OWVhNWIzIn0.pcgaP-X-8VN4mjZbbMjBxVRbKTs0i5-5Zg9t5vcfGSU',
            )
            .expect(204);
    });
});

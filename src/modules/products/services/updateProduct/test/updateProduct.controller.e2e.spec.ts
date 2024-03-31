import { describe, it } from 'vitest';
import { app } from '../../../../../shared/server';
import request from 'supertest';

describe('UpdateProductController', async () => {
    const res = await request(app)
        .post('/products')
        .send({
            name: 'Product Test',
            description: 'Product Test Description',
            price: 10,
        })
        .set('Accept', 'application/json');

    it('should update a product', async () => {
        await request(app)
            .put(`/products/${res.body.id}`)
            .send({
                name: 'Update Product Test',
            })
            .set('Accept', 'application/json')
            .expect(204);
    });

    it('should send a bad request', async () => {
        await request(app)
            .put(`/products/${res.body.id}`)
            .send({
                price: -1,
            })
            .set('Accept', 'application/json')
            .expect(400);
    });
});

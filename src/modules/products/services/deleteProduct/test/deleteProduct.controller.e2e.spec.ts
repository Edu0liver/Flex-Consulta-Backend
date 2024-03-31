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
            .set('Accept', 'application/json');

        await request(app)
            .delete(`/products/${res.body.id}`)
            .set('Accept', 'application/json')
            .expect(204);
    });
});

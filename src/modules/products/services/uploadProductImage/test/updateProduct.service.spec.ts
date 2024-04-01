import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';
import { UpdateProductService } from '../updateProduct.service';

let updateProductService: UpdateProductService;
const productsRepositoryMock = new ProductsRepository();
vi.spyOn(productsRepositoryMock, 'updateProduct').mockResolvedValue({
    id: '1',
    name: 'car',
    description: '4x4',
    price: 100000,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    imageName: null,
});

describe('UpdateProductService', () => {
    beforeEach(() => {
        updateProductService = new UpdateProductService(productsRepositoryMock);
    });

    it('should update a product', async () => {
        const response = await updateProductService.execute({
            id: '1',
            price: 100000,
        });

        expect(response.data).toHaveProperty('id');
        expect(response.statusCode).toEqual(204);
    });

    it('should throw a validation error', async () => {
        const response = await updateProductService.execute({
            id: '1',
            price: -100000,
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(productsRepositoryMock, 'updateProduct').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await updateProductService.execute({
            id: '1',
            price: 100000,
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual({ message: 'Internal error' });
    });
});

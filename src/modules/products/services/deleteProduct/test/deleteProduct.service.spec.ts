import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';
import { DeleteProductService } from '../deleteProduct.service';
import { ZodError } from 'zod';

let deleteProductService: DeleteProductService;
const productsRepositoryMock = new ProductsRepository();
vi.spyOn(productsRepositoryMock, 'deleteProduct').mockResolvedValue({
    id: '1',
    name: 'car',
    description: '4x4',
    price: 100000,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
});

describe('DeleteProductService', () => {
    beforeEach(() => {
        deleteProductService = new DeleteProductService(productsRepositoryMock);
    });

    it('should delete product', async () => {
        const response = await deleteProductService.execute({
            id: '1',
        });

        expect(response.data).toHaveProperty('id');
        expect(response.statusCode).toEqual(204);
    });

    it('should throw a validation error', async () => {
        const response = await deleteProductService.execute({
            id: '',
        });

        expect(response.data).toEqual({ message: expect.any(ZodError) });
        expect(response.statusCode).toEqual(400);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(productsRepositoryMock, 'deleteProduct').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await deleteProductService.execute({
            id: '1',
        });

        expect(response.data).toEqual({ message: 'Internal error' });
        expect(response.statusCode).toEqual(500);
    });
});

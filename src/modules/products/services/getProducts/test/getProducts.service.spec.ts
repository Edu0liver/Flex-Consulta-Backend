import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';
import { GetProductsService } from '../getProducts.service';

let getProductsService: GetProductsService;
const productsRepositoryMock = new ProductsRepository();
vi.spyOn(productsRepositoryMock, 'getProducts').mockResolvedValue([
    {
        id: '1',
        name: 'car',
        description: '4x4',
        price: 100000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
    {
        id: '2',
        name: 'apple',
        description: 'fruit',
        price: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
]);

describe('GetProductsService', () => {
    beforeEach(() => {
        getProductsService = new GetProductsService(productsRepositoryMock);
    });

    it('should list products', async () => {
        const response = await getProductsService.execute({
            page: '1',
            size: '10',
        });

        expect(response.data).toHaveLength(2);
        expect(response.statusCode).toEqual(200);
    });

    it('should throw a validation error', async () => {
        const response = await getProductsService.execute({
            page: '',
            size: '',
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(productsRepositoryMock, 'getProducts').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await getProductsService.execute({
            page: '1',
            size: '10',
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual({ message: 'Internal error' });
    });
});
